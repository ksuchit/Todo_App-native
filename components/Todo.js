import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "../components/DateTimePicker";
import HomeTopTabs from "./HomeTopTabs";
import { useToast } from "react-native-toast-notifications";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

function Todo() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);
  const [user, setUser] = useState();
  const [latestTask, setLatestTask] = useState({ title: "", details: "" });
  const [show, setShow] = useState(false);
  const [stared, setStared] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const getData = async () => {
    try {
      const todo = await AsyncStorage.getItem("todo");
      setTask(JSON.parse(todo) || []);

      //to set latest todo
      const parsedTodo = JSON.parse(todo);
      console.log(
        "obj",
        parsedTodo
          ?.find((obj) => Object.keys(obj)[0] === user)
          [user]?.slice(-1)[0]
      );
      const latestObj = parsedTodo
        ?.find((obj) => Object.keys(obj)[0] === user)
        [user]?.slice(-1)[0];
      setLatestTask(latestObj);
    } catch (e) {
      // error reading value
    }
  };

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    const userDetails = JSON.parse(user); //if we did directlys user.email it will give error
    setUser(userDetails.email || "");
  };

  const rotation = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform:[{rotateZ:`${rotation.value}deg`}]
    }
  })

  useFocusEffect(
    useCallback(() => {
      getUserFromStorage();
      getData();

      rotation.value = withSequence(
        withTiming(-10,{duration:50}),
        withRepeat(withTiming(10, { duration: 100 }), 4, true),
        withTiming(0,{duration:50})
      )
      return () => {
        setShow(false);
      };
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
      setLatestTask({ title: title, details: details });
      var userId = "";
      if (task?.length > 0)
        userId = task.find((id) => Object.keys(id)[0] === user);

      console.log("userId", userId);
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
                  stared: stared,
                },
              ];
            } else {
              data[user] = [
                {
                  title: title,
                  details: details,
                  status: "No Status",
                  stared: stared,
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
                stared: stared,
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
                stared: stared,
              },
            ],
          },
        ]);
      }

      // navigation.navigate('Tab')
      //refresh your user inputs
      setTitle("");
      setDetails("");
      setShow(false);
      setStared(false);
      setStared(false);

      // Alert.alert("Success", "New Task Added");
      // toast.show("New Task Added")
      toast.show("New Task Added", {
        type: "success",
      });
    } else {
      // Alert.alert("Warning", "Title or Details field is Empty");
      toast.show("Title or Details field is Empty", {
        type: "warning",
      });
    }
  };

  task.map((data, i) => {
    if (Object.keys(data)[0] === user) console.log("task", data);
    return data;
  });

  console.log("latestTask", latestTask);
  return (
    <View behavior="padding" style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          setShow(false);
          setTitle("");
          setDetails("");
          setStared(false);
        }}
      >
        <View style={show ? styles.containerShow : styles.containerHide}>
          {latestTask?.title && !show ? (
            <View style={styles.task}>
              <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 700 }}>
                Recent Task...
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.inputTitle}>
                  {latestTask.title?.length > 15
                    ? `${latestTask.title?.slice(0, 15)}...`
                    : latestTask.title}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  marginTop: 5,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <Text style={{ marginTop: 5, marginBottom: 10 }}>
                {latestTask.details}
              </Text>

              <Pressable
                onPress={() => navigation.navigate("Tasks")}
                style={styles.seeAll}
              >
                <Text style={{ fontWeight: 500, color: "#2196F3" }}>
                  See All...
                </Text>
                <Ionicons
                  name="arrow-forward-circle"
                  size={30}
                  color="#2196F3"
                />
              </Pressable>
            </View>
          ) : (
            ""
          )}

          {show ? (
            <View>
              {/* <View style={styles.head}>
                <Text style={styles.heading}>Welcome to Todo</Text>
              </View> */}
              <Text style={styles.inputTitle}>Title</Text>
              <TextInput
                editable
                type="text"
                placeholder="Enter heading"
                style={styles.inputField}
                value={title}
                autoFocus={true}
                onChangeText={(newText) => setTitle(newText)}
              />
              <Text style={styles.inputTitle}>Task Details</Text>
              <TextInput
                editable
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
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DateTimePicker />
                  {stared ? (
                    <FontAwesome
                      name="star"
                      size={25}
                      onPress={() => setStared(!stared)}
                      color={"#de9d10"}
                    />
                  ) : (
                    <FontAwesome
                      name="star-o"
                      size={25}
                      onPress={() => setStared(!stared)}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={
                    title && details
                      ? styles.addTaskBtn
                      : styles.addTaskBtnDisabled
                  }
                  onPress={addTodo}
                  disabled={title && details ? false : true}
                >
                  <Text>ADD TASK</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Animated.View style={animatedStyle}>
                <TouchableOpacity
                  style={styles.addTaskBtn}
                  onPress={() => setShow(true)}
                >
                  <MaterialCommunityIcons name="plus" size={30} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHide: {
    padding: 25,
    backgroundColor: "#f0f0f5",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  containerShow: {
    padding: 25,
    backgroundColor: "#dadae3", //#dadae3 #f0f0f5
    // height: "100%",
    // position: 'absolute',
    // bottom:0,
    display: "flex",
    justifyContent: "flex-end",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    top: "37%",
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
    borderColor: "grey", //thistle
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
    // borderWidth: 1,
    borderColor: "thistle",
    padding: 20,
    marginTop: 35,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#dadae3",
    position: "absolute",
    top: 0,
  },
  seeAll: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  addTaskBtn: {
    backgroundColor: "#c0c0c0", //#dadae3
    padding: 10,
    borderRadius: 10,
    color: "grey",
    // width: 50,
  },
  addTaskBtnDisabled: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 10,
    opacity: 0.2,
  },
});

export default Todo;
