import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback } from "react"
import { Image } from "react-native"
import Onboarding from "react-native-onboarding-swiper"

function OnboardingScreens() {

    const navigation = useNavigation()
    useFocusEffect(
        useCallback(async() => {
            if (AsyncStorage.getItem("FirstTime"))
                navigation.navigate("Auth")
            
            await AsyncStorage.setItem("FirstTime",true)

           return ()=>{}
       },[])
   )
  return (
      <Onboarding
          containerStyles={{ backgroundColor: '#f0f0f5' }}
          bottomBarColor="#f0f0f5"
          imageContainerStyles={{borderColor:'red'}}
          titleStyles={{ fontWeight: '600' }}
          onSkip={() => navigation.navigate("Auth")}
          onDone={()=>navigation.navigate("Auth")}
          pages={[
              {
                  backgroundColor: '#fff',
                  image: <Image source={require('../assets/screen1.png')} />,
                  title: 'Manage your tasks',
                  subtitle: 'You can easily manage all of your daily tasks in DoMe for free',
              },
              {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/screen2.png')} />,
                title: 'Create daily routine',
                subtitle: 'In Uptodo  you can create your personalized routine to stay productive',
              },
              {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/screen3.png')} />,
                title: 'Orgonaize your tasks',
                subtitle: 'You can organize your daily tasks by adding your tasks into separate categories',
            },
          ]}
      />
  )
}

export default OnboardingScreens