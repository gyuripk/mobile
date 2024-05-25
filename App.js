import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import SettingScreen from "./screens/SettingScreen";
import SplashScreen from "./screens/SplashScreen";
import AboutScreen from "./screens/AboutScreen";
import NoteListScreen from "./screens/NoteListScreen";
import NoteScreen from "./screens/NoteScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { ThemeProvider } from "./context/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Setting") {
            iconName = "cog";
          } else if (route.name === "Notes") {
            iconName = "book";
          } else if (route.name === "About") {
            iconName = "info-circle";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false, // 라벨 숨기기
        tabBarStyle: {
          backgroundColor: "#fff", // 다크 모드에 맞는 색상
        },
      })}
    >
      <Tab.Screen
        name="Notes"
        component={NoteListScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="NoteScreen" component={NoteScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <NavigationContainer>
      <ThemeProvider>
        {/* Remove theme prop */}
        {/* <ThemeProvider theme={{}}> */}
        {isSplashVisible ? (
          <SplashScreen setSplashScreenVisible={setIsSplashVisible} />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainStack} />
          </Stack.Navigator>
        )}
      </ThemeProvider>
    </NavigationContainer>
  );
}
