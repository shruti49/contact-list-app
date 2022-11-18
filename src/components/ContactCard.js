import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Avatar } from "@ui-kitten/components";

const ContactCard = ({ user, navigation }) => {
	const IMAGE_URL = user.data.contactImage;
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.navigate("contactDetail", user)}
		>
			<Avatar style={styles.image} size="medium" source={{ uri: `${IMAGE_URL}` }} />
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<View>
					<Text>
						{user.data.fName} {user.data.lName}
					</Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text>{user.data.phoneNumber}</Text>
					</View>
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
	image: {
		marginRight: 8,
	},
});

export default ContactCard;
