import React from "react";
import { TopNavigation, TopNavigationAction, Layout, View } from "@ui-kitten/components";
import ContactForm from "../components/ContactForm";

const BackIcon = () => <Ionicons size={24} name="arrow-back" />;

const EditContactScreen = ({ navigation, route }) => {
	console.log(route);
	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);
	const navigationTitle = () => (
		<Text category="h4" style={{ marginLeft: 8 }}>
			Edit Contact
		</Text>
	);
	return (
		<Layout style={{ flex: 1 }} level="1">
			<TopNavigation title={navigationTitle} accessoryLeft={renderBackAction} />
			<View style={{ paddingHorizontal: 16 }}>
				<ContactForm
					screenName="editContactScreen"
					navigation={navigation}
					userId={route.params.id}
				/>
			</View>
		</Layout>
	);
};

export default EditContactScreen;
