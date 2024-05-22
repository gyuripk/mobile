import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import NewsScreen from "./screens/NewsScreen";
import SettingScreen from "./screens/SettingScreen";

import { ThemeProvider } from "./context/theme"; // text size

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "News") {
                  iconName = "newspaper";
                } else if (route.name === "Setting") {
                  iconName = "cog";
                }
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
            };
          }}
        >
          <Tab.Screen name="News" component={NewsScreen} />
          <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
