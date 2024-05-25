import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export default function SplashScreen({ setSplashScreenVisible }) {
  const { isDarkMode } = useTheme(); // 다크 모드 상태 가져오기

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenVisible(false); // SplashScreen을 숨김
    }, 2000); // 2초 후에 메인 화면으로 이동
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, isDarkMode && { backgroundColor: "#000" }]}>
      <Text style={[styles.text, isDarkMode && { color: "#fff" }]}>
        Notes App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
});
