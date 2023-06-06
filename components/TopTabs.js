import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './Login';
import Signup from './Signup';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator style={{marginTop:30}}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
    </Tab.Navigator>
  );
}