import React, { useContext } from "react";
import { View } from "react-native";
import { Button, TopNavigation, Layout } from "@ui-kitten/components";
import { AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
	const { logout, user } = useContext(AuthContext);
	return (
		<Layout style={{ flex: 1, padding: 16 }} level="1">
			<TopNavigation title="Account" />
			<Button onPress={() => logout()}>Logout</Button>
		</Layout>
	);
};

export default AccountScreen;
