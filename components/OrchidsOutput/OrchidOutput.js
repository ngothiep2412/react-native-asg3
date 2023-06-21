import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrchidList from "./OrchidList";
import { GlobalStyles } from "../../constants/styles";
import { DUMMY_ORCHID, categoryTab } from "../../data/dummy-data";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
function OrchidOutput() {
  const [categoryId, setCategoryId] = useState(1);
  const [dataList, setDataList] = useState([
    ...DUMMY_ORCHID.sort((a, b) => new Date(b.date) - new Date(a.date)),
  ]);
  const [search, setSearch] = useState();

  const navigation = useNavigation();

  function setCategoryFilter(categoryId) {
    if (categoryId !== 1) {
      setDataList([
        ...DUMMY_ORCHID.filter((item) => item.categoryId === categoryId).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
      ]);
    } else {
      let sortedData = [...DUMMY_ORCHID];

      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDataList(sortedData);
    }
    setCategoryId(categoryId);
  }

  function searchFilter(text) {
    let sortedData = [...DUMMY_ORCHID];

    sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    let filteredData = sortedData;

    if (categoryId !== 1) {
      filteredData = filteredData.filter(
        (item) => item.categoryId === categoryId
      );
    }

    if (text) {
      const searchText = text.toUpperCase();
      filteredData = filteredData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : "";
        return itemData.includes(searchText);
      });
    }

    setDataList(filteredData);
    setSearch(text);
  }

  return (
    <View style={styles.rootContainer}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Image
              source={require("../../assets/1.png")}
              style={styles.imageDrawer}
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <View style={{ width: "70%" }}>
              <Text style={styles.textWelcome}>Welcome to</Text>
              <Text style={styles.textShop}>Plant Orchid Shop</Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <TouchableOpacity onPress={navigation.openDrawer}>
                <Image
                  source={require("../../assets/user.jpg")}
                  style={styles.imageUser}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={["#1B1465", "transparent"]}
          style={styles.linearContainer}
        >
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              value={search}
              underlineColorAndroid="transparent"
              onChangeText={(text) => searchFilter(text)}
              placeholderTextColor={GlobalStyles.colors.primary400}
              style={{
                fontSize: 18,
                width: 260,
              }}
            />
            <Ionicons
              name="search"
              color={GlobalStyles.colors.primary400}
              size={24}
            ></Ionicons>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.listTab}
          >
            {categoryTab.map((item) => (
              <TouchableOpacity
                style={[
                  styles.btnTab,
                  categoryId === item.id && styles.btnActive,
                ]}
                key={item.id}
                onPress={() => setCategoryFilter(item.id)}
              >
                <View style={{ height: 20 }}>
                  <Text
                    style={[
                      styles.textTab,
                      categoryId === item.id && styles.textActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <OrchidList orchids={dataList}></OrchidList>
      </View>
    </View>
  );
}

export default OrchidOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    height: Dimensions.get("window").height / 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  imageDrawer: {
    height: 10,
    width: 20,
    marginTop: 60,
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  textWelcome: { fontSize: 24, color: "#FFF", fontWeight: "bold" },
  textShop: {
    fontSize: 28,
    color: GlobalStyles.colors.primary200,
    fontWeight: "bold",
  },
  imageUser: {
    height: 60,
    width: 60,
    borderRadius: 99,
  },
  linearContainer: {
    left: 0,
    right: 0,
    height: 90,
    marginTop: -45,
  },

  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  btnTab: {
    width: Dimensions.get("window").width / 2.8,
    flexDirection: "row",
    borderColor: GlobalStyles.colors.primary100,
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#F2F3EE",
    marginRight: 10,
  },
  textTab: {
    fontSize: 16,
    color: GlobalStyles.colors.gray500,
  },
  btnActive: {
    backgroundColor: GlobalStyles.colors.primary700,
  },
  textActive: {
    color: GlobalStyles.colors.primary800,
  },
  searchContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
