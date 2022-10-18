import React, { useState } from "react";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Avatar, Modal, Card, Button } from "@ui-kitten/components";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const ContactCard = ({ user, navigation }) => {
	const db = getFirestore();
	const [visible, setVisible] = useState(false);
	const handleDelete = () => {
		setVisible(false);
		const docRef = doc(db, "Contacts", user.id);
		deleteDoc(docRef)
			.then(() => {
				console.log("Entire Document has been deleted successfully.");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const IMAGE_URL = `file:///data/user/0/host.exp.exponent/cache/ImagePicker/${user.data.contactImage}`;
	return (
		<View style={styles.container}>
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
						{user.data.isWhatsApp && (
							<FontAwesome name="whatsapp" size={16} color="black" style={{ marginLeft: 8 }} />
						)}
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={() => navigation.navigate("editContact", { id: user.id })}
						style={{ paddingRight: 8 }}
					>
						<Feather name="edit" size={16} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setVisible(true)}>
						<AntDesign name="delete" size={16} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			<Modal
				visible={visible}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => setVisible(false)}
			>
				<Card disabled={true}>
					<View style={{ flex: 1, alignItems: "center" }}>
						<Text style={{ marginBottom: 16 }}>Are you sure?</Text>
						<Text style={{ marginBottom: 8 }}>
							Do you really want to delete this record?This process cannot be undone
						</Text>
					</View>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
						<View>
							<Button onPress={() => setVisible(false)}>Cancel</Button>
						</View>
						<View>
							<Button onPress={handleDelete}>Delete</Button>
						</View>
					</View>
				</Card>
			</Modal>
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
	},
});

export default ContactCard;
