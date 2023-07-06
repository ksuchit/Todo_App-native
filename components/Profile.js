import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Button } from "./Button";
import { Button as ButtonEle, Skeleton } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import VisionCamera from "./VisionCamera";
import { useToast } from "react-native-toast-notifications";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function Profile() {
  const [user, setUser] = useState();
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const navigation = useNavigation();

  const toast = useToast();

  // const devices = useCameraDevices("dual-camera");
  // const device = devices.back;
  // const [openCamera, setOpenCamera] = useState(false);
  // console.log("openCamera", openCamera);
  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    setUser(JSON.parse(user));

    const parsedUser = JSON.parse(user);
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

  const [loading, setLoading] = useState(false);
  const { height, width } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getUserFromStorage();
      setTimeout(() => {
        setLoading(true);
      }, 1000);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setCompleted(0);
        setPending(0);
        setLoading(false);
        setShowBottomSheet(false);
      };
    }, [])
  );
  // console.log("Profile", user);
  console.log("TODO data", completed, pending);
  console.log(loading);

  const bottomSheet = useSharedValue(125);
  const bottomSheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bottomSheet.value }],
    };
  });
  useEffect(() => {
    if (showBottomSheet) bottomSheet.value = withTiming(0, { duration: 1000 });
    else bottomSheet.value = withTiming(125, { duration: 1000 });
  }, [showBottomSheet]);

  return loading ? (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (showBottomSheet) setShowBottomSheet(false);
        }}
      >
        <View style={styles.signout}>
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
              toast.show("Successfully Signout", {
                type: "success",
              });
            }}
          />
        </View>
        {user && (
          <View style={styles.profile}>
            <View>
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
            </View>
            <View style={{position:'absolute',right:80}}>
              <MaterialCommunityIcons
                name="account-edit"
                size={25}
                onPress={() => {
                  console.log("edit clicked");
                  setShowBottomSheet(!showBottomSheet);
                }} //setOpenCamera(true)
              />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text>{user.email}</Text>
            {user.verified_email ? (
              <Button title="Verified" />
            ) : (
              <Button title="Not Verified" />
            )}
          </View>
        )}
      </Pressable>
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

      {/* BottomSheet */}
      {/* {showBottomSheet && */}
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimatedStyle]}>
        <Pressable
          onPress={() => {
            console.log("closed bottom");
            setShowBottomSheet(false);
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 3,
              width: 40,
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        </Pressable>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.bottomSheetContaint}>
            <Entypo name="camera" size={25} />
            <Text style={styles.bottomSheetText}>Click a Photo</Text>
          </View>
          <View style={styles.bottomSheetContaint}>
            <FontAwesome name="photo" size={25} />
            <Text style={styles.bottomSheetText}>Select from Gallery</Text>
          </View>
        </View>
      </Animated.View>
      {/* } */}
      {/* {openCamera && <VisionCamera />} */}
    </View>
  ) : (
    // Skeleton started
    <View style={styles.container}>
      <View style={styles.signout}>
        <Skeleton
          animation="wave"
          height={38}
          width={150}
          style={{ borderRadius: 20 }}
        />
      </View>
      <View style={[styles.profile, { gap: 10 }]}>
        <Skeleton
          animation="wave"
          height={170}
          width={170}
          style={{ borderRadius: 100 }}
        />
        <Skeleton animation="wave" height={50} width={200} />
        <Skeleton animation="wave" height={20} width={150} />
        <Skeleton
          animation="wave"
          height={50}
          width={250}
          style={{ borderRadius: 40 }}
        />
      </View>
      <Text style={styles.overviewHead}>Tasks Overview</Text>
      <View style={styles.overview}>
        <View style={styles.tasks}>
          <Skeleton height={50} width={80} style={{ marginBottom: 3 }} />
          <Text style={styles.taskTitle}>Completed Tasks</Text>
        </View>
        <View style={styles.tasks}>
          <Skeleton height={50} width={80} style={{ marginBottom: 3 }} />
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
  signout: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 20,
    // justifyContent: "center",
    // position: "absolute",
    // top: 10,
    // right: 10,
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
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "grey", //#dadae3
    width: "100%",
  },
  bottomSheetContaint: {
    margin: 10,
    marginTop: 30,
    width: "40%",
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadae3",
  },
  bottomSheetText: {
    color: "grey",
    marginTop: 5,
  },
});

export default Profile;
