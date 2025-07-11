import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function MenuItem({ title }: { title: string }) {
	return (
		<TouchableOpacity>
			<Text>{title}</Text>
			<Feather name="chevron-right" size={20} color="gray" />
		</TouchableOpacity>
	);
}