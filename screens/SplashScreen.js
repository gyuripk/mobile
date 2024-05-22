import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen({ setSplashScreenVisible }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenVisible(false); // SplashScreen을 숨김
    }, 2000); // 2초 후에 메인 화면으로 이동
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notes App</Text>
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
  },
});
