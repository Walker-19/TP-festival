import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { colors, fonts } from "../../constants/design_constants";
import type Stage from "../../models/stage";
import type StageType from "../../models/stage_type";

import StageApiService from "../../services/stage_api_services";


import StringUtilsService from "../../services/string_utils_service";

const ProgrammationScreen = (): React.JSX.Element => {
	const [typeStage, setTypeStage] = useState<StageType[]>();
	const [stage, setStage] = useState<Map<number, Stage[]>>();
	const route = useRouter();

	useEffect(() => {
		const fethcTypeStage = async () => {
			const data = await new StageApiService().getTypeStage();

			setTypeStage(data);

			const stageMap: Map<number, Stage[]> = new Map();
			for (const st of data) {
				const stage = await new StageApiService().getStageByType(st.id);

				stageMap.set(st.id, stage);
			}

			setStage(stageMap);
		};

		fethcTypeStage();
	}, []);

	return (
		<GestureHandlerRootView>
			<ScrollView>
				<View style={styles.content}>
					{Array.isArray(typeStage)
						? typeStage.map((stageType: StageType) => {
								return (
									<View style={styles.containerStage} key={stageType.id}>
										<Text style={{ fontSize: 22, fontFamily: fonts.subtitle }}>
											{stageType.name}
										</Text>
										<View style={styles.stageList}>
											{stage?.get(stageType.id)?.map((st) => {
												return (
													<TouchableOpacity
														onPress={() => route.navigate(`stage/${st.id}`)}
														key={st.id}
													>
														<View style={styles.itemStage}>
															<Text key={st.id}>
																{new StringUtilsService().getTextOverflow(
																	st.name,
																	40,
																)}
															</Text>
															<Feather size={20} name="chevron-right" />
														</View>
													</TouchableOpacity>
												);
											})}
										</View>
									</View>
								);
							})
						: null}
					<Text></Text>
				</View>
			</ScrollView>
		</GestureHandlerRootView>
	);
};

export default ProgrammationScreen;

const styles = StyleSheet.create({
	content: {
		width: Dimensions.get("screen").width,
		gap: 20,
		padding: 20,
		backgroundColor: colors.quaternary,
	},
	containerStage: {
		gap: 10,
	},
	stageList: {
		width: "100%",
		// padding: 10,
		backgroundColor: "#fff",
	},
	itemStage: {
		paddingBlock: 15,
		paddingInline: 10,
		borderBottomColor: colors.quaternary,
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
