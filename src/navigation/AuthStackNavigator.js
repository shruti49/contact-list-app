import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import Registration from "../screens/Registration";

const AuthStackNavigator = () => {
	const AuthStack = createNativeStackNavigator();
	return (
		<AuthStack.Navigator
			headerMode="none"
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				headerShown: false,
			}}
			initialRouteName="login"
		>
			<AuthStack.Screen name="login" component={LoginScreen} />
			<AuthStack.Screen name="register" component={Registration} />
		</AuthStack.Navigator>
	);
};

export default AuthStackNavigator;
