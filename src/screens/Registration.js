import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import InputBox from "../components/InputBox.component";
import validateWrapper from "../utilities/validationWrapper";
import { AuthContext } from "../context/AuthContext";

const Registration = ({ navigation }) => {
	const { register } = useContext(AuthContext);
	const [firstName, setFirstName] = useState();
	const [firstNameError, setFirstNameError] = useState();

	const [lastName, setLastName] = useState();
	const [lastNameError, setLastNameError] = useState();

	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState();

	const [address, setAddress] = useState();
	const [addressError, setAddressError] = useState();

	const [phoneNumber, setPhoneNumber] = useState("+91");
	const [phoneNumberError, setPhoneNumberError] = useState();

	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState();

	const [signUpBtnDisable, setSignUpBtnDisable] = useState(false);

	const validateUser = (fieldName) => {
		let fieldValue = "";
		switch (fieldName) {
			case "firstName":
				fieldValue = firstName;
				break;
			case "lastName":
				fieldValue = lastName;
				break;
			case "email":
				fieldValue = email;
				break;
			case "address":
				fieldValue = address;
				break;
			case "phoneNumber":
				fieldValue = phoneNumber;
				break;
			case "password":
				fieldValue = password;
				break;
		}

		const error = validateWrapper(fieldName, fieldValue);
		if (error) {
			switch (fieldName) {
				case "firstName":
					setFirstNameError(error);
					break;
				case "lastName":
					setLastNameError(error);
					break;
				case "email":
					setEmailError(error);
					break;
				case "address":
					setAddressError(error);
					break;
				case "phoneNumber":
					setPhoneNumberError(error);
					break;
				case "password":
					setPasswordError(error);
					break;
			}
		} else {
			validationClear(fieldName);
		}
		return error;
	};

	const validationClear = (fieldName) => {
		switch (fieldName) {
			case "firstName":
				setFirstNameError("");
				break;
			case "lastName":
				setLastNameError("");
				break;
			case "email":
				setEmailError("");
				break;
			case "address":
				setAddressError("");
				break;
			case "phoneNumber":
				setPhoneNumberError("");
				break;
			case "password":
				setPasswordError("");
				break;
		}
	};

	const handleSignUp = () => {
		if (
			validateUser("firstName") ||
			validateUser("lastName") ||
			validateUser("phoneNumber") ||
			validateUser("email") ||
			validateUser("password")
		) {
			return;
		}

		const newUser = {
			name: firstName + lastName,
			phoneNumber: phoneNumber,
			email: email,
			address: address,
			password: password,
		};

		navigation.navigate("login");
		register(newUser);
	};

	return (
		<View style={styles.container}>
			<View style={{ marginVertical: 16 }}>
				<Text category="h2">Get Started</Text>
			</View>
			<ScrollView>
				<View style={{ flexDirection: "row" }}>
					<InputBox
						inputStyle={{ flex: 1, paddingRight: 8 }}
						inputLabel="First Name"
						placeholderText="Rahul"
						inputValue={firstName}
						handleBlurEvent={() => validationClear("firstName")}
						handleFocusEvent={() => validateUser("firstName")}
						handleOnChangeText={(val) => {
							setFirstName(val), setFirstNameError("");
						}}
						inputCaptionError={firstNameError}
					/>
					<InputBox
						inputStyle={{ flex: 1 }}
						inputLabel="Last Name"
						placeholderText="Yadav"
						inputValue={lastName}
						handleBlurEvent={() => validationClear("lastName")}
						handleFocusEvent={() => validateUser("lastName")}
						handleOnChangeText={(val) => {
							setLastName(val), setLastNameError("");
						}}
						inputCaptionError={lastNameError}
					/>
				</View>
				<InputBox
					inputLabel="E-mail"
					placeholderText="rahul@yadav.in"
					inputValue={email}
					handleBlurEvent={() => validationClear("email")}
					handleFocusEvent={() => validateUser("email")}
					handleOnChangeText={(val) => {
						setEmail(val), setEmailError("");
					}}
					inputCaptionError={emailError}
				/>

				<InputBox
					inputLabel="Address"
					placeholderText="B-block"
					inputSize="large"
					inputValue={address}
					// handleBlurEvent={() => validationClear(phoneNumber)}
					// handleFocusEvent={() => validateUser(phoneNumber)}
					handleOnChangeText={(val) => {
						setAddress(val), setAddressError("");
					}}
					inputCaptionError={addressError}
				/>

				<InputBox
					inputLabel="Mobile Number"
					placeholderText="+919999999999"
					keyboardType="phone-pad"
					inputValue={phoneNumber}
					handleBlurEvent={() => validationClear("phoneNumber")}
					handleFocusEvent={() => validateUser("phoneNumber")}
					handleOnChangeText={(val) => {
						setPhoneNumber(val), setPhoneNumberError("");
					}}
					inputCaptionError={phoneNumberError}
				/>
				<InputBox
					inputLabel="Password"
					placeholderText="Password"
					inputValue={password}
					handleBlurEvent={() => validationClear("password")}
					handleFocusEvent={() => validateUser("password")}
					handleOnChangeText={(val) => {
						setPassword(val), setPasswordError("");
					}}
					inputCaptionError={passwordError}
				/>
				<View style={{ flexDirection: "row", marginBottom: 16 }}>
					<Button onPress={handleSignUp} disabled={signUpBtnDisable}>
						Sign Up
					</Button>
				</View>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text category="s1">Sign In</Text>
				</TouchableOpacity>
			</ScrollView>
			{/* <InputBox
				inputLabel="Confirm Password"
				placeholderText="Password"
				inputValue={password}
				handleBlurEvent={() => validationClear("password")}
				handleFocusEvent={() => validateUser("password")}
				handleOnChangeText={(val) => setInput({ ...input, password: val, passwordError: "" })}
				inputCaptionError={input.passwordError}
			/> */}
		</View>
	);
};

export default Registration;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
	},
});
