import React from "react";
import { TopNavigation, TopNavigationAction, Layout, Icon } from "@ui-kitten/components";

import ContactForm from "../components/ContactForm";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AddContactScreen = ({ navigation }) => {
	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);

	return (
		<Layout style={{ flex: 1, paddingHorizontal: 16 }} level="1">
			<TopNavigation alignment="" title="Create Contact" accessoryLeft={renderBackAction} />
			<ContactForm screenName="addContactScreen" navigation={navigation} />
		</Layout>
	);
};

export default AddContactScreen;
