import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import AllFavoriteScreen from "./screens/AllFavoriteScreen";
import ManageFavorite from "./screens/ManageFavorite";
import FavoriteDetailScreen from "./screens/FavoriteDetailScreen";
import AboutUsScreen from "./screens/AboutusScreen";
import MarkedFavoriteScreen from "./screens/MarkedFavoriteScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function FavoritesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) =>
          route.name == "AllFavorites" ? (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageFavorite");
              }}
            ></IconButton>
          ) : (
            <></>
          ),
      })}
    >
      <BottomTabs.Screen
        name="AllFavorites"
        component={AllFavoriteScreen}
        options={{
          title: "All Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color}></Ionicons>
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="MarkedFavorite"
        component={MarkedFavoriteScreen}
        options={{
          title: "Marked Favorite",
          tabBarLabel: "Marked Favorite",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color}></Ionicons>
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          title: "About Us",
          tabBarLabel: "About Us",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information" size={size} color={color}></Ionicons>
          ),
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="FavoritesOverview"
            component={FavoritesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageFavorite"
            component={ManageFavorite}
            options={{
              presentation: "modal",
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="FavoriteDetail"
            component={FavoriteDetailScreen}
            options={{ title: "About the Favorite" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
