import React, { useEffect, useState } from "react";
import {
	Pressable,
	View,
	StyleSheet,
	Keyboard,
	TouchableHighlight,
	ScrollView,
} from "react-native";
import {
	Text,
	Input,
	Toggle,
	Button,
	Select,
	SelectItem,
	Modal,
	Card,
	Avatar,
} from "@ui-kitten/components";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { saveInFirebaseDb } from "../context/DbStorage";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const ContactForm = ({ screenName, navigation, userId }) => {
	const [userObj, setUserObj] = useState();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [number, setNumber] = useState("");
	const [email, setEmail] = useState("");
	const [isWhatsApp, setIsWhatsApp] = useState(false);
	const [visible, setVisible] = useState(false);
	const [contactPicture, setContactPicture] = useState("");
	const db = getFirestore();

	const fetchUserById = async (userId) => {
		try {
			const docRef = doc(db, "Contacts", userId);
			const response = await getDoc(docRef);
			setUserObj(response.data());
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		if (userId) {
			fetchUserById(userId);
		}
	}, [userId]);

	useEffect(() => {
		if (userObj !== undefined) {
			setFirstName(userObj.fName);
			setLastName(userObj.lName);
			setNumber(userObj.phoneNumber);
			setContactPicture(userObj.contactImage);
			setEmail(userObj.emailId);
			setIsWhatsApp(userObj.isWhatsApp);
		}
	}, [userObj]);

	const [selectedPhoneIndex, setSelectedPhoneIndex] = useState(0);
	const phoneLabel = ["Home", "Office"];
	const phoneType = userObj !== undefined ? userObj.phoneLabel : phoneLabel[selectedPhoneIndex.row];
	const displayPhoneValue = phoneType;

	const renderPhoneOptions = (title) => <SelectItem title={title} key={title} />;

	const [selectedEmailIndex, setSelectedEmailIndex] = useState(0);
	const emailLabel = ["Personal", "Work"];
	const emailType = userObj !== undefined ? userObj.emailLabel : emailLabel[selectedEmailIndex.row];
	const displayEmailValue = emailType;

	const renderEmailOptions = (title) => <SelectItem title={title} key={title} />;
	const handleNumber = (number) => {
		setNumber(number);
	};

	const openImagePickerAsync = async (mode) => {
		let pickerResult;
		if (mode === "gallery") {
			const getGalleryPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
			const requestGalleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (
				getGalleryPermission.status === "denied" ||
				requestGalleryPermission.status === "denied"
			) {
				Alert.alert(
					"This app does not have access to your photos. To enable access tap Settings.",
					"",
					[
						{
							text: "Cancel",
							onPress: () => console.log("Cancel Pressed"),
							style: "cancel",
						},
						{ text: "Settings", onPress: () => Linking.openSettings() },
					]
				);
			} else {
				pickerResult = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [3, 3],
					quality: 1,
					base64: true,
				});
			}
		} else {
			const getCameraPermission = await ImagePicker.getCameraPermissionsAsync();
			const requestCameraPermissions = await ImagePicker.requestCameraPermissionsAsync();
			if (getCameraPermission.status === "denied" || requestCameraPermissions === "denied") {
				Alert.alert(
					"This app does not have access to your Camera. To enable access tap Settings.",
					"",
					[
						{
							text: "Cancel",
							onPress: () => console.log("Cancel Pressed"),
							style: "cancel",
						},
						{ text: "Settings", onPress: () => Linking.openSettings() },
					]
				);
			} else {
				pickerResult = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [3, 3],
					quality: 1,
					base64: true,
				});
			}
		}
		if (pickerResult.base64) {
			setVisible(false);
			setContactPicture(pickerResult.uri);
		}
	};

	const storeDataInFirebase = async () => {
		const userData = {
			contactImage: contactPicture
				? contactPicture
				: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMvO4ydq3DuBwMUTliFGqGm641axT0vrKaQ&usqp=CAU",
			fName: firstName,
			lName: lastName,
			emailId: email,
			emailLabel: displayEmailValue ? displayEmailValue : "",
			phoneNumber: number,
			isWhatsApp: isWhatsApp,
			phoneLabel: displayPhoneValue ? displayPhoneValue : "",
		};

		if (screenName === "addContactScreen") {
			saveInFirebaseDb("Contacts", userData);
		} else {
			const docRef = doc(db, "Contacts", userId);
			await setDoc(docRef, userData)
				.then((docRef) => {
					console.log("Entire Document has been updated successfully");
				})
				.catch((error) => {
					console.log(error);
				});
		}

		navigation.navigate("home");
	};

	return (
		<>
			<ScrollView>
				<View style={{ alignItems: "center", marginBottom: 16 }}>
					{contactPicture ? (
						<>
							<Pressable style={styles.photoContainer} onPress={() => setVisible(true)}>
								<Avatar source={{ uri: `${contactPicture}` }} style={{ width: 100, height: 100 }} />
							</Pressable>
							<Text>Change Photo</Text>
						</>
					) : (
						<>
							<Pressable style={styles.photoContainer} onPress={() => setVisible(true)}>
								<Ionicons style={{ width: 48, height: 48 }} fill="#ffffff" name="image-outline" />
							</Pressable>
							<Text>Add Photo</Text>
						</>
					)}
				</View>
				<View style={{ flexDirection: "row", marginBottom: 8, alignItems: "center" }}>
					<Ionicons style={styles.icon} fill="#8F9BB3" name="person-outline" />
					<View style={{ flex: 1, marginLeft: 16 }}>
						<Input
							style={{ marginBottom: 8 }}
							placeholder="First name"
							value={firstName}
							onChangeText={(value) => setFirstName(value)}
						/>
						<Input
							style={{ marginBottom: 8 }}
							placeholder="Last name"
							value={lastName}
							onChangeText={(value) => setLastName(value)}
						/>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginBottom: 8, alignItems: "center" }}>
					<Ionicons style={styles.icon} fill="#8F9BB3" name="mail-outline" />
					<View style={{ flex: 1, marginLeft: 16 }}>
						<Input
							style={{ marginBottom: 8 }}
							placeholder="Email"
							value={email}
							onChangeText={(value) => setEmail(value)}
						/>
						<Select
							style={{ marginBottom: 8 }}
							placeholder="Label"
							value={displayEmailValue}
							selectedIndex={selectedEmailIndex}
							onSelect={(index) => {
								setSelectedEmailIndex(index);
							}}
							onFocus={() => Keyboard.dismiss()}
						>
							{emailLabel.map(renderEmailOptions)}
						</Select>
					</View>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Ionicons style={styles.icon} fill="#8F9BB3" name="call-outline" />
					<View style={{ flex: 1, marginLeft: 16 }}>
						<Input
							style={{ marginBottom: 8 }}
							placeholder="Phone"
							value={number}
							onChangeText={handleNumber}
						/>
						<Select
							style={{ marginBottom: 8 }}
							placeholder="Label"
							value={displayPhoneValue}
							selectedIndex={selectedPhoneIndex}
							onSelect={(index) => {
								setSelectedPhoneIndex(index);
							}}
							onFocus={() => Keyboard.dismiss()}
						>
							{phoneLabel.map(renderPhoneOptions)}
						</Select>
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<Text>WhatsApp</Text>
							<Toggle
								style={{ marginBottom: 16 }}
								checked={isWhatsApp}
								onChange={(isWhatsApp) => setIsWhatsApp(isWhatsApp)}
							></Toggle>
						</View>
					</View>
				</View>
				<Button status="primary" onPress={storeDataInFirebase}>
					Save
				</Button>
			</ScrollView>
			<Modal
				visible={visible}
				style={styles.modal}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => setVisible(false)}
			>
				<Card disabled={true}>
					<Text category="h5">Add photo</Text>
					<View style={{ marginVertical: 16 }}>
						<View>
							<TouchableHighlight
								activeOpacity={0.2}
								underlayColor="#DDDDDD"
								style={{ marginBottom: 8 }}
								onPress={() => openImagePickerAsync("camera")}
							>
								<Text category="s1">Take {contactPicture ? "new" : ""} photo</Text>
							</TouchableHighlight>
						</View>
						<View>
							<TouchableHighlight
								activeOpacity={0.2}
								underlayColor="#DDDDDD"
								onPress={() => openImagePickerAsync("gallery")}
							>
								<Text category="s1">Choose {contactPicture ? "new" : ""} photo</Text>
							</TouchableHighlight>
						</View>
					</View>
					<View style={{ alignItems: "flex-end" }}>
						<TouchableHighlight
							onPress={() => setVisible(false)}
							activeOpacity={0.4}
							underlayColor="#DDDDDD"
							style={{ borderRadius: 8, padding: 8 }}
						>
							<Text>Cancel</Text>
						</TouchableHighlight>
					</View>
				</Card>
			</Modal>
		</>
	);
};

export default ContactForm;

ContactForm.defaultProps = {
	userId: "",
};

const styles = StyleSheet.create({
	photoContainer: {
		width: 100,
		height: 100,
		borderRadius: 100 / 2,
		backgroundColor: "#8F9BB3",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	icon: {
		width: 24,
		height: 24,
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modal: {
		minWidth: 350,
		maxWidth: 350,
	},
});
