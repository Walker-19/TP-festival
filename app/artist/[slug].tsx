import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import YoutubePlayer from "react-native-youtube-iframe";
import ArtistProgrammationItemComponent from "../../components/artist/artist_programmation_item_component";
import ArtistSocialsItemComponent from "../../components/artist/artist_socials_item_component";
import { colors, fonts } from "../../constants/design_constants";
import type Artist from "../../models/artist";
import type ArtistCountry from "../../models/artist_country";
import type ArtistSocial from "../../models/artist_social";
import type ArtistSlugParams from "../../models/params/artist_slug_params";
import type Programme from "../../models/programme";
import ArtistApiService from "../../services/artist_api_service";
import ArtistCountryApiService from "../../services/artist_country_api_service";
import ArtistSocialApiService from "../../services/artist_social_api_service";
import ProgrammationApiService from "../../services/programmation_api_service";
import StringUtilsService from "../../services/string_utils_service";

const ArtistSlug = (): React.JSX.Element => {
	// récupérer le slug contenu dans la route
	const { slug } = useLocalSearchParams<ArtistSlugParams>();

	// états
	const [artist, setArtist] = useState<Artist>({} as Artist);
	const [programmation, setProgrammation] = useState<Programme[]>([]);
	const [artistCountries, setArtistCountries] = useState<ArtistCountry[]>([]);
	const [artistSocials, setArtistSocials] = useState<ArtistSocial[]>([]);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const setFavorite = useCallback(async () => {
		const favorites: number[] = JSON.parse(
			(await AsyncStorage.getItem("favorites")) as string,
		);

		if (favorites.indexOf(artist.id) !== -1) {
			setIsFavorite(true);
		}
	}, [artist]);

	const handleFavorite = async () => {
		setIsFavorite(!isFavorite);

		const favorites: number[] = JSON.parse(
			(await AsyncStorage.getItem("favorites")) as string,
		);

		if (favorites.indexOf(artist.id) === -1) {
			favorites.push(artist.id);
		} else {
			favorites.splice(favorites.indexOf(artist.id), 1);
		}

		await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
	};

	// exécuter des actions à l'affichage du composant
	useEffect(() => {
		// récupérer l'artiste par son slug
		new ArtistApiService().getArtistBySlug(slug).then((data) => {
			setArtist(data as Artist);
			setFavorite();

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
	}, [slug, setFavorite]);

	return (
		<GestureHandlerRootView>
			<View>
				<TouchableOpacity
					style={styles.closeIconBtn}
					onPress={() => router.back()}
				>
					<Feather name="x" style={styles.closeIcon} />
				</TouchableOpacity>
				<ScrollView>
					<View>
						<ImageBackground
							source={`http://10.0.2.2:3000/images/artists/${artist.poster}`}
							contentFit="cover"
							style={styles.poster}
						></ImageBackground>
						<View style={styles.artistMusicTypeContainer}>
							<Text style={styles.artist}>{artist?.name}</Text>
							<View style={styles.musicTypeContainer}>
								<Ionicons
									name="pricetag-outline"
									style={styles.musicTypeIcon}
								/>
								<Text style={styles.musicType}>{artist?.music_type?.name}</Text>
							</View>
						</View>
					</View>

					<View style={styles.programmationContainer}>
						<FlatList
							data={programmation}
							renderItem={(value) => (
								<ArtistProgrammationItemComponent
									programme={value.item}
									nbItems={programmation.length}
									index={value.index}
								/>
							)}
							horizontal
						/>
						<TouchableOpacity
							style={{
								...styles.favoriteIconBtn,
								backgroundColor: isFavorite
									? colors.ternary
									: "rgba(200 200 200 / 1)",
							}}
						>
							<Feather
								name="heart"
								style={styles.favoriteIcon}
								// onPress={handleFavorite}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.contentContainer}>
						<Text style={styles.countries}>
							{artistCountries.map((value) => value.country.name).join(" / ")}
						</Text>
						<View style={styles.descriptionContainer}>
							{artist?.description?.map((value) => (
								<Text key={Math.random()} style={styles.description}>
									{value}
								</Text>
							))}
						</View>
						<View style={styles.videoContainer}>
							<YoutubePlayer
								height={215}
								videoId={new StringUtilsService().getYouTubeVideoId(
									artist?.video,
								)}
							/>
						</View>
						<View style={styles.socialsContainer}>
							{artistSocials.map((value) => (
								<ArtistSocialsItemComponent
									key={Math.random()}
									artistSocial={value}
								/>
							))}
						</View>
					</View>
				</ScrollView>
			</View>
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
	artistMusicTypeContainer: {
		position: "absolute",
		left: 15,
		bottom: 15,
	},
	artist: {
		fontFamily: fonts.subtitle,
		fontSize: 42,
		color: "rgba(255 255 255 / 1)",
	},
	musicTypeContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 5,
	},
	musicTypeIcon: {
		fontSize: 17,
		color: "rgba(255 255 255 / 1)",
	},
	musicType: {
		fontFamily: fonts.body,
		fontSize: 17,
		color: "rgba(255 255 255 / 1)",
	},
	programmationContainer: {
		padding: 15,
	},
	favoriteIconBtn: {
		width: 35,
		height: 35,
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 45,
		right: 30,
		zIndex: 1,
	},
	favoriteIcon: {
		color: "white",
		fontSize: 20,
	},
	contentContainer: {
		paddingHorizontal: 15,
	},
	countries: {
		fontFamily: fonts.body,
		fontSize: 17,
		color: colors.ternary,
		marginBlockEnd: 15,
	},
	descriptionContainer: {
		rowGap: 15,
	},
	description: {
		fontFamily: fonts.body,
		lineHeight: 16,
	},
	videoContainer: {
		marginBlockStart: 15,
	},
	socialsContainer: {
		flexDirection: "row",
		columnGap: 15,
		marginBlockStart: 15,
		marginBlockEnd: 45,
	},
});
