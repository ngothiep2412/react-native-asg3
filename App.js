import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import OrchidDetailScreen from "./screens/OrchidDetailScreen";
import AllOrchidsScreen from "./screens/AllOrchidsScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import ManageOrchid from "./screens/ManageOrchid";
import AboutUsScreen from "./screens/AboutusScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function OrchidsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        tabBarActiveTintColor: "white",
        headerRight: ({ tintColor }) =>
          route.name == "AllOrchids" ? (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageOrchid");
              }}
            ></IconButton>
          ) : (
            <></>
          ),
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
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="OrchidsOverview"
            component={OrchidsOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageOrchid"
            component={ManageOrchid}
            options={{
              presentation: "modal",
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="OrchidDetail"
            component={OrchidDetailScreen}
            options={{ title: "About the Orchid" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
