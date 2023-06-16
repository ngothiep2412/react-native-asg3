import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import HomeScreen from "./screens/HomeScreen";
import ManageFavorite from "./screens/ManageFavorite";
import FavoriteDetailScreen from "./screens/FavoriteDetailScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#3f2f25" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#3f2f25",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Favorites"
        component={CategoriesScreen}
        options={{
          title: "All Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="list"></Ionicons>
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="heart"></Ionicons>
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

function FavoritesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageFavorite");
            }}
          ></IconButton>
        ),
      })}
    >
      <BottomTabs.Screen
        name="Favorites"
        component={HomeScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color}></Ionicons>
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="AboutUs"
        component={HomeScreen}
        options={{
          title: "AboutUs",
          tabBarLabel: "AboutUs",
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
      <StatusBar style="auto">
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
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
              name="Drawer"
              component={DrawerNavigator}
              options={{
                headerShown: false,
                title: "All Favorites",
              }}
            />
            <Stack.Screen
              name="FavoriteDetail"
              component={FavoriteDetailScreen}
              options={{ title: "About the Favorite" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StatusBar>
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
