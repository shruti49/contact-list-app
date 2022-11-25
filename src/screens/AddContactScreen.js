import React from "react";
import { View } from "react-native";
import { TopNavigation, TopNavigationAction, Layout, Text } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContactForm from "../components/ContactForm";

const BackIcon = () => <Ionicons name="arrow-back" />;

const AddContactScreen = ({ navigation, route }) => {
	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);

	const navigationTitle = () => (
		<Text category="h4" style={{ marginLeft: 8 }}>
			Create Contact
		</Text>
	);

	return (
		<Layout style={{ flex: 1 }} level="1">
			<TopNavigation title={navigationTitle} accessoryLeft={screenName && renderBackAction} />
			<View style={{ paddingHorizontal: 16 }}>
				<ContactForm screenName="addContactScreen" navigation={navigation} />
			</View>
		</Layout>
	);
};

export default AddContactScreen;
