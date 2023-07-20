import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
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
  const [loading,setLoading]=useState(false)

  const getUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    const parserdUser = await JSON.parse(user);
    console.log("getUser",parserdUser)
    setUser(parserdUser.email);
    getData(parserdUser.email)
  };

  const getData = async (user) => {
    console.log("getdata called")
    const data = await AsyncStorage.getItem("todo");
    const parseData = JSON.parse(data);
    console.log("getdata",parseData,user)
    if (parseData.length > 0) {
       parseData.map((item) => {
        if (Object.keys(item)[0] === user)
          setList(() => item[user].filter((obj) => obj.stared === true));
      });
    }
  };

useFocusEffect(
  useCallback(()=>{
  getUser();
  // getData();
  setTimeout(()=>{
    setLoading(true)
  },5000)

  console.log("useFocus in StarList")
  return()=>{
    setLoading(false)
  }
},[])
)
console.log("loadingStared",loading)

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
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
  return (
    <ScrollView style={{display:'flex',flex:1}}>
      {loading ?
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
        :
        <>
          <ImageBackground source={{ uri: 'https://www.whoa.in/download/photoshoot-love-heart-created-by-young-couple-hand-hd-images-photos-fb-images-free-download' }} resizeMode="cover"
            style={{height:'100%'}}
          >
      <Text >Inside</Text>
    </ImageBackground>
        {/* <Image source={{ uri: 'https://www.whoa.in/download/photoshoot-love-heart-created-by-young-couple-hand-hd-images-photos-fb-images-free-download' }}
        style={{ height: "100%", width: 170, borderRadius: 100 }}
        />  */}
        {/* <iframe src="https://giphy.com/embed/hL9q5k9dk9l0wGd4e0" width="480" height="318" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/loading-vera-verreschi-hL9q5k9dk9l0wGd4e0">via GIPHY</a></p> */}
          </>
      }
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
