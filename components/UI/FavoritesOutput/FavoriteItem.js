import { Pressable, StyleSheet, Text, View, Image } from "react-native";

import { GlobalStyles } from "../../../constants/styles";

function FavoriteItem({ description, title, image, date }) {
  return (
    <Pressable>
      <View style={styles.favoriteItem}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }} // Thay URL bằng đường dẫn hình ảnh thực tế của bạn
            style={styles.image} // Đặt kích thước cho hình ảnh
          />
        </View>
        <View>
          <Text style={[styles.textBase, styles.description]}>{title}</Text>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{date.toString()}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default FavoriteItem;
const styles = StyleSheet.create({
  favoriteItem: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  imageContainer: {
    marginRight: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
});
