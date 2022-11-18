import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ContactCard from "../components/ContactCard";
import { Text, Button, TopNavigation, Layout, TopNavigationAction } from "@ui-kitten/components";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import * as SplashScreen from "expo-splash-screen";
import InputBox from "../components/InputBox.component";
import Ionicons from "react-native-vector-icons/Ionicons";


const HomeScreen = ({ navigation }) => {
	// Keep the splash screen visible while we fetch resources
	SplashScreen.preventAutoHideAsync();

	const [userData, setUserData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [appIsReady, setAppIsReady] = useState(false);
	const [inputText, setInputText] = useState("");
	let contactList = [];
	const [filteredList, setFilteredList] = useState();

	const fetchContacts = async () => {
		try {
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
		setIsLoading(true);
		//invoke on mount
		fetchContacts();

		// //invoke in interval callback
		// const intervalId = setInterval(() => {
		// 	fetchContacts();
		// }, 10000);

		return () => {
			//clearInterval(intervalId);
		};
	}, []);

	useEffect(
		() => {
			if (userData) {
				userData.forEach((item) => {
					contactList.push({
						id: item.id,
						data: item.data(),
					});
				});
			}
			if (contactList.length > 0) {
				setFilteredList(contactList);
			}
		},
		[userData],
		[contactList]
	);

	//const [selectedId, setSelectedId] = useState(null);

	const renderItem = ({ item }) => {
		return <ContactCard user={item} navigation={navigation} />;
	};
	
	const AddUserIcon = (props) => <Ionicons {...props} name="person-add-sharp" size={18} color="white" />;

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

	// const [filter, setFilter] = useState({
	// 	userName: "",
	// 	phoneNumber: "",
	// });

	const handleSearch = (val) => {
		setInputText(val);
		if (val.length > 3) {
			let searchText = val.toLowerCase();
			const filteredContactList = filteredList.filter(
				(contact) =>
					contact.data.fName.toLowerCase().match(searchText) ||
					contact.data.phoneNumber.match(searchText)
			);
			setFilteredList(filteredContactList);
			setInputText("");
		}
	};

	const navigationTitle = () => (
		<Text category="h4" style={{ marginLeft: 8 }}>
			Contacts
		</Text>
	);
	return (
		<Layout style={{ flex: 1 }} level="1" onLayoutRootView={onLayoutRootView()}>
			<TopNavigation title={navigationTitle} accessoryRight={renderAccessoryRight} />
			<View style={{ marginHorizontal: 16 }}>
				<InputBox
					placeholderText="Search Contacts"
					inputValue={inputText}
					handleOnChangeText={(val) => handleSearch(val)}
					inputStyle={{ marginBottom: 8 }}
				/>
				<FlatList
					refreshing={isLoading}
					onRefresh={fetchContacts}
					data={filteredList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={listEmptyComponent}
				/>
			</View>
		</Layout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
