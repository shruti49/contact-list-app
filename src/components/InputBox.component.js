import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, Input, AlertIcon } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";

const InputBox = ({
	inputStyle,
	placeholderText,
	inputValue,
	handleOnChangeText,
	inputLabel,
	inputCaption,
	inputCaptionError,
	handleBlurEvent,
	handleFocusEvent,
	inputSize,
}) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Ionicons name={secureTextEntry ? "eye-off" : "eye"} />
		</TouchableWithoutFeedback>
	);

	const renderCaption = () => {
		return (
			<View style={styles.captionContainer}>
				{/* {AlertIcon(styles.captionIcon)} */}
				<Text style={styles.captionText} status={inputCaptionError ? "danger" : "basic"}>
					{inputCaptionError ? inputCaptionError : inputCaption}
				</Text>
			</View>
		);
	};

	return (
		<Input
			style={[styles.inputContainer, inputStyle]}
			label={inputLabel}
			placeholder={placeholderText}
			value={inputValue}
			onBlur={handleBlurEvent}
			onFocus={handleFocusEvent}
			onChangeText={handleOnChangeText}
			caption={renderCaption}
			accessoryRight={inputLabel === "Password" && renderIcon}
			secureTextEntry={inputLabel === "Password" && secureTextEntry}
			size={inputSize}
		/>
	);
};

export default InputBox;

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 16,
	},
	captionContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	captionIcon: {
		width: 10,
		height: 10,
		marginRight: 5,
	},
	captionText: {
		fontSize: 12,
		fontWeight: "400",
	},
});
