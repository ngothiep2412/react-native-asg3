import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { DUMMY_ORCHID } from "../data/dummy-data";
import { FavoritesContext } from "../store/favorite-context";

function OrchidDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [count, setCount] = useState(1);

  const [isFavorited, setIsFavorite] = useState(false);
  const favoriteOchidsCtx = useContext(FavoritesContext);

  const onchidId = route.params.onchidId;
  const selectedOrchid = DUMMY_ORCHID.find((onchid) => onchid.id === onchidId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("storedOrchids");
        if (data !== null) {
          const parsedData = JSON.parse(data);

          setIsFavorite(parsedData.includes(onchidId));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  async function changeFavoriteStatusHandler() {
    if (isFavorited) {
      let listItem = [];
      AsyncStorage.getItem("storedOrchids")
        .then((data) => {
          if (data != null) {
            const parsedData = JSON.parse(data);
            const filteredData = parsedData.filter((item) => item !== onchidId);

            AsyncStorage.setItem(
              "storedOrchids",
              JSON.stringify(filteredData)
            ).then(() => {
              setIsFavorite(false);
            });
          }
        })
        .catch((error) => console.log(error));
      setIsFavorite(false);
    } else {
      favoriteOchidsCtx.addFavorite(onchidId);
      let listItem = [];
      AsyncStorage.getItem("storedOrchids")
        .then((data) => {
          if (data != null) {
            const parsedData = JSON.parse(data);
            listItem = [onchidId, ...parsedData];

            AsyncStorage.setItem(
              "storedOrchids",
              JSON.stringify(listItem)
            ).then(() => {
              setIsFavorite(true);
            });
          } else {
            listItem.push(onchidId);

            AsyncStorage.setItem(
              "storedOrchids",
              JSON.stringify(listItem)
            ).then(() => {});
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function removeCount() {
    if (count <= 0) {
      Alert.alert(
        "You can not subtract the quantity of this orchid",
        "Please add more",
        [
          {
            text: "Okay",
          },
        ]
      );
    } else {
      setCount(count - 1);
    }
  }

  function addCount() {
    if (count >= 99) {
      Alert.alert(
        "You can not add more the quantity of this orchid",
        "Please subtract",
        [
          {
            text: "Okay",
          },
        ]
      );
    } else {
      setCount(count + 1);
    }
  }

  function buy() {
    Alert.alert("This function is upading", "Please waiting....", [
      {
        text: "Okay",
      },
    ]);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary700 }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.backgroundImageContainer}>
          <ImageBackground
            style={styles.backgroundImage}
            source={{ uri: selectedOrchid.image }}
          >
            <View style={styles.header}>
              <View style={styles.headerBtn}>
                <IconButton
                  icon={"arrow-back"}
                  color={"white"}
                  size={20}
                  onPress={navigation.goBack}
                ></IconButton>
              </View>
              <View style={styles.headerBtn}>
                <IconButton
                  icon={"heart"}
                  size={20}
                  color={isFavorited ? "red" : "white"}
                  onPress={changeFavoriteStatusHandler}
                ></IconButton>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.categoryTag}>
            <Text style={{ color: GlobalStyles.colors.primary800 }}>
              {selectedOrchid.categoryId === 2 && "Phalaenopsis"}
              {selectedOrchid.categoryId === 3 && "Cattleya"}
              {selectedOrchid.categoryId === 4 && "Laddy's Slipper"}
              {selectedOrchid.categoryId === 5 && "Disa"}
            </Text>
          </View>
        </View>
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ height: 300 }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.detailsContainer}>
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: GlobalStyles.colors.primary200,
                    textAlign: "justify",
                  }}
                >
                  {selectedOrchid.title}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,
                color: GlobalStyles.colors.primary100,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Price
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: GlobalStyles.colors.error50,
                marginTop: 10,
              }}
            >
              {selectedOrchid.price}.00 $
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: GlobalStyles.colors.primary100,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              About
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: GlobalStyles.colors.error50,
                marginTop: 10,
              }}
            >
              {selectedOrchid.description}
            </Text>
          </View>
        </ScrollView>
        <View></View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable style={styles.borderBtn} onPress={removeCount}>
              <View>
                <Text style={styles.borderBtnText}>-</Text>
              </View>
            </Pressable>
            <View style={{ width: 45 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {count}
              </Text>
            </View>

            <Pressable style={styles.borderBtn} onPress={addCount}>
              <View>
                <Text style={styles.borderBtnText}>+</Text>
              </View>
            </Pressable>
          </View>
          <Pressable style={styles.buyBtn} onPress={buy}>
            <Text
              style={{
                color: GlobalStyles.colors.primary200,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Buy
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OrchidDetailScreen;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    width: "100%",
    textAlign: "justify",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    marginTop: 10,
    width: "100%",
  },
  categoryTag: {
    top: -60,
    left: 115,
    height: 40,
    width: 120,
    borderRadius: 5,
    backgroundColor: GlobalStyles.colors.accent500,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  borderBtn: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  borderBtnText: {
    fontWeight: "bold",
    fontSize: 28,

    color: GlobalStyles.colors.primary200,
  },
  buyBtn: {
    width: 150,
    height: 50,
    backgroundColor: GlobalStyles.colors.primary800,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
