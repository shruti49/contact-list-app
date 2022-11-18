import React, { useContext } from "react";
import { View } from "react-native";
import { Button, TopNavigation, Layout, Text } from "@ui-kitten/components";
import { AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
	const { logout, user } = useContext(AuthContext);

	const navigationTitle = () => (
		<Text category="h4" style={{ marginLeft: 8 }}>
			Account
		</Text>
	);
	return (
		<Layout style={{ flex: 1 }} level="1">
			<TopNavigation title={navigationTitle} />
			<View style={{ paddingHorizontal: 16 }}>
				<Button onPress={() => logout()}>Logout</Button>
			</View>
		</Layout>
	);
};

export default AccountScreen;
