import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StaredList from "./StaredList";
import Todo from "./Todo";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

function HomeTopTabs() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator initialRouteName="SubHome"
      screenOptions={{
      tabBarLabelStyle: { fontSize: 14,fontWeight:600 },
      tabBarItemStyle: { width: 150 },
      tabBarStyle: { backgroundColor: '#f0f0f5' }, //powderblue
      // tabBarIndicator:"grey"
    }}
    >
      <Tab.Screen name="Stared" component={StaredList}
        options={{
          tabBarShowIcon: true,
          tabBarShowLabel:false,
          tabBarIcon: () => <FontAwesome name="star" size={20} color={'grey'}/>,
        }}
      />
      <Tab.Screen name="SubHome" component={Todo} options={{tabBarLabel:'Create Task'}}/>
    </Tab.Navigator>
  );
}

export default HomeTopTabs;
