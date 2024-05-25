import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalLayout({ children }) {
  const { isDarkMode } = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}
    >
      <StatusBar style="auto" />
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#333" : "#fff" },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 25,
  },
});
