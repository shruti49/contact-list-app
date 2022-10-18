import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import AddContactScreen from "../screens/AddContactScreen";
import AccountScreen from "../screens/AccountScreen";

import Ionicons from "react-native-vector-icons/Ionicons";

const TabNavigator = () => {
	//Navigators
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Add") {
						iconName = focused ? "add-circle" : "add-circle-outline";
					} else if (route.name === "Account") {
						iconName = focused ? "person" : "person-outline";
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Add" component={AddContactScreen} />
			<Tab.Screen name="Account" component={AccountScreen} />
		</Tab.Navigator>
	);
};

export default TabNavigator;
