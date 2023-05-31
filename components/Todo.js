import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TodoList from "./TodoList";
import { useNavigation } from "@react-navigation/native";
import StatusModal from "./StatusModal";
import { Button, DeleteButton, SignoutButton, UpdateButton } from "./Button";

function Todo() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [uTitle, setUTitle] = useState("");
  const [uDetails, setUDetails] = useState("");
  const [task, setTask] = useState([]);
  const [update, setUpdate] = useState(-1);
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("InProgress");
  const [index, setIndex] = useState(-1);
  const navigation = useNavigation();

  useEffect(() => {
    task.map((data, i) => {
      if (i === index) {
        data.status = status;
      }
      return data;
    });
    console.log(status);
  }, [status]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todo");
      setTask(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    setUser(JSON.parse(user));
  };

  useEffect(() => {
    getData();
    getUserFromStorage();
  }, []);

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
      if (task?.length > 0) {
        setTask((item) => [
          ...item,
          {
            title: title,
            details: details,
            status: "No Status",
          },
        ]);
      } else {
        setTask(() => [
          {
            title: title,
            details: details,
            status: "No Status",
          },
        ]);
      }

      //refresh your user inputs
      setTitle("");
      setDetails("");
    } else {
      Alert.alert("Warning", "Title or Details field is Empty");
    }
  };

  const onDelete = (index) => {
    // setTask(task.filter((data, i) => index !== i));
    // Alert.alert("Success", "Successfully deleted");
    Alert.alert("Alert", "Are You Sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setTask(task.filter((data, i) => index !== i)),
      },
    ]);
  };

  const onUpdate = (index, data) => {
    setUpdate(index);
    setUDetails(data.details);
    setUTitle(data.title);
  };

  return (
    <ScrollView style={{ height: "90%" }}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.heading}>Welcome to Todo</Text>
          <SignoutButton
            title="LOGOUT"
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate("Login");
            }}
          />
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

        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
          }}
        />

        <View style={styles.taskContainer}>
          {task?.map((data, index) =>
            index === update ? (
              <View style={styles.updateContainer}>
                <Text style={styles.inputTitle}>Title</Text>
                <TextInput
                  type="text"
                  placeholder="Enter heading"
                  style={[styles.inputField]}
                  defaultValue={data.title}
                  onChangeText={(newText) => setUTitle(newText)}
                />
                <Text style={styles.inputTitle}>Task Details</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Task Details"
                  style={styles.inputField}
                  defaultValue={data.details}
                  onChangeText={(newText) => setUDetails(newText)}
                />
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onPress={() => {
                      setTask((prev) =>
                        prev.map((upItem, index) => {
                          if (index === update) {
                            upItem.title = uTitle;
                            upItem.details = uDetails;
                          }
                          return upItem;
                        })
                      );

                      setUpdate("");
                      setUDetails("");
                      setUTitle("");

                      Alert.alert("Success", "Successfully Updated");
                    }}
                    title="UPDATE"
                    style={styles.btn}
                  />
                </View>
              </View>
            ) : task?.length > 0 ? (
              <View style={styles.task} key={index}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.inputTitle}>
                    {data.title?.length > 15
                      ? `${data.title?.slice(0, 15)}...`
                      : data.title}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setShow(true);
                      setIndex(index);
                      setStatus(data.status);
                    }}
                  >
                    <View>
                      {data.status === "InProgress" ? (
                        <Text style={[styles.inProgress, styles.status]}>
                          {" "}
                          {data.status}
                        </Text>
                      ) : data.status === "Pending" ? (
                        <Text style={[styles.pending, styles.status]}>
                          {" "}
                          {data.status}
                        </Text>
                      ) : data.status === "Complete" ? (
                        <Text style={[styles.complete, styles.status]}>
                          {" "}
                          {data.status}
                        </Text>
                      ) : (
                        <Text style={styles.status}> {data.status}</Text>
                      )}
                    </View>
                  </Pressable>
                </View>
                <View
                  style={{
                    borderBottomColor: "black",
                    marginTop: 5,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <Text style={{ marginTop: 5, marginBottom: 10 }}>
                  {data.details}
                </Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                  <UpdateButton
                    title="UPDATE"
                    onPress={() => onUpdate(index, data)}
                  />
                  <DeleteButton
                    title="DELETE"
                    onPress={() => onDelete(index)}
                  />
                </View>
              </View>
            ) : (
              <View>
                <Text>No Task Added</Text>
              </View>
            )
          )}
        </View>
        {/* <TodoList /> */}
      </View>
      <StatusModal
        show={show}
        setShow={setShow}
        status={status}
        setStatus={setStatus}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: "grey",
    // borderRadius: 10,
    padding: 25,
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
    justifyContent: "space-between",
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
