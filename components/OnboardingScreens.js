import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Circle, Svg } from "react-native-svg";

function OnboardingScreens() {
  const navigation = useNavigation();
  const dotComponent = (e) => {
    return (
      <View
        style={e.selected ? styles.dotSelected : styles.dotContainer}
      ></View>
    );
  };

  const BtnComponent = (e) => {
    return (
        <TouchableOpacity style={{ backgroundColor: 'grey', paddingVertical:10,paddingHorizontal:20, marginRight: 10,marginLeft: 10, borderRadius: 10 }}
            onPress={e.onPress}
        >
            <Text>{e.nextLabel ? e.nextLabel : e.skipLabel}</Text> 
          
       </TouchableOpacity>
    );
  };

    const doneBtnComponent = (e) => {
        return (
            <TouchableOpacity  style={{ backgroundColor: 'grey', paddingVertical:10,paddingHorizontal:20, marginRight: 10,marginLeft: 10, borderRadius: 10 }}
            onPress={e.onPress}>
                <Text>Lets go...</Text>
          </TouchableOpacity>
      )
  }
    
  return (
    <Onboarding
      DotComponent={dotComponent}
      NextButtonComponent={BtnComponent}
          SkipButtonComponent={BtnComponent}
          DoneButtonComponent={doneBtnComponent}
      containerStyles={{ backgroundColor: "#f0f0f5" }}
      bottomBarColor="#f0f0f5"
      bottomBarHeight={70}
      titleStyles={{ fontWeight: "600" }}
      subTitleStyles={{ color: "grey" }}
      onSkip={() => navigation.dispatch(StackActions.replace("Auth"))}
          onDone={() => navigation.dispatch(StackActions.replace("Welcome"))}

      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/screen1.png")} />,
          title: "Manage your tasks",
          subtitle:
            "You can easily manage all of your daily tasks in App for free",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/screen2.png")} />,
          title: "Create daily routine",
          subtitle:
            "In Todo  you can create your personalized routine to stay productive",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/screen3.png")} />,
          title: "Orgonaize your tasks",
          subtitle:
            "You can organize your daily tasks by adding your tasks into separate categories",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
  },
  dotSelected: {
    width: 25,
    height: 10,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});

export default OnboardingScreens;
