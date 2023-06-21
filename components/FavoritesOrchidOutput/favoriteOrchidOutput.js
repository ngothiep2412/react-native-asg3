import { StyleSheet, Text, View } from "react-native";

import FavoriteOrchidList from "./favoriteOrchidList";

function FavoriteOrchidsOutput({
  favoriteOrchids,
  FavoriteOrchidsPeriod,
  fallbackText,
}) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  content = (
    <FavoriteOrchidList
      periodName={FavoriteOrchidsPeriod}
      favoriteOrchids={favoriteOrchids}
      fallbackText={fallbackText}
    />
  );

  return <View style={styles.container}>{content}</View>;
}

export default FavoriteOrchidsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 0,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
