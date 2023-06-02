import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "./Button";

function Todo() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const todo = await AsyncStorage.getItem("todo");
      setTask(JSON.parse(todo) || []);
    } catch (e) {
      // error reading value
    }
  };

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    const userDetails = JSON.parse(user); //if we did directlys user.email it will give error
    setUser(userDetails.email);
  };

  useFocusEffect(
    useCallback(() => {
      getUserFromStorage();
      getData();
      return () => {};
    }, [])
  );

  console.log("user", user);
  console.log(new Date());

  const storeData = async (value) => {
    try {
      if (value !== [])
        await AsyncStorage.setItem("todo", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    storeData(task);
  }, [task]);

  const addTodo = async () => {
    console.log("taskdata", title);
    console.log("taskdata", details);
    if (title && details) {
      Alert.alert("Success", "New Task Added");
      var userId = "";
      if (task?.length > 0)
        userId = task.find((id) => Object.keys(id)[0] === user);

      console.log("userId",userId)
      if (userId) {
        setTask((item) =>
          item.map((data) => {
            if (
              Object.keys(data)[0] === user &&
              Object.values(data)?.length > 0
            ) {
              data[user] = [
                 ...data[user],
                {
                  title: title,
                  details: details,
                  status: "No Status",
                },
              ];
            } else {
              data[user] = [
                {
                  title: title,
                  details: details,
                  status: "No Status",
                },
              ];
            }
            return data;
          })
        );
      } else if (task?.length > 0) {
        setTask((prev) => [
          ...prev,
          {
            [user]: [
              {
                title: title,
                details: details,
                status: "No Status",
              },
            ],
          },
        ]);
      } else {
        setTask(() => [
          {
            [user]: [
              {
                title: title,
                details: details,
                status: "No Status",
              },
            ],
          },
        ]);
      }

      // navigation.navigate('Tab')
      //refresh your user inputs
      setTitle("");
      setDetails("");
    } else {
      Alert.alert("Warning", "Title or Details field is Empty");
    }
  };

  // task.map((data) => {
  //   if (Object.keys(data)[0] === user)
  //     console.log("task", data)
  //   return data
  // }
  //   )


  return (
    <>
      <ScrollView style={{ position: "relative", backgroundColor: "#f0f0f5" }}>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={styles.heading}>Welcome to Todo</Text>
          </View>
          <Text style={styles.inputTitle}>Title</Text>
          <TextInput
            type="text"
            placeholder="Enter heading"
            style={styles.inputField}
            value={title}
            onChangeText={(newText) => setTitle(newText)}
          />
          <Text style={styles.inputTitle}>Task Details</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Task Details"
            style={styles.inputField}
            value={details}
            onChangeText={(newText) => setDetails(newText)}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Button onPress={addTodo} title="ADD TASK" />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#f0f0f5",
    height: "100%",
  },
  updateContainer: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    width: "100%",
  },
  head: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  inputField: {
    width: "90%",
    fontSize: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  status: {
    fontSize: 10,
    fontWeight: "bold",
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
  },
  complete: {
    backgroundColor: "green",
    color: "white",
    borderColor: "green",
  },
  inProgress: {
    backgroundColor: "#2196F3",
    color: "white",
    borderColor: "#2196F3",
  },
  pending: {
    backgroundColor: "#F08080",
    color: "white",
    borderColor: "#F08080",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "white",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    cursor: "pointer",
  },
  taskContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: 5,
    marginTop: 20,
    gap: 20,
  },
  task: {
    borderWidth: 1,
    borderColor: "thistle",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    width: "100%",
  },
});

export default Todo;
