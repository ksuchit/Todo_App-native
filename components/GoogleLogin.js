//web 810487334175-s7gsrdgelasfvbtg722mpl9dmb7udure.apps.googleusercontent.com
//ios 810487334175-4q6gs01gfb2nmq8ih0tmqjeh0smqai2m.apps.googleusercontent.com
//android 810487334175-f2agg9vf5ra33027ckob07r9h084mpe1.apps.googleusercontent.com

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, Touchable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

function GoogleLogin() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsyn] = Google.useAuthRequest({
    expoClientId:
    "810487334175-s7gsrdgelasfvbtg722mpl9dmb7udure.apps.googleusercontent.com",
    androidClientId:
      "810487334175-f2agg9vf5ra33027ckob07r9h084mpe1.apps.googleusercontent.com",
      // iosClientId:
      //   "810487334175-4q6gs01gfb2nmq8ih0tmqjeh0smqai2m.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  async function getUserInfo(token) {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate("Todo");
    } catch (error) {
      // Add your own error handler here
    }
  }

  return (
    <View>
      {/* <Text>{JSON.stringify(userInfo, null, 2)}</Text> */}
      {/* <Text>Social Login</Text> */}
      <Button
        title="Sign in with Google"
        color="#3740FE"
        disabled={!request}
        onPress={()=>promptAsyn()}
      />
      {/* <View>
        <Image
          source={require("../assets/Google__Logo.png")}
          style={styles.google_logo }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  google_logo: {
    width: 20,
    height: 20,
    marginTop: -27,
    marginLeft: 25,
  }
})

export default GoogleLogin;
