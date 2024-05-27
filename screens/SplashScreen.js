import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/theme";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SplashScreen({ setSplashScreenVisible }) {
  const { isDarkMode } = useTheme(); // 다크 모드 상태 가져오기

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenVisible(false); // SplashScreen을 숨김
    }, 2000); // 2초 후에 메인 화면으로 이동
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <FontAwesome5
        name="lemon"
        size={100}
        color={isDarkMode ? "#fff" : "#fff"} // 다크 모드에서 오렌지 색상
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
    backgroundColor: "#FFA500", // 귤색 배경
  },
  darkContainer: {
    backgroundColor: "#333", // 다크 모드 배경 색상
  },
  icon: {
    marginBottom: 20, // 아이콘과 텍스트 사이의 여백 추가
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // 텍스트 색상을 흰색으로 변경
  },
  darkText: {
    color: "#FFA500", // 다크 모드에서 귤색 텍스트
  },
});
