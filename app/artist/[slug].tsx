import { Feather } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	FlatList,
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { colors } from "../../constants/design_constants";
import type Artist from "../../models/artist";
import type ArtistCountry from "../../models/artist_country";
import type ArtistSocial from "../../models/artist_social";
import type ArtistSlugParams from "../../models/params/artist_slug_params";
import type Programme from "../../models/programme";
import ArtistApiService from "../../services/artist_api_service";
import ArtistCountryApiService from "../../services/artist_country_api_service";
import ArtistSocialApiService from "../../services/artist_social_api_service";
import ProgrammationApiService from "../../services/programmation_api_service";

const ArtistSlug = (): React.JSX.Element => {
	// récupérer le slug contenu dans la route
	const { slug } = useLocalSearchParams<ArtistSlugParams>();

	// états
	const [artist, setArtist] = useState<Artist>({} as Artist);
	const [programmation, setProgrammation] = useState<Programme[]>([]);
	const [artistCountries, setArtistCountries] = useState<ArtistCountry[]>([]);
	const [artistSocials, setArtistSocials] = useState<ArtistSocial[]>([]);

	// exécuter des actions à l'affichage du composant
	useEffect(() => {
		// récupérer l'artiste par son slug
		new ArtistApiService().getArtistBySlug(slug).then((data) => {
			setArtist(data as Artist);

			// récupérer la programmation de l'artiste par son id
			new ProgrammationApiService()
				.getProgrammationByArtistId(data?.id as number)
				.then((data) => setProgrammation(data));

			// récupérer les pays de l'artiste par son id
			new ArtistCountryApiService()
				.getCountriesByArtistId(data?.id as number)
				.then((data) => setArtistCountries(data));

			// récupérer les réseaux sociaux de l'artiste par son id
			new ArtistSocialApiService()
				.getSocialsByArtistId(data?.id as number)
				.then((data) => setArtistSocials(data));
		});
	}, [slug]);

	return (
		<GestureHandlerRootView>
			<ScrollView>
				<TouchableOpacity
					style={styles.closeIconBtn}
					onPress={() => router.back()}
				>
					<Feather name="x" style={styles.closeIcon} />
				</TouchableOpacity>
				<ImageBackground
					source={`http://10.0.2.2:3000/images/artists/${artist.poster}`}
					contentFit="cover"
					style={styles.poster}
				>
					<Text>{artist?.name}</Text>
					<Text>{artist?.music_type?.name}</Text>
				</ImageBackground>
				<View>
					<FlatList
						data={programmation}
						renderItem={(value) => <Text>{value.item.day.date}</Text>}
						horizontal
					/>
				</View>
				<Text>
					{artistCountries.map((value) => value.country.name).join(" / ")}
				</Text>
				{/* afficher les réseaux sociaux en utilisant map */}
			</ScrollView>
		</GestureHandlerRootView>
	);
};

export default ArtistSlug;

const styles = StyleSheet.create({
	closeIconBtn: {
		width: 40,
		height: 40,
		backgroundColor: colors.quaternary,
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 35,
		right: 15,
		zIndex: 1,
	},
	closeIcon: {
		fontSize: 20,
		color: "rgba(0 0 0 / 1)",
	},
	poster: {
		// width: Dimensions.get("window").width,
		height: Dimensions.get("window").height * 0.5,
		opacity: 0.7,
		backgroundColor: colors.ternary,
		padding: 15,
		justifyContent: "flex-end",
	},
});
