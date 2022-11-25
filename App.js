import React from "react";
// import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { default as theme } from "./theme.json";

export default function App() {
	return (
		<>
			<ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
				<SafeAreaView style={styles.container}>
					<AuthProvider>
						<AppNavigator />
					</AuthProvider>
				</SafeAreaView>
			</ApplicationProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
});
