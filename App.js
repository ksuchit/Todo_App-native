import { Image, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import BottomTabs from "./components/BottomTabs";
import TopTabs from "./components/TopTabs";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function MyStack() {
  const [userDetails,setUserDetails]=useState({})
  const navigation=useNavigation()
  const getUser = async() => {
    const user = await AsyncStorage.getItem("@user")
    setUserDetails(JSON.parse(user))
  }
  useFocusEffect(
    useCallback(() => {
      getUser()
      return()=>{}
    },[])
  )
  return (
    <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f0f0f5',
        },
        headerShadowVisible:false,
        headerRight:() => (
          <Pressable onPress={()=>navigation.navigate('Profile')}>
            {userDetails?.picture ?
              <Image
                style={{ width: 50, height: 50, marginRight: 10 ,borderRadius:50}}
                source={{uri: userDetails.picture}}
              />
              :
              <Image
                style={{ width: 50, height: 50, marginRight: 10,borderRadius:50 }}
                source={{
                  uri: "https://wallpapers.com/images/high/funny-profile-picture-iare1qerffjqf434.webp",
                }}
              />
            }
          </Pressable>
        ),
        headerBackVisible:false
      }}
    >
      <Stack.Screen
        name="Auth"
        component={TopTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Todo"
        component={BottomTabs}
        options={{
          title: "Todo",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar backgroundColor={'#fofof5'} barStyle='dark-content' />
        <MyStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5", //#fff
    // alignItems: 'center',
    justifyContent: "center",
    paddingTop: 10,
  },
});
