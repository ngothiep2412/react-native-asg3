import { SwipeListView } from "react-native-swipe-list-view";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OrchidItem from "./OrchidItem";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function renderOrchidItem(itemData) {
  return <OrchidItem {...itemData.item}></OrchidItem>;
}

function OrchidList({ orchids }) {
  const navigation = useNavigation();
  function onchidPressHandlerEdit(id) {
    navigation.navigate("ManageOrchid", {
      onchidId: id,
    });
  }
  return (
    <SwipeListView
      data={orchids}
      renderItem={renderOrchidItem}
      keyExtractor={(item) => item.id}
      renderHiddenItem={({ item }) => (
        <View style={styles.hiddenItemContainer}>
          {/* Component hiển thị nút chỉnh sửa */}
          <TouchableOpacity
            onPress={() => onchidPressHandlerEdit(item.id)}
            style={styles.editButton}
          >
            <Ionicons name="create" size={20} color="white" />
          </TouchableOpacity>
          {/* Component hiển thị nút xoá */}
          <TouchableOpacity
            onPress={() => handleDeleteItem(item.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={100} // Khoảng cách nút xoá hiển thị khi vuốt sang trái
      disableLeftSwipe={false} // Tắt khả năng vuốt sang trái
      rightOpenValue={-100} // Khoảng cách nút xoá hiển thị khi vuốt sang phải
      disableRightSwipe={true} // Bật
      showsVerticalScrollIndicator={false}
      previewRowKey={"1"}
      previewOpenValue={80}
    />
  );
}

export default OrchidList;

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
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "blue",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
