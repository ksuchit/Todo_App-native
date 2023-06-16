import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function StaredList() {
  const [user, setUser] = useState("");
  const [list, setList] = useState([]);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    const parserdUser = JSON.parse(user);
    setUser(parserdUser.email);
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem("todo");
    const parseData = JSON.parse(data);
    if (parseData.length > 0) {
      parseData.map((item) => {
        if (Object.keys(item)[0] === user)
          setList(() => item[user].filter((obj) => obj.stared === true));
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
      getData();
      return () => {};
    }, [])
  );

  const removeFromStared = async (data) => {
    console.log("remove stared", data);
    const alldata = await AsyncStorage.getItem("todo");
    const parseData = JSON.parse(alldata);
    const userData = parseData.find((item) => Object.keys(item)[0] === user)[
      user
    ];

    const updatedData=userData.map((item) => {
      if (item.title === data.title && item.details === data.details)
        item.stared = false;

      return item;
    })
    const finalUpdatedData = parseData.map((item) => {
      if (Object.keys(item)[0] === user)
        item[user] = updatedData
      
      return item
    })
    console.log("finalUpdatedData",finalUpdatedData)
    await AsyncStorage.setItem("todo", JSON.stringify(finalUpdatedData))
    //after removing star we need to call updated data so...
    getData()
  };

  console.log("staredList", list);
  return (
    <ScrollView>
      <View style={styles.container}>
        {list.map((data, i) => (
          <View style={styles.task} key={i}>
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
              <TouchableOpacity onPress={() => removeFromStared(data)}>
                <FontAwesome name="star" size={20} color={"#de9d10"} />
              </TouchableOpacity>
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
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f5",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 30,
    // borderRightWidth: 0.5,
    // borderColor:'#de9d10'
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  task: {
    // borderWidth: 1,
    borderColor: "thistle",
    padding: 20,
    marginTop: 25,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#dadae3",
    // position: "absolute",
    // top: 0,
  },
});

export default StaredList;
