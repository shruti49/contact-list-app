import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import contacts from "../mockData/contacts.json";
import ContactCard from "../components/ContactCard";

const HomeScreen = () => {
	const [contactList, setContactList] = useState([]);

	useEffect(() => {
		setContactList(contacts.results);
	}, [contacts]);

	const renderItem = ({ item }) => {
		return (
			<ContactCard
				name={item.name}
				phoneNumber={item.phoneNumber}
				profilePicture={item.profilePicture}
			/>
		);
	};

	return (
		<>
			<Text style={{ fontSize: 32, fontWeight: "bold" }}>Contacts</Text>
			{contactList !== [] ? (
				<FlatList data={contactList} renderItem={renderItem} keyExtractor={(item) => item.name}/>
			) : (
				<Text>No contacts</Text>
			)}
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
