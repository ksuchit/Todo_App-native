import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import GoogleLogin from "./GoogleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginButton } from "./Button";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Button } from "./Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPassword,setShowPassword]=useState(false)
  const navigation = useNavigation();

  const isAlredyThere = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (user) navigation.navigate("Todo");
  };

  const getUsers = async () => {
    const user = await AsyncStorage.getItem("@reg-user");
    setUsers(JSON.parse(user));
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getUsers();
      isAlredyThere() //it avoids to go back login when user is there...

      // AsyncStorage.clear()  //it will clean the storage
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions ,refresh the User Inputs
        setEmail("");
        setPassword("");
        setSubmit(false);
      };
    }, [])
  );

  console.log("users", users);

  const onSubmit = async () => {
    console.log("onSubmit");
    console.log("email", email);
    console.log("password", password);
    setSubmit(true);
    try {
      const currentUser = users?.find((data) => data.email === email);
      console.log("user",currentUser)
      if (currentUser) {
        if (currentUser.email === email && currentUser.password === password) {
          AsyncStorage.setItem('@user',JSON.stringify(currentUser))
          navigation.navigate("Todo");

          //refresh the User Inputs
          setEmail("");
          setPassword("");
        } else {
          if (email && password)
            Alert.alert("Failed", "Email or password does not match");
        }
      } else {
        if (email && password) Alert.alert("Failed", "User not Found");
      }
    } catch (error) {
      console.log("Submit error",error)
    }
  };

  return (
    <View style={{backgroundColor:'#f0f0f5'}}>
          <Text style={styles.heading}>Login to Your Account</Text>
      <ScrollView style={{marginTop:20}}>
        <View style={styles.container}>
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
            {submit && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email) &&
              <Text style={styles.errorText}>Enter Valid Email</Text>
            }
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <View style={{display:'flex',flexDirection:'row', justifyContent:"space-between"}}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={showPassword ? false : true}
            />
            <Pressable style={styles.eye}>
                {showPassword ?
                  <MaterialCommunityIcons name="eye-off" size={20}  onPress={()=>setShowPassword(!showPassword)}/>
                  :
                  <MaterialCommunityIcons name="eye" size={20} onPress={()=>setShowPassword(!showPassword)}/>
                }
              </Pressable>
            </View>
            {submit && !password && (
              <Text style={styles.errorText}>Password Required</Text>
            )}
          </View>
          <View style={{ marginTop: 5 }}>
            <LoginButton color="#3740FE" onPress={onSubmit} title="LOGIN" />
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText1}>Don't have account?</Text>
            <Text
              style={styles.footerText}
              onPress={() => {
                console.log("navigation");
                navigation.navigate("Signup");
              }}
            >
              Click here to signup
            </Text>
          </View>
          <GoogleLogin />
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
    alignSelf: 'stretch',
    width: '100%',  
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
  },
  eye: {
    right: 35,
    marginTop: 21
  },
  heading: {
    fontSize: 32,
    color: "black",
    fontWeight: 700,
    textAlign: 'center',
    // marginBottom: 10,
    marginTop:30
    
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

export default Login;
