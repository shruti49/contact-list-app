import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
} from "firebase/auth";

import { saveInFirebaseDb } from "./DbStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyDqZjEoNDEzAMMufbplytcxRTxIncif0Yo",
		authDomain: "contact-list-4f0d8.firebaseapp.com",
		projectId: "contact-list-4f0d8",
		storageBucket: "contact-list-4f0d8.appspot.com",
		messagingSenderId: "1067409723984",
		appId: "1:1067409723984:web:07e190269154f8e7acb755",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	// Initialize Firebase Authentication and get a reference to the service
	const auth = getAuth(app);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);

	//Handle User State Changes
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user !== null) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				setIsLoading(true);
				setUser(user);
				setIsLoading(false);
				//const uid = user.uid;
				// ...
			}
		});
	}, [user]);

	const login = (email, password) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUser(user);
				setIsLoading(false);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				Alert.alert("Oops something went wrong", errorCode, [
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				]);
			});
	};

	const register = async (newUser) => {
		setIsLoading(true);
		const actionCodeSettings = {
			// URL you want to redirect back to. The domain (www.example.com) for this
			// URL must be in the authorized domains list in the Firebase Console.
			url: "https://contact-list-4f0d8.firebaseapp.com",
			// This must be true.
			handleCodeInApp: true,
		};
		createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
			.then(async (userCredential) => {
				user.displayName = newUser.fname + " " + newUser.lname;
				sendSignInLinkToEmail(auth, newUser.email, actionCodeSettings)
					.then(() => {
						// The link was successfully sent. Inform the user.
						// Save the email locally so you don't need to ask the user for it again
						// if they open the link on the same device.
						window.localStorage.setItem("emailForSignIn", email);
						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						// ...
					});
				// Signed in
				//const user = userCredential.user;
				// ...
				saveInFirebaseDb("Users", newUser);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	};

	const logout = () => {
		signOut(auth)
			.then((res) => {
				setUser(null);
				//console.log(res);
				// Sign-out successful.
			})
			.catch((error) => {
				console.warn(error);
				// An error happened.
			});
	};

	return (
		<AuthContext.Provider value={{ isLoading, user, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};
