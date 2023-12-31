import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import OrchidOutput from "../components/OrchidsOutput/OrchidOutput";

function AllOrchidsScreen() {
  // const navigation = useNavigation();
  return <OrchidOutput></OrchidOutput>;
}

export default AllOrchidsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    height: Dimensions.get("window").height / 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  imageDrawer: {
    height: 10,
    width: 20,
    marginTop: 60,
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  textWelcome: { fontSize: 24, color: "#FFF", fontWeight: "bold" },
  textShop: {
    fontSize: 28,
    color: GlobalStyles.colors.primary200,
    fontWeight: "bold",
  },
  imageUser: {
    height: 60,
    width: 60,
    borderRadius: 99,
  },
  linearContainer: {
    left: 0,
    right: 0,
    height: 90,
    marginTop: -45,
  },
  searchContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
