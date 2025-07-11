import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";

const plan = () => {
	return (
		<GestureHandlerRootView>
			<ScrollView>
				<View>
					<Text>plan</Text>
				</View>
			</ScrollView>
		</GestureHandlerRootView>
	);
};

export default plan;

const styles = StyleSheet.create({});
