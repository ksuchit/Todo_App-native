import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Tabs from './components/Tabs';
import BottomTabs from './components/BottomTabs';
import TopTabs from './components/TopTabs'

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      
    >
      <Stack.Screen 
        name="Auth"
        component={TopTabs}
      
        options={{ headerShown: false, }}
      />
      <Stack.Screen 
       name="Todo" 
       component={BottomTabs} 
       options={
         { title: 'Todo' }
         
       }
      />
      <Stack.Screen 
       name="Tab" 
       component={Tabs} 
       options={
         { title: 'Tab' }
         
       }
      />
    </Stack.Navigator>
    
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
