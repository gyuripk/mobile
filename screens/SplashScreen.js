import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/theme";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SplashScreen({ setSplashScreenVisible }) {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <FontAwesome5
        name="lemon"
        size={100}
        color={isDarkMode ? "#fff" : "#fff"}
        style={styles.icon}
      />
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Citrus Scribbles
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA500",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  darkText: {
    color: "#FFA500",
  },
});
