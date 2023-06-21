import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyles } from "../constants/styles";
import { DUMMY_ORCHID } from "../data/dummy-data";
import FavoriteOrchidsOutput from "../components/FavoritesOrchidOutput/favoriteOrchidOutput";

function FavoritesScreen() {
  const navigation = useNavigation();
  const [favoriteOrchidslist, setFavoriteOrchidslist] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.getItem("storedOrchids");
          if (data !== null) {
            const parsedData = JSON.parse(data);

            const filterOrchids = DUMMY_ORCHID.filter((orchid) =>
              parsedData.includes(orchid.id)
            ).reverse();
            setFavoriteOrchidslist(filterOrchids);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Image
              source={require("../assets/1.png")}
              style={styles.imageDrawer}
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <View style={{ width: "70%", marginTop: 40 }}>
              <Text style={styles.textBase}>Favorites Orchid</Text>
            </View>
          </View>
        </View>
      </View>
      <FavoriteOrchidsOutput
        favoriteOrchids={favoriteOrchidslist}
        FavoriteOrchidsPeriod="Total"
      ></FavoriteOrchidsOutput>
    </View>
  );
}

export default FavoritesScreen;

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
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  imageDrawer: {
    height: 10,
    width: 20,
    marginTop: 60,
  },
  textBase: {
    fontSize: 28,
    color: GlobalStyles.colors.primary200,
    fontWeight: "bold",
  },
});
