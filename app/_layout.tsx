import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../constants/design_constants";
import UserIconBtnComponent from "../components/shared/user_icon_btn_component";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [loaded] = useFonts({
		GelicaBlack: require("../assets/fonts/Gelica-Black.ttf"),
		ObviouslyCompressedSuper: require("../assets/fonts/Obviously-Compressed-Super.ttf"),
		ObviouslyCondensedSuper: require("../assets/fonts/Obviously-Condensed-Super.ttf"),
		ObviouslyMediumItalic: require("../assets/fonts/Obviously-Medium-Italic.ttf"),
		ParabolicaMedium: require("../assets/fonts/Parabolica-Medium.ttf"),
	});

	const checkFavorites = useCallback(async () => {
		const favorites = await AsyncStorage.getItem("favorites");

		if (!favorites) {
			await AsyncStorage.setItem("favorites", JSON.stringify([]));
		}
	}, []);

	useEffect(() => {
		checkFavorites();

		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded, checkFavorites]);

	if (!loaded) {
		return null;
	}

	// définir la liste des écrans et leur personnalisation
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				headerStyle: styles.headerStyle,
				headerTitleAlign: "center",
				headerTitle: () => (
					<Image
						source={require("../assets/images/27839514-diaporama.png")}
						style={styles.headerTitle}
					/>
				),
				headerRight: () => <UserIconBtnComponent />,
			}}
		>
			{/* <Stack.Screen name="index" /> */}
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="artist/[slug]"
				options={{
					// animation permet de gérer les transitions entres écrans
					animation: "slide_from_bottom",
				}}
			/>
			<Stack.Screen
				name="stage/[stageId]"
				options={{
					headerShown: true,
					// header:
					// animation permet de gérer les transitions entres écrans
					animation: "slide_from_right",

				}}
			/>
      <Stack.Screen
				name="comment_venir"
				options={{
					// animation permet de gérer les transitions entres écrans
					animation: "slide_from_bottom",
					headerShown: true,
				}}
			/>
		</Stack>
	);
};

export default RootLayout;

const styles = StyleSheet.create({

	headerStyle: {
		backgroundColor: colors.secondary,
	},
	headerTitle: {
		width: 95,
		height: 40,
	},
        })

