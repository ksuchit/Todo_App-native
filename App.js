//web 810487334175-s7gsrdgelasfvbtg722mpl9dmb7udure.apps.googleusercontent.com
//ios 810487334175-4q6gs01gfb2nmq8ih0tmqjeh0smqai2m.apps.googleusercontent.com
//android 810487334175-f2agg9vf5ra33027ckob07r9h084mpe1.apps.googleusercontent.com
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './components/Todo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          marginTop:15,
          backgroundColor: 'white',
          backgroundImage:"",
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'}
         
        }
      />
      <Stack.Screen 
       name="Todo" 
       component={Todo} 
       options={
         { title: 'Todo' }
         
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
