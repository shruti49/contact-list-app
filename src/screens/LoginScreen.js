import React, { useState, useEffect, useContext } from "react";
import {
	View,
	StyleSheet,
	Keyboard,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import InputBox from "../components/InputBox.component";
import validateWrapper from "../utilities/validationWrapper";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState();

	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState();

	const [signInBtnDisable, setSignInBtnDisable] = useState(false);

	const validateUser = (fieldName) => {
		const fieldValue = fieldName === "email" ? email : password;
		const error = validateWrapper(fieldName, fieldValue);
		if (error) {
			fieldName === "email" ? setEmailError(error) : setPasswordError(error);
		} else {
			validationClear(fieldName);
		}
		return error;
	};

	const validationClear = (fieldName) => {
		fieldName === "email" ? setEmailError("") : setPasswordError("");
		setSignInBtnDisable(false);
	};

	useEffect(() => {
		validationClear();
	}, []);

	const handleSignIn = () => {
		const error1 = validateUser("email");
		const error2 = validateUser("password");

		if (error1 || error2) {
			setSignInBtnDisable(true);
			return;
		}

		const response = login(email, password);
		if (response === undefined) {
			navigation.navigate("login");
		}
	};

	return (
		<Layout style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={[styles.container]}>
					<View style={{ marginVertical: 16 }}>
						<Text category="h2">Welcome Back</Text>
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
						inputCaptionError={emailError !== "" ? emailError : " "}
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
						<Button onPress={handleSignIn} disabled={signInBtnDisable}>
							Login
						</Button>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate("register")}>
						<Text category="s1">Sign Up</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		</Layout>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
	},
});
