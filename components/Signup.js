import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LoginButton } from "./Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigation=useNavigation()
  
  const isAlredyThere = async() => {
    const user = await AsyncStorage.getItem("@user")
    if (user)
      navigation.navigate("Todo")
  }
  useEffect(() => {
    isAlredyThere()
  }, [])
  
  const onSubmit = () => {
      console.log("onSubmit");
    setSubmit(true)
    if (email && password) {
      AsyncStorage.setItem("@user",JSON.stringify({email,password}))
      Alert.alert("success", "registered")
      navigation.navigate("Login")
    }

    //refresh the users Input
    setEmail("")
    setName("")
    setPassword("")

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup Here</Text>
      <View>
        <Text style={styles.label}>UserName</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {submit && !email && (
          <Text style={styles.errorText}>Email Required</Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {submit && !password && (
          <Text style={styles.errorText}>Password Required</Text>
        )}
      </View>
      <View style={{marginTop:10}}>
      <LoginButton
              color="#3740FE"
              onPress={onSubmit}
              title="SIGNUP"
          />
       </View>
      <Pressable>
      <View style={styles.footerContainer}>
      <Text style={styles.footerText1}>Already Registered?</Text>
      <Text style={styles.footerText}
              onPress={() => {
                  console.log('navigation')
                navigation.navigate('Login')
            }}
          >
         Click here to login
      </Text>
          </View>
          
          </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent:'center',
    padding: 20,
    backgroundColor:'#f0f0f5'
  },
  inputBox: {
    padding: 10,
    borderRadius: 10,
    borderColor: "grey",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: 'white',
    shadowColor: "#101012",
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 7,
  },
  label: {
    fontWeight: "bold",
    fontSize:15
  },
  heading: {
    fontSize: 32,
    color: "black",
    fontWeight: "700",
    marginBottom: 10,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginRight:5
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default Signup;
