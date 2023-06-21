import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { truncate } from "../../util/truncate";

function FavoriteOrchidItem({ id, description, title, image, date }) {
  const navigation = useNavigation();

  function onchidPressHandler() {
    navigation.navigate("OrchidDetail", {
      onchidId: id,
    });
  }

  return (
    <Animatable.View animation="slideInRight" duration={1000}>
      <TouchableHighlight
        onPress={onchidPressHandler}
        underlayColor={"#ccc"}
        style={styles.touchContainer}
      >
        <View style={styles.orchidItem}>
          <View style={[styles.imageContainer]}>
            <Image
              source={{ uri: image }} // Thay URL bằng đường dẫn hình ảnh thực tế của bạn
              style={styles.image} // Đặt kích thước cho hình ảnh
            />
          </View>
          <View style={styles.textContainer}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.title]}>
                {truncate(title, 20)}
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={[styles.textBase, styles.description]}>
                {truncate(description, 50)}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Animatable.View>
  );
}

export default FavoriteOrchidItem;
const styles = StyleSheet.create({
  touchContainer: {
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  orchidItem: {
    padding: 14,
    backgroundColor: GlobalStyles.colors.primary800,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary200,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  imageContainer: {
    marginRight: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
});
