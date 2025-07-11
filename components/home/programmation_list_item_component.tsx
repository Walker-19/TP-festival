import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { BASE_URL } from "../../constants/config";
import { colors, fonts } from "../../constants/design_constants";
import type Artist from "../../models/artist";
import type ProgrammationListItemProps from "../../models/props/programmation_list_item_props";
import ArtistApiService from "../../services/artist_api_service";
import DateUtilsService from "../../services/date_utils_service";
import StringUtilsService from "../../services/string_utils_service";

const ProgrammationListItemComponent = ({
	programme,
}: ProgrammationListItemProps): React.JSX.Element => {
	const [artist, setArtist] = useState<Artist>({} as Artist);
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

	useEffect(() => {
		new ArtistApiService()
			.getArtistBySlug(programme.artist.slug)
			.then((data) => {
				setArtist(data as Artist);
				setFavorite();
			});
	}, [programme, setFavorite]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{
					...styles.iconBtn,
					backgroundColor: isFavorite ? colors.ternary : "rgba(0 0 0 / 0.2)",
				}}
				onPress={handleFavorite}
			>
				<Feather name="heart" style={styles.icon} />
			</TouchableOpacity>
			<TouchableWithoutFeedback
				onPress={() => router.push(`/artist/${programme.artist.slug}`)}
			>
				<View style={styles.innerContainer}>
					<Image
						source={`${BASE_URL}/images/artists/${programme.artist.poster}`}
						style={styles.img}
					/>
					<Text style={styles.artistName}>
						{new StringUtilsService().getTextOverflow(
							programme.artist.name,
							12,
						)}
					</Text>
					<View style={styles.musicTypeContainer}>
						<Ionicons name="pricetag-outline" />
						<Text style={styles.musicType}>{artist.music_type?.name}</Text>
					</View>
					<View style={styles.dateContainer}>
						<Feather name="calendar" />
						<Text style={styles.date}>
							{
								new DateUtilsService().getFullDate(programme.day.date)
									.dayNameShort
							}
							{". "}
							{new DateUtilsService().getFullDate(programme.day.date).month}/
							{new DateUtilsService().getFullDate(programme.day.date).month}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default ProgrammationListItemComponent;

const styles = StyleSheet.create({
	container: {
		marginInlineEnd: 15,
	},
	iconBtn: {
		width: 30,
		height: 30,
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 5,
		right: 10,
		zIndex: 1,
	},
	icon: {
		color: "white",
		fontSize: 15,
	},
	innerContainer: {
		width: 135,
		backgroundColor: "white",
		padding: 15,
	},
	img: {
		width: 90,
		height: 90,
		borderRadius: 45,
		alignSelf: "center",
	},
	artistName: {
		fontFamily: fonts.subtitle,
		marginBlock: 10,
	},
	musicTypeContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 5,
	},
	musicType: {
		fontFamily: fonts.body,
		fontSize: 11,
	},
	dateContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 5,
	},
	date: {
		fontFamily: fonts.body,
		fontSize: 11,
		textTransform: "capitalize",
	},
});
