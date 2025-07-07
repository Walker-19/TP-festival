import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [loaded] = useFonts({
		GelicaBlack: require("../assets/fonts/Gelica-Black.ttf"),
		ObviouslyCompressedSuper: require("../assets/fonts/Obviously-Compressed-Super.ttf"),
		ObviouslyCondensedSuper: require("../assets/fonts/Obviously-Condensed-Super.ttf"),
		ObviouslyMediumItalic: require("../assets/fonts/Obviously-Medium-Italic.ttf"),
		ParabolicaMedium: require("../assets/fonts/Parabolica-Medium.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	// définir la liste des écrans et leur personnalisation
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default RootLayout;
