import React from "react";
import { TopNavigation, TopNavigationAction, Layout } from "@ui-kitten/components";
import ContactForm from "../components/ContactForm";

const BackIcon = () => <Ionicons {...props} name="arrow-back" />;

const EditContactScreen = ({ navigation, route }) => {
	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);
	return (
		<Layout style={{ flex: 1 }} level="1">
			<TopNavigation title="Edit Contact" accessoryLeft={renderBackAction} />
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
