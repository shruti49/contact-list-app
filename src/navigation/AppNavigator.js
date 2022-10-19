import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import AppStackNavigator from "./AppStackNavigator";
import { AuthContext } from "../context/AuthContext";

const AppNavigator = () => {
	const { isLoading, user } = useContext(AuthContext);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	console.log(user);
	return (
		<NavigationContainer>
			{user !== null ? <AppStackNavigator /> : <AuthStackNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigator;
