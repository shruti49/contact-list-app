import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Switch, Button, Avatar } from "react-native-paper";

const AddContactScreen = () => {
	const [name, onChangeText] = useState("");
	const [number, onChangeNumber] = useState(null);
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn); 

	return (
		<View>
			<Text style={{ fontSize: 32 }}>Add Contact</Text>
			<TextInput
				style={{ backgroundColor: "white", marginBottom: 16 }}
				label="Name"
				value={name}
				onChangeText={onChangeText}
			/>
			<TextInput
				style={{ backgroundColor: "white" }}
				label="Phone Number"
				value={number}
				onChangeText={onChangeNumber}
				keyboardType="numeric"
			/>
			<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
			<View style={{ alignItems: "center" }}>
				<Avatar.Image size={100} source="" />
				<View style={{ width: "100%", marginTop: 8 }}>
					<Button icon="camera" mode="contained" onPress={() => console.log("Pressed")}>
						<Text>Upload Profile Picture</Text>
					</Button>
				</View>
			</View>
		</View>
	);
};

export default AddContactScreen;
