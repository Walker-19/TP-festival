import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { fonts } from "../../constants/design_constants";
import type Artist from "../../models/artist";
import type ProgrammationListItemProps from "../../models/props/programmation_list_item_props";
import ArtistApiService from "../../services/artist_api_service";
import DateUtilsService from "../../services/date_utils_service";
import StringUtilsService from "../../services/string_utils_service";

const ProgrammationListItemComponent = ({
	programme,
}: ProgrammationListItemProps): React.JSX.Element => {
	const [artist, setArtist] = useState<Artist>({} as Artist);

	useEffect(() => {
		new ArtistApiService()
			.getArtistBySlug(programme.artist.slug)
			.then((data) => setArtist(data as Artist));
	}, [programme]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.iconBtn}
				onPress={() => console.log("heart")}
			>
				<Feather name="heart" style={styles.icon} />
			</TouchableOpacity>
			<TouchableWithoutFeedback onPress={() => console.log("container")}>
				<View style={styles.innerContainer}>
					<Image
						source={`http://10.0.2.2:3000/images/artists/${programme.artist.poster}`}
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
		backgroundColor: "rgba(0 0 0 / 0.2)",
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
		width: 130,
		backgroundColor: "white",
		padding: 15,
	},
	img: {
		width: 70,
		height: 70,
		borderRadius: 35,
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
