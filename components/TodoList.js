import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, DeleteButton, UpdateButton } from "./Button";
import StatusModal from "./StatusModal";
import {
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SelectDropdown from "./SelectDropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Swipeout from "react-native-swipeout";

function TodoList() {
  const [task, setTask] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("InProgress");
  const [index, setIndex] = useState(-1);
  const [update, setUpdate] = useState(-1);
  const [uTitle, setUTitle] = useState("");
  const [uDetails, setUDetails] = useState("");
  const [user, setUser] = useState("");
  const [parseData, setParseData] = useState([]);
  const [filterVal, setFilterVal] = useState(null);
  const [touchedTodo, setTouchedTodo] = useState(-1);
  const navigation = useNavigation();

  const bgColourIndex = useRef(new Animated.Value(0)).current;
  const bgColor = bgColourIndex.interpolate({
    inputRange: [0, 300],
    outputRange: ["#c4c4cc", "#6d6d71"],
  });

  const getUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    const userDetails = JSON.parse(user);
    setUser(userDetails.email);
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem("todo");
    const parseData = JSON.parse(data);
    console.log("parseData", parseData);
    setParseData(parseData);
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getUser();
      getData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setFilterVal(null);
        setTouchedTodo(-1);
      };
    }, [])
  );

  // task.map((data) => {
  //   if (Object.keys(data)[0] === user) console.log("TODOLIST task", data);
  //   return data;
  // });

  useEffect(() => {
    // console.log("parseData", parseData);
    if (parseData.length > 0) {
      const parseObj = parseData?.find((item) => Object.keys(item)[0] === user);
      console.log("final data", parseData, user);
      if (filterVal)
        setTask(
          parseObj
            ? parseObj[user]?.filter((data) => data.status === filterVal)
            : []
        );
      else setTask(parseObj ? parseObj[user] : []);
    }
  }, [parseData, filterVal]);
  //
  useEffect(() => {
    task?.map((data, i) => {
      if (i === index) {
        data.status = status;
      }
      return data;
    });
    // console.log(status);
  }, [status]);

  const updateData = async (value) => {
    try {
      // console.log("value", value);
      const AllData = await AsyncStorage.getItem("todo");
      const parseAllData = JSON.parse(AllData);
      console.log("parseAllData", parseAllData);
      console.log("user", user);
      console.log("value", value);
      if (user) {
        const updatedData = parseAllData.map((data) => {
          if (Object.keys(data)[0] === user) data[user] = value;

          return data;
        });
        // console.log("updatedData", JSON.stringify(updatedData));
        // console.log("after");
        await AsyncStorage.setItem("todo", JSON.stringify(updatedData));
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!filterVal) updateData(task);
  }, [update, task, status]);

  const onDelete = (index) => {
    console.log("index", index);
    Alert.alert("Alert", "Are You Sure?", [
      {
        text: "Cancel",
      },
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

  console.log("task", task);
  console.log("filter valu", filterVal);
  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  };

  //default hook to scroll to top when we dbl click on tab btn
  useScrollToTop(
    useRef({ scrollToTop: () => scrollRef.current?.scrollTo({ y: 0 }) })
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e) => {
    // console.log(e.nativeEvent.contentOffset.y)
    if (e.nativeEvent.contentOffset.y > 1) setIsScrolled(true);
    else setIsScrolled(false);
  };

  var swipeoutBtns = [
    {
      text: "DELETE",
      type: "delete",
      onPress: (index) => {
        onDelete(index);
      },
    }
  ];

  var leftSwipeBtns = [
    {
      text: "UPDATE",
      backgroundColor: "#2196F3",
      height: 30,
      // type:'primary',
    },
  ];

  return (
    <View style={{ backgroundColor: "#f0f0f5", height: "100%" }}>
      <ScrollView
        style={styles.todoContainer}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <SelectDropdown filterVal={filterVal} setFilterVal={setFilterVal} />
        {task?.length ? (
          <View style={styles.taskContainer}>
            {task?.map((data, index) =>
              index === update ? (
                <View style={styles.updateContainer} key={index}>
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
                        if (uDetails && uTitle) {
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
                        } else {
                          Alert.alert("Warning", "Empty fields not Allowed");
                        }
                      }}
                      title="UPDATE"
                      style={styles.btn}
                    />
                  </View>
                </View>
              ) : task?.length > 0 ? (
                // <Animated.View
                //     style={
                //       touchedTodo === index
                //         ? [styles.touchedTask, { backgroundColor: bgColor }]
                //         : styles.task
                //     }
                //     key={index}
                //   >
                <Swipeout
                  right={swipeoutBtns}
                  left={[{ ...leftSwipeBtns[0] }]}
                  sensitivity={100}
                  style={
                    touchedTodo === index
                      ? [styles.touchedTask, { backgroundColor: bgColor }]
                      : styles.task
                  }
                  key={index}
                  >
                    <View style={{
                      display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
                      // marginTop:-10
                    }}>
                      {data.stared ?
                        <FontAwesome name="star" size={20} color={"#de9d10"} />
                        :
                        <FontAwesome name="star-o" size={20} />
                      }
                    </View>
                    <View style={{ paddingHorizontal: 20,paddingBottom:20,paddingTop:5 }}>
                    <Pressable
                      onPress={() => {
                        console.log("index of todo", index);
                        setTouchedTodo(touchedTodo === index ? -1 : index);
                      }}
                    >
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
                        {/* status section*/}
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
                      {/* button section */}
                      {touchedTodo === index && (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 5,
                          }}
                        >
                          <UpdateButton
                            title="UPDATE"
                            onPress={() => {
                              onUpdate(index, data);
                            }}
                          />
                          <DeleteButton
                            title="DELETE"
                            onPress={() => {
                              onDelete(index);
                            }}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>
                </Swipeout>
              ) : (
                // </Animated.View>
                <View>
                  <Text>No Task Added</Text>
                </View>
              )
            )}
          </View>
        ) : (
          <View style={styles.noTask}>
            <Text style={styles.noTaskText}>No Task Added</Text>
            <Pressable>
              <MaterialIcons
                name="add-task"
                size={30}
                color="#2196F3"
                onPress={() => navigation.navigate("Todo")}
              />
            </Pressable>
          </View>
        )}

        <StatusModal
          show={show}
          setShow={setShow}
          status={status}
          setStatus={setStatus}
        />

        {/* scroll to top div */}
      </ScrollView>
      {isScrolled && (
        <View style={{ position: "absolute", right: 4, bottom: 0, zIndex: 1 }}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-up-circle-sharp"
              size={40}
              onPress={onPressTouch}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: "#f0f0f5",
    position: "relative",
  },
  taskContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: 5,
    margin: 20,
    gap: 20,
  },
  task: {
    // borderWidth: 1,
    borderColor: "thistle",
    // padding: 20,
    marginTop: 5,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#dadae3",
  },
  touchedTask: {
    borderColor: "thistle",
    // padding: 20,
    // marginTop: 5,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    // backgroundColor: "#c4c4cc",

    // shadow
    shadowColor: "#e91e63",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  updateContainer: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    width: "100%",
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
  noTask: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
    gap: 10,
  },
  noTaskText: {
    fontWeight: 700,
    color: "red",
  },
});

export default TodoList;
