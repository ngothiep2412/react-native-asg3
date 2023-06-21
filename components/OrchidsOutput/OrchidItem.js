import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { truncate } from "../../util/truncate";

function OrchidItem({ id, title, image, date, rating, price }) {
  const navigation = useNavigation();

  function onchidPressHandler() {
    navigation.navigate("OrchidDetail", {
      onchidId: id,
    });
  }

  return (
    <Animatable.View animation="flipInX" duration={1000}>
      <Pressable
        onPress={onchidPressHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.orchidItem}>
          <View style={[styles.imageContainer]}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <View>
              <Text style={[styles.textBase, styles.title]}>
                {truncate(title, 13)}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    style={{ marginRight: 8 }}
                    name="md-cash-sharp"
                    color={GlobalStyles.colors.primary10}
                    size={16}
                  ></Ionicons>
                  <Text style={styles.textBase}>{price}.00 $</Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    style={{ marginRight: 8 }}
                    name="star"
                    color={GlobalStyles.colors.primary200}
                    size={16}
                  ></Ionicons>
                  <Text style={styles.textBase}>{rating}</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Animatable.View>
  );
}

export default OrchidItem;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
  orchidItem: {
    width: 155,
    padding: 10,
    margin: 10,
    height: 260,
    backgroundColor: "#F5F5F5",
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  textContainer: {
    flex: 1,
    maxWidth: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary200,
    marginBottom: 10,
  },

  imageContainer: {
    marginBottom: 10,
    overflow: "hidden",
    width: "100%",
    borderColor: GlobalStyles.colors.accent500,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
  },
  image: {
    height: 160,
    resizeMode: "cover",
  },
});
