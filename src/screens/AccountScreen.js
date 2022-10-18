import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import { AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
	const { logout } = useContext(AuthContext);

	return (
		<View>
			{/* <Text>AccountScreen</Text> */}
			<Button onPress={() => logout()}>Logout</Button>
		</View>
	);
};

export default AccountScreen;
