import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ContactCard from "../components/ContactCard";
import {
	Text,
	Button,
	TopNavigation,
	Layout,
	Icon,
	TopNavigationAction,
} from "@ui-kitten/components";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import * as SplashScreen from "expo-splash-screen";

const AddUserIcon = (props) => <Icon {...props} name="person-add" />;

const HomeScreen = ({ navigation }) => {
	// Keep the splash screen visible while we fetch resources
	SplashScreen.preventAutoHideAsync();

	const [userData, setUserData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [appIsReady, setAppIsReady] = useState(false);
	let contactList = [];

	const fetchContacts = async () => {
		try {
			setIsLoading(true);
			const db = getFirestore();
			const response = collection(db, "Contacts");
			const data = await getDocs(response);
			setUserData(data);
		} catch (e) {
			console.warn(e);
		} finally {
			// Tell the application to render
			setAppIsReady(true);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchContacts();
		return () => {};
	}, []);

	if (userData !== undefined) {
		userData.forEach((item) => {
			contactList.push({
				id: item.id,
				data: item.data(),
			});
		});
	}

	const renderItem = ({ item }) => {
		return <ContactCard user={item} navigation={navigation} />;
	};

	const renderAccessoryRight = () => (
		<TopNavigationAction icon={AddUserIcon} onPress={() => navigation.navigate("addContact")} />
	);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	const listEmptyComponent = () => {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", height: 500 }}>
				<Text category="h5">No saved contacts</Text>
				<Button onPress={() => navigation.navigate("addContact")}>Add a Contact</Button>
			</View>
		);
	};

	return (
		<Layout
			style={{ flex: 1, paddingHorizontal: 16 }}
			level="1"
			onLayoutRootView={onLayoutRootView()}
		>
			<TopNavigation title="Contacts" accessoryRight={renderAccessoryRight} />
			<FlatList
				refreshing={isLoading}
				onRefresh={fetchContacts}
				data={contactList}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={listEmptyComponent}
			/>
		</Layout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
