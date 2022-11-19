import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import {
	Text,
	Card,
	Layout,
	TopNavigation,
	TopNavigationAction,
	Divider,
	Modal,
	Button,
} from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import Avatar from "../components/Avatar.component";

const BackIcon = () => <Ionicons name="arrow-back" size={24} color={"#ffffff"} />;

const ContactDetailScreen = ({ route, navigation }) => {
	const db = getFirestore();
	const [visible, setVisible] = useState(false);
	let user = {};

	if (route.params) {
		user = route.params.data;
	}

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

	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);

	const renderAccessoryRight = () => (
		<View style={{ flexDirection: "row" }}>
			<TouchableOpacity onPress={() => navigation.navigate("editContact", { id: user.id })}>
				<Ionicons name="create" size={24} color={"#ffffff"} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setVisible(true)}>
				<Ionicons name="trash" size={24} color={"#ffffff"} />
			</TouchableOpacity>
		</View>
	);
	const openWhatsapp = () => {
		let url = "whatsapp://send?text=" + "Hey! Wazzup" + "&phone=91" + user?.phoneNumber;
		Linking.openURL(url)
			.then((data) => {
				console.log("WhatsApp Opened successfully " + data);
			})
			.catch(() => {
				alert("Make sure WhatsApp is installed on your device");
			});
	};
	return (
		<Layout style={{ flex: 1 }} level="1">
			<TopNavigation accessoryRight={renderAccessoryRight} accessoryLeft={renderBackAction} />
			<Card style={styles.card}>
				<View style={{ alignItems: "center" }}>
					<Avatar
						source={user?.contactImage}
						style={{ width: 112, height: 112 }}
						name={user?.fName + " " + user?.lName}
					/>
				</View>
				<Text style={{ textAlign: "center", color: "#000000" }} category="h3">
					{user.fName} {user.lName}
				</Text>
				<View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 12 }}>
					<TouchableOpacity
						style={{ alignItems: "center" }}
						onPress={() => Linking.openURL(`tel:${user?.phoneNumber}`)}
					>
						<Ionicons name="call" size={18} color={"#ff6721"} />
						<Text style={{ color: "#ff6721" }}>call</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ alignItems: "center" }}
						onPress={() => Linking.openURL(`sms:${user?.phoneNumber}`)}
					>
						<Ionicons name="chatbox-ellipses" size={18} color={"#ff6721"} />
						<Text style={{ color: "#ff6721" }}>text</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: "center" }} onPress={openWhatsapp}>
						<Ionicons name="logo-whatsapp" size={18} color={"#ff6721"} />
						<Text style={{ color: "#ff6721" }}>whatsapp</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ alignItems: "center" }}
						onPress={() => Linking.openURL(`mailto:${user?.emailId}`)}
					>
						<Ionicons name="mail" size={18} color={"#ff6721"} />
						<Text style={{ color: "#ff6721" }}>mail</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						marginVertical: 12,
					}}
				>
					<Text style={{ color: "#000000" }}>phone ({user.phoneLabel})</Text>
					<Text style={{ color: "#ff6721" }}>+91 {user.phoneNumber}</Text>
				</View>
				<Divider />
				<View
					style={{
						marginTop: 12,
					}}
				>
					<Text style={{ color: "#000000" }}>email ({user.emailLabel})</Text>
					<Text style={{ color: "#ff6721" }}>{user.emailId}</Text>
				</View>
			</Card>

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
		</Layout>
	);
};

export default ContactDetailScreen;
const styles = StyleSheet.create({
	card: {
		marginHorizontal: 16,
		paddingVertical: 16,
		marginBottom: 8,
		backgroundColor: "#ffffff",
	},
	icon: {
		width: 24,
		height: 24,
	},
});
