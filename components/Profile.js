import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { Button as ButtonEle } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

function Profile() {
  const [user, setUser] = useState();
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const navigation = useNavigation();

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    setUser(JSON.parse(user));

    const parsedUser=JSON.parse(user)
    const todo = await AsyncStorage.getItem("todo");
    const parsedTodo = JSON.parse(todo);
    const currentUser = parsedTodo.find(
      (data) => Object.keys(data)[0] === parsedUser.email
    );
    // console.log("userEmail", user.email);
    // console.log("currentUser", currentUser[user.email]);

    currentUser[parsedUser.email].map((data) => {
      if (data.status === "Complete") setCompleted((cnt) => cnt + 1);
      else if (data.status === "Pending") setPending((cnt) => cnt + 1);

      return data;
    });
  };

  // useEffect(() => {
  //   getUserFromStorage();
  // }, []);

  const getData = async () => {
    const todo = await AsyncStorage.getItem("todo");
    const parsedTodo = JSON.parse(todo);
    const currentUser = parsedTodo.find(
      (data) => Object.keys(data)[0] === user.email
    );
    // console.log("userEmail", user.email);
    // console.log("currentUser", currentUser[user.email]);

    currentUser[user.email].map((data) => {
      if (data.status === "Complete") setCompleted((cnt) => cnt + 1);
      else if (data.status === "Pending") setPending((cnt) => cnt + 1);

      return data;
    });
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getUserFromStorage()
      // getData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setCompleted(0);
        setPending(0);
      };
    }, [])
  );
  console.log("Profile", user);
  console.log("TODO data", completed, pending);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        {/* <SignoutButton title="SIGNOUT" /> */}
        <ButtonEle
          title="SIGNOUT"
          icon={{
            name: "logout",
            // type: 'font-awesome',
            size: 17,
            color: "#f0f0f5",
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#e91e63",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 0,
            marginVertical: 0,
          }}
          onPress={async () => {
            await AsyncStorage.removeItem("@user");
            navigation.navigate("Login");
            Alert.alert("Success", "Successfully Signout");
            // await AsyncStorage.removeItem("todo")
            // Alert.alert('Todo cleared')
          }}
        />
      </View>
      {user && (
        <View style={styles.profile}>
          {user.picture ? (
            <Image
              source={{
                uri: user.picture,
              }}
              style={{ height: 170, width: 170, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={{
                uri: "https://wallpapers.com/images/high/funny-profile-picture-iare1qerffjqf434.webp",
              }}
              style={{ height: 170, width: 170, borderRadius: 100 }}
            />
          )}
          <Text style={styles.name}>{user.name}</Text>
          <Text>{user.email}</Text>
          {user.verified_email ? (
            <Button title="Verified" />
          ) : (
            <Button title="Not Verified" />
          )}
        </View>
      )}
      <Text style={styles.overviewHead}>Tasks Overview</Text>
      <View style={styles.overview}>
        <View style={styles.tasks}>
          <Text style={styles.count}>{completed}</Text>
          <Text style={styles.taskTitle}>Completed Tasks</Text>
        </View>
        <View style={styles.tasks}>
          <Text style={styles.count}>{pending}</Text>
          <Text style={styles.taskTitle}>Pending Tasks</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#f0f0f5",
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#dadae3",
    margin: 20,
    borderRadius: 20,
    // borderWidth: 2,
    // borderRadius: 20,
    // borderColor: "grey",
  },
  name: {
    marginTop: 5,
    fontSize: 35,
    fontWeight: 700,
  },
  overview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  overviewHead: {
    margin: 10,
    fontSize: 16,
    fontWeight: 700,
  },
  tasks: {
    backgroundColor: "#dadae3",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: "45%",
  },
  count: {
    fontSize: 33,
    fontWeight: 500,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 13,
    color: "grey",
  },
});

export default Profile;
