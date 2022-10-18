import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddContactScreen from "../screens/AddContactScreen";
import EditContactScreen from "../screens/EditContactScreen";

import HomeScreenTabNavigator from "./HomeScreenTabNavigator";

const AppStackNavigator = () => {
	const AppStack = createNativeStackNavigator();
	return (
		<AppStack.Navigator
			headerMode="none"
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				headerShown: false,
			}}
			initialRouteName="home"
		>
			<AppStack.Screen name="home" component={HomeScreenTabNavigator} />
			<AppStack.Screen name="addContact" component={AddContactScreen} />
			<AppStack.Screen name="editContact" component={EditContactScreen} />
		</AppStack.Navigator>
	);
};

export default AppStackNavigator;
