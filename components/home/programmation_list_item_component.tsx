import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import type ProgrammationListItemProps from "../../models/props/programmation_list_item_props";

const ProgrammationListItemComponent = ({
	programme,
}: ProgrammationListItemProps): React.JSX.Element => {
	return (
		<View>
			<Text>{programme.artist.name}</Text>
		</View>
	);
};

export default ProgrammationListItemComponent;

const styles = StyleSheet.create({});
