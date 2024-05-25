import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

export function GlobalLayout({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     width: "100%",
//     padding: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "red", //헤더, 푸터 부분 배경색
  },
  container: {
    flex: 1,
    backgroundColor: "blue", //헤더 빼고 배경색
    width: "100%",
    padding: 25, // Adjust this value as needed
  },
});
