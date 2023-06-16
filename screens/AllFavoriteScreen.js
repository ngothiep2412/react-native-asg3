import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

import FavoriteOutput from "../components/UI/FavoritesOutput/FavoriteOutput";

function AllFavoriteScreen() {
  return <FavoriteOutput></FavoriteOutput>;
}

export default AllFavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
