import { useEffect, useState } from "react";
import { StyleSheet, Text, View, VirtualizedList } from "react-native";
import { fonts } from "../../constants/design_constants";
import type Programme from "../../models/programme";
import ProgrammationApiService from "../../services/programmation_api_service";
import ProgrammationListItemComponent from "./programmation_list_item_component";

const ProgrammationListComponent = (): React.JSX.Element => {
	// état
	const [programmation, setProgrammation] = useState<Programme[]>([]);

	// exécuter des actions à l'affichage du composant
	useEffect(() => {
		// récupérer toute la programmation
		// then permet de récupérer les données lorsqu'une promesse est tenue
		new ProgrammationApiService()
			.getProgrammation()
			.then((data) => setProgrammation(data));
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Découvrez la programmation</Text>
			{/*
				liste défilante horizontale
				*/}
			<VirtualizedList
				data={programmation}
				// créer une props pour transmettre une donnée entre un composant parent et un composant enfant
				// les données sont accessibles à partir de la propriété item
				renderItem={(value) => (
					<ProgrammationListItemComponent programme={value.item} />
				)}
				getItem={(data: Programme[], index: number) => data[index]}
				getItemCount={(data: Programme[]) => data.length}
				horizontal
			/>
		</View>
	);
};

export default ProgrammationListComponent;

const styles = StyleSheet.create({
	container: {
		marginInlineStart: 15,
		marginBlockEnd: 30,
	},
	title: {
		fontFamily: fonts.subtitle,
		fontSize: 21,
	},
});
