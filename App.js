import React, { useEffect, useState } from "react";
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
          if (route.name === "Notes") {
            iconName = "book";
          } else if (route.name === "Setting") {
            iconName = "cog";
          } else if (route.name === "About") {
            iconName = "info-circle";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false, // 라벨 숨기기
      })}
    >
      <Tab.Screen
        name="Notes"
        component={NoteListScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Setting" component={SettingScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={{ headerTintColor: "orange" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <NavigationContainer>
      <ThemeProvider theme={{}}>
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
