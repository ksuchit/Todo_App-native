import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function HomeTopTabs() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Stared" />
      <Tab.Screen name="Stared" />
    </Tab.Navigator>
  );
}

export default HomeTopTabs;
