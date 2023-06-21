import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function FavoriteOrchidsSummary({ favoriteOrchids, periodName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{favoriteOrchids.length}</Text>
    </View>
  );
}

export default FavoriteOrchidsSummary;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
  },
});
