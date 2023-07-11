import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LoginButton } from "./Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "react-native-toast-notifications";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const toast = useToast();

  const getRegisteredUsers = async () => {
    const user = await AsyncStorage.getItem("@reg-user");
    setUsers(JSON.parse(user));
  };

  useFocusEffect(
    useCallback(() => {
      getRegisteredUsers();
      return () => {
        setShowPassword(false);
      };
    }, [])
  );

  const onSubmit = async () => {
    console.log("onSubmit");
    setSubmit(true);
    
    const isAlredyRegistered= users?.find((item) => item.email === email)
    if (isAlredyRegistered)
      toast.show("User Already Registered",{type:'danger'})
    else if (
      email &&
      password &&
      name &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) &&
      confirmPassword &&
      confirmPassword === password
    ) {
      if (users?.length > 0)
        await AsyncStorage.setItem(
          "@reg-user",
          JSON.stringify([...users, { email, password, name }])
        );
      else
        await AsyncStorage.setItem(
          "@reg-user",
          JSON.stringify([{ email, password, name }])
        );

      // Alert.alert("success", "registered");
      toast.show("Successfully Registered",{type:'success'})
      navigation.navigate("Login");

      //refresh the users Input
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <View style={{ backgroundColor: "#f0f0f5", height: "100%" }}>
      <Text style={styles.heading}>Signup Here</Text>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>UserName</Text>
            <TextInput
              editable
              style={styles.inputBox}
              placeholder="Enter Full Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {submit && !name && (
              <Text style={styles.errorText}>Name Required</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              editable
              style={styles.inputBox}
              placeholder="Enter Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {submit && !email && (
              <Text style={styles.errorText}>Email Required</Text>
            )}
            {submit && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) && (
              <Text style={styles.errorText}>Enter Valid Email</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              editable
              style={styles.inputBox}
              placeholder="Enter Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {submit && !password && (
              <Text style={styles.errorText}>Password Required</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                editable
                style={styles.inputBox}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={showPassword ? false : true}
              />
              <Pressable style={styles.eye}>
                {showPassword ? (
                  <MaterialCommunityIcons
                    name="eye-off"
                    size={20}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye"
                    size={20}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )}
              </Pressable>
            </View>
            {submit && !confirmPassword && (
              <Text style={styles.errorText}>Plz Confirm Password</Text>
            )}
            {submit && !(confirmPassword === password) && (
              <Text style={styles.errorText}>Password Doesn't Match</Text>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            <LoginButton color="#3740FE" onPress={onSubmit} title="SIGNUP" />
          </View>
          <Pressable>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText1}>Already Registered?</Text>
              <Text
                style={styles.footerText}
                onPress={() => {
                  console.log("navigation");
                  navigation.navigate("Login");
                }}
              >
                Click here to login
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f5",
  },
  inputBox: {
    padding: 10,
    borderRadius: 10,
    borderColor: "grey",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: "white",
    shadowColor: "#101012",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 7,
    alignSelf: "stretch",
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
  },
  eye: {
    right: 35,
    marginTop: 21,
  },
  heading: {
    fontSize: 32,
    color: "black",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 30,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 32,
  },
  footerText: {
    color: "blue",
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 30,
  },
  footerText1: {
    color: "black",
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 30,
    marginRight: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default Signup;
