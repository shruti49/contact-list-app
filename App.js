import React, { useEffect } from "react";
// import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";

import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<SafeAreaView style={styles.container}>
					<AuthProvider>
						<PaperProvider>
							<AppNavigator />
						</PaperProvider>
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
