import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { TopNavigation, TopNavigationAction, Layout, Icon } from "@ui-kitten/components";
import ContactForm from "../components/ContactForm";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const EditContactScreen = ({ navigation, route }) => {
	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);
	return (
		<Layout style={{ flex: 1, paddingHorizontal: 16 }} level="1">
			<TopNavigation alignment="center" title="Edit Contact" accessoryLeft={renderBackAction} />
			<ContactForm screenName="editContactScreen" navigation={navigation} userId={route.params.id} />
		</Layout>
	);
};

export default EditContactScreen;
