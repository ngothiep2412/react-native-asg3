import { SwipeListView } from "react-native-swipe-list-view";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyles } from "../../constants/styles";
import FavoriteOrchidItem from "./favoriteOrchidItem";
import FavoriteOrchidsSummary from "./favoriteOrchidSummary";
import { DUMMY_ORCHID } from "../../data/dummy-data";

function renderOrchidItem(itemData) {
  return <FavoriteOrchidItem {...itemData.item}></FavoriteOrchidItem>;
}

function FavoriteOrchidList({ periodName, favoriteOrchids, fallbackText }) {
  const [favoriteOrchidsList, setFavoriteOrchidsList] =
    useState(favoriteOrchids);

  useEffect(() => {
    setFavoriteOrchidsList(favoriteOrchids);
  }, [favoriteOrchids]);

  function handleDeleteItem(id) {
    Alert.alert(
      "Are you sure?",
      "Will you not be able to recover this favorite",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Yes, delete it",
          onPress: async () => {
            await AsyncStorage.getItem("storedOrchids")
              .then((data) => {
                if (data != null) {
                  const parsedData = JSON.parse(data);
                  const filteredData = parsedData.filter((item) => item !== id);

                  AsyncStorage.setItem(
                    "storedOrchids",
                    JSON.stringify(filteredData)
                  ).then(() => {
                    const newFavoriteOrchids = DUMMY_ORCHID.filter((onchid) =>
                      filteredData.includes(onchid.id)
                    );
                    setFavoriteOrchidsList(newFavoriteOrchids);
                  });
                }
              })
              .catch((error) => console.log(error));
          },
        },
      ]
    );
  }

  let noItem = <Text style={styles.infoText}>{fallbackText}</Text>;
  let content;
  if (favoriteOrchidsList.length !== 0) {
    content = (
      <SwipeListView
        style={{ marginTop: 20 }}
        data={favoriteOrchidsList}
        renderItem={renderOrchidItem}
        keyExtractor={(item) => item.id}
        renderHiddenItem={({ item }) => (
          <View style={styles.hiddenItemContainer}>
            <Animatable.View animation="slideInRight" duration={1000}>
              {/* Component hiển thị nút xoá */}
              <TouchableOpacity
                onPress={() => handleDeleteItem(item.id)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </Animatable.View>
          </View>
        )}
        leftOpenValue={70}
        disableLeftSwipe={false}
        rightOpenValue={-70}
        disableRightSwipe={true}
        showsVerticalScrollIndicator={false}
        previewRowKey={"1"}
        previewOpenValue={80}
      />
    );
  }
  if (favoriteOrchidsList.length === 0) {
    noItem = (
      <View style={styles.noListContainer}>
        <Text style={styles.text}>You have no favorite orchid yet.</Text>
      </View>
    );
  }

  return (
    <>
      <FavoriteOrchidsSummary
        favoriteOrchids={favoriteOrchidsList}
        periodName={periodName}
      ></FavoriteOrchidsSummary>
      {noItem}
      {content}
    </>
  );
}

export default FavoriteOrchidList;

const styles = StyleSheet.create({
  hiddenItemContainer: {
    flex: 1,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  noListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
});
