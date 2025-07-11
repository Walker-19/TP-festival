import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors, fonts } from "../../constants/design_constants";

const Menu = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Infos pratiques */}
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Infos pratiques</Text>
            <View style={styles.menuList}>
              {[
                { title: "Comment venir ?", route: "/comment_venir" },
                { title: "Plan du festival", route: "/infos/plan" },
                { title: "Victime ou témoin ?", route: "/infos/victime-temoin" },
                { title: "Prévention", route: "/infos/prevention" },
                { title: "Objets autorisés et interdits", route: "/infos/objets" },
                { title: "Infos billetterie", route: "/infos/billetterie" },
                { title: "Cashless", route: "/infos/cashless" },
                { title: "Contact", route: "/infos/contact" },
              ].map((item, index) => (
                <TouchableOpacity key={index} onPress={() => router.push(item.route)}>
                  <View style={styles.item}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Feather size={20} name="chevron-right" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* À propos */}
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <View style={styles.menuList}>
              <TouchableOpacity onPress={() => router.push("/infos/histoire")}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>L'histoire</Text>
                  <Feather size={20} name="chevron-right" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.quaternary,
  },
  content: {
    width: Dimensions.get("screen").width,
    padding: 20,
    gap: 20,
  },
  containerSection: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: fonts.subtitle,
  },
  menuList: {
    width: "100%",
    backgroundColor: "#fff",
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: colors.quaternary,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontFamily: fonts.body,
  },
});

