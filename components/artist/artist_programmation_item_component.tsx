import { Feather } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { fonts } from "../../constants/design_constants";
import type ArtistProgrammationItemProps from "../../models/props/artist_programmation_item_props";
import DateUtilsService from "../../services/date_utils_service";

const ArtistProgrammationItemComponent = ({
	programme,
	nbItems,
	index,
}: ArtistProgrammationItemProps): React.JSX.Element => {
	return (
		<View
			style={{
				...styles.container,
				width:
					nbItems > 1
						? Dimensions.get("window").width * 0.9 - 30
						: Dimensions.get("window").width - 30,
				marginRight: nbItems > 1 && index !== nbItems - 1 ? 15 : 0,
			}}
		>
			<Text style={styles.date}>
				{new DateUtilsService().getFullDate(programme.day.date).dayName}{" "}
				{new DateUtilsService().getFullDate(programme.day.date).dayNumber}{" "}
				{new DateUtilsService().getFullDate(programme.day.date).monthName}
			</Text>
			<View style={styles.timeContainer}>
				<Feather name="clock" style={styles.dateIcon} />
				<Text style={styles.dateText}>{programme.time_start}</Text>
				<Feather name="arrow-right" style={styles.dateIcon} />
				<Text style={styles.dateText}>{programme.time_end}</Text>
			</View>
			<View style={styles.stageContainer}>
				<Feather name="map-pin" style={styles.dateIcon} />
				<Text style={styles.dateText}>{programme.stage.name}</Text>
			</View>
		</View>
	);
};

export default ArtistProgrammationItemComponent;

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "rgba(255 255 255 / 1)",
		rowGap: 5,
	},
	date: {
		fontFamily: fonts.subtitle,
		fontSize: 18,
		textTransform: "capitalize",
	},
	timeContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 3,
	},
	dateIcon: {
		fontSize: 15,
	},
	dateText: {
		fontFamily: fonts.body,
	},
	stageContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 3,
	},
});
