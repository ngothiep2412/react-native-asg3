import { View, StyleSheet } from "react-native";

import OrchidList from "./OrchidList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_FAVORITE = [
  {
    id: "e1",
    title: "Flower",
    description: "A pair of shoes",
    image:
      "https://www.thespruce.com/thmb/oBjWlRxb7guqZPTdWvE3XfGhjdo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flowers_-5a3d5b9ee258f80036dbad77.jpg",
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    title: "Flower",
    description: "A pair of shoes",
    image:
      "https://www.thespruce.com/thmb/oBjWlRxb7guqZPTdWvE3XfGhjdo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flowers_-5a3d5b9ee258f80036dbad77.jpg",
    date: new Date("2021-12-19"),
  },
  {
    id: "e3",
    title: "Flower",
    description: "A pair of shoes",
    image:
      "https://www.thespruce.com/thmb/oBjWlRxb7guqZPTdWvE3XfGhjdo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flowers_-5a3d5b9ee258f80036dbad77.jpg",
    date: new Date("2021-12-19"),
  },
  {
    id: "e4",
    title: "Flower",
    description: "A pair of shoes",
    image:
      "https://www.thespruce.com/thmb/oBjWlRxb7guqZPTdWvE3XfGhjdo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flowers_-5a3d5b9ee258f80036dbad77.jpg",
    date: new Date("2021-12-19"),
  },
  {
    id: "e5",
    title: "Flower",
    description:
      "A pair of shoesA pair of shoesA pair of shoesA pair of shoesA pair of shoesA pair of shoesA pair of shoes",
    image:
      "https://www.thespruce.com/thmb/oBjWlRxb7guqZPTdWvE3XfGhjdo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flowers_-5a3d5b9ee258f80036dbad77.jpg",
    date: new Date("2021-12-19"),
  },
];

function OrchidOutput() {
  return (
    <View style={styles.container}>
      <OrchidList orchids={DUMMY_FAVORITE}></OrchidList>
    </View>
  );
}

export default OrchidOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
