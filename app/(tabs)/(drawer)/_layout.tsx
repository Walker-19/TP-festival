import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerComponent from "../../../components/shared/drawer_component";
import Profil from "./profil";

const DrawerLayout = (): React.JSX.Element => {
	const route = useRouter();
	return (
		<GestureHandlerRootView>
			<Drawer drawerContent={(props) => <DrawerComponent {...props} />}>
				<Drawer.Screen
					name="billets"
					options={{
						headerRight: () => (
							<View style={{ flexDirection: "row", gap: 5, padding: 5 }}>
								<Feather
									name="user"
									size={24}
									color="black"
									style={{ marginRight: 15 }}
									onPress={() => route.navigate({ pathname: "./profil" })}
								/>
								<Feather
									name="shopping-cart"
									size={24}
									style={{ marginRight: 15 }}
									onPress={() => route.navigate({ pathname: "./cart" })}
								/>
							</View>
						),
					}}
					// component={Profil}
				/>
				<Drawer.Screen
					name="profil"
					options={{
						headerShown: false,
						headerLeft: () => null,
					}}
				/>
				<Drawer.Screen
					name="cart"
					options={{
						headerShown: false,
						headerLeft: () => null,
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
};

export default DrawerLayout;

const styles = StyleSheet.create({});
