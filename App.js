import React, { useEffect, useState } from "react"; // useState와 useEffect 추가
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //추가
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

// import NewsScreen from "./screens/NewsScreen";
import SettingScreen from "./screens/SettingScreen";
import SplashScreen from "./screens/SplashScreen"; //스플래쉬 화면 추가
import AboutScreen from "./screens/AboutScreen"; // Import AboutScreen
import NoteListScreen from "./screens/NoteListScreen";
import NoteScreen from "./screens/NoteScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { ThemeProvider } from "./context/theme"; // text size

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); //중복?

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Notes") {
            iconName = "book";
          } else if (route.name === "Setting") {
            iconName = "cog";
          } else if (route.name === "About") {
            iconName = "info-circle";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Notes" component={NoteListScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <NavigationContainer>
      <ThemeProvider theme={{}}>
        <Stack.Navigator>
          {/* 헤더를 숨김 */}
          {isSplashVisible ? (
            <Stack.Screen
              name="Splash"
              screenOptions={{ headerShown: false }}
              children={() => (
                <SplashScreen setSplashScreenVisible={setIsSplashVisible} />
              )}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                screenOptions={{ headerShown: false }}
              />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="NoteScreen" component={NoteScreen} />
            </>
          )}
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
