import { SwipeListView } from "react-native-swipe-list-view";

import FavoriteItem from "./FavoriteItem";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

function renderFavoriteItem(itemData) {
  return <FavoriteItem {...itemData.item}></FavoriteItem>;
}

function FavoriteList({ favorites }) {
  return (
    <SwipeListView
      data={favorites}
      renderItem={renderFavoriteItem}
      keyExtractor={(item) => item.id}
      renderHiddenItem={({ item }) => (
        <View style={styles.hiddenItemContainer}>
          {/* Component hiển thị nút xoá */}
          <TouchableOpacity
            onPress={() => handleDeleteItem(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={80} // Khoảng cách nút xoá hiển thị khi vuốt sang trái
      disableLeftSwipe={false} // Tắt khả năng vuốt sang trái
      rightOpenValue={-80} // Khoảng cách nút xoá hiển thị khi vuốt sang phải
      disableRightSwipe={true} // Bật
      showsVerticalScrollIndicator={false}
      previewRowKey={"1"}
      previewOpenValue={80}
    />
  );
}

export default FavoriteList;

const styles = StyleSheet.create({
  hiddenItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    marginRight: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
