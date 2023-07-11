import { Button, Image, Pressable, StatusBar, StyleSheet, View } from "react-native";
import {
  DrawerActions,
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import BottomTabs from "./components/BottomTabs";
import TopTabs from "./components/TopTabs";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastProvider } from "react-native-toast-notifications";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import HomeTopTabs from "./components/HomeTopTabs";
import Todo from "./components/Todo";
import OnboardingScreens from "./components/OnboardingScreens";

const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function MyStack() {
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation();
  const getUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    setUserDetails(JSON.parse(user));
  };
  useFocusEffect(
    useCallback(() => {
      getUser();
      return () => {};
    }, [])
  );
  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f0f0f5",
        },
        headerShadowVisible: false,
        headerRight: () => (
          // <MyDrawer />
          <Pressable onPress={() => {
            // navigation.navigate("Profile")
            navigation.dispatch(DrawerActions.openDrawer())
            navigation.navigate('Drawer')
            console.log("Header profile clicked")
          }}>
            {userDetails?.picture ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{ uri: userDetails.picture }}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://wallpapers.com/images/high/funny-profile-picture-iare1qerffjqf434.webp",
                }}
              />
            )}
          </Pressable>
        ),
        headerBackVisible: false,
        // headerShown: false
      }}
    >
      <Stack.Screen
        name="OnBoarding"
        component={OnboardingScreens}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
      <Drawer.Navigator screenOptions={{ drawerLabel: "Hello sk" ,drawerPosition:'right'}}
        drawerContent={(props)=> <CustomDrawerContent {...props} />}
      >
         <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
  );
}

export default function App() {

  return (
    <View style={styles.container}>
      <ToastProvider
        placement="top"
        duration={1000}
        offset={100}
        animationDuration={250}
        animationType="zoom-in"
        successIcon={
          <Ionicons name="md-checkmark-done-sharp" size={20} color={"white"} />
        }
        warningIcon={<AntDesign name="warning" size={20} color={"white"} />}
        dangerIcon={
          <MaterialIcons name="dangerous" size={20} color={"white"} />
        }
        normalColor="#2196F3"
        // icon={<AntDesign name="flag" size={20} color={'white'} />}
      >
        <NavigationContainer>
          {/* <StatusBar backgroundColor={"#fofof5"} barStyle="dark-content" /> */}
          {/* <MyDrawer /> */}
            <MyStack />
        </NavigationContainer>
      </ToastProvider>
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
