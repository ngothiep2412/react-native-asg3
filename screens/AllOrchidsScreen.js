import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

import OrchidOutput from "../components/OrchidssOutput/OrchidOutput";

function AllOrchidsScreen() {
  return <OrchidOutput></OrchidOutput>;
}

export default AllOrchidsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
