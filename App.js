import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import OrchidDetailScreen from "./screens/OrchidDetailScreen";
import AllOrchidsScreen from "./screens/AllOrchidsScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import TodoScreen from "./screens/TodoScreen";

import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SafeAreaView, View, Image, Text } from "react-native";
import FavoritesContextProvider from "./store/favorite-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: "#351401" },
        // headerTintColor: "white",
        sceneContainerStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        drawerContentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        drawerInactiveTintColor: GlobalStyles.colors.primary700,
        drawerActiveTintColor: GlobalStyles.colors.primary800,
        drawerActiveBackgroundColor: GlobalStyles.colors.primary700,
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={require("./assets/user.jpg")}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: GlobalStyles.colors.gray700,
                }}
              >
                Ngô Xuân Thiệp
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: GlobalStyles.colors.gray700,
                }}
              >
                Student
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="All Orchids"
        component={OrchidsOverview}
        options={{
          title: "All Orchids",
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="list"></Ionicons>
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Todo App"
        component={TodoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="checkbox"></Ionicons>
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

function OrchidsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation, route }) => ({
        // headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        // headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        tabBarActiveTintColor: GlobalStyles.colors.primary200,
        tabBarInactiveTintColor: "white",
        headerShown: false,
      })}
    >
      <BottomTabs.Screen
        name="AllOrchids"
        component={AllOrchidsScreen}
        options={{
          title: "All Orchids",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color}></Ionicons>
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: "Favorite",
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color}></Ionicons>
          ),
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const [favoriteOrchids, setFavoriteOrchids] = useState([]);
  const [ready, setReady] = useState(false);

  const LoadFavoriteOrchids = () => {
    AsyncStorage.getItem("storedOrchids")
      .then((data) => {
        if (data != null) {
          setFavoriteOrchids(JSON.parse(data));
          console.log("data init: " + data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    async function prepare() {
      try {
        LoadFavoriteOrchids();
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
              headerTintColor: "white",
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="OrchidsOverview"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="OrchidDetail">
              {(props) => (
                <OrchidDetailScreen
                  {...props}
                  favoriteOrchids={favoriteOrchids}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}
