import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import Avatar from "./Avatar.component";

const ContactCard = ({ user, navigation }) => {
	const IMAGE_URL = user.data.contactImage;
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.navigate("contactDetail", user)}
		>
			<Avatar size="medium" source={IMAGE_URL} name={user.data.fName + " " + user.data.lName} />
			<View
				style={{
					flex: 1,
					marginLeft: 8,
				}}
			>
				<Text>
					{user.data.fName} {user.data.lName}
				</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>{user.data.phoneNumber}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#ff6721",
		borderRadius: 4,
		padding: 8,
		marginBottom: 8,
	},
});

export default ContactCard;
