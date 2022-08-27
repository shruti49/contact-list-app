import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Avatar } from "react-native-paper";

const ContactCard = ({ name, phoneNumber, profilePicture }) => {

	return (
		<View style={styles.container}>
			<Avatar.Image style={styles.image} source={{ uri: `${profilePicture}` }} />
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<View>
					<Text>{name}</Text>
					<Text>{phoneNumber}</Text>
				</View>
				<Pressable onPress={() => console.log("press")}>
					<Feather name="edit" size={16} color="black" />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#ffffff",
		borderRadius: 4,
		padding: 8,
		marginBottom: 8,
	},
	image: {
		marginRight: 8,
		width: 32,
		height: 32,
	},
});

export default ContactCard;
