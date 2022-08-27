import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import AddContactScreen from "./src/screens/AddContactScreen";

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<AddContactScreen />
			<ExpoStatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
		paddingHorizontal: 16,
		backgroundColor: "#ededed",
	},
});
