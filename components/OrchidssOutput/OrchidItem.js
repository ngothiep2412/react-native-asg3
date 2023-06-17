import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { truncateDescription } from "../../util/truncate";

function OrchidItem({ id, description, title, image, date }) {
  const navigation = useNavigation();

  function onchidPressHandler() {
    navigation.navigate("OrchidDetail", {
      onchidId: id,
    });
  }

  return (
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
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
          <Text style={[styles.textBase, styles.description]}>
            {truncateDescription(description, 48)}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default OrchidItem;
const styles = StyleSheet.create({
  touchContainer: {
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  orchidItem: {
    padding: 14,
    // marginVertical: 8,
    // marginHorizontal: 8,
    backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: "row",
    // justifyContent: "space-between",
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
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary200,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    // fontWeight: "bold",
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
