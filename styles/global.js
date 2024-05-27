import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalStyles() {
  const { isLargeText, isDarkMode } = useTheme();
  const baseFontSize = 16;
  const titleFontSize = 20;
  const dateFontSize = 14;
  const timeFontSize = 13;
  const styles = StyleSheet.create({
    text: {
      fontSize: isLargeText ? baseFontSize + 8 : baseFontSize,
      color: isDarkMode ? "#fff" : "#000",
    },
    title: {
      fontSize: isLargeText ? titleFontSize + 8 : titleFontSize,
      fontWeight: "bold",
      color: isDarkMode ? "#000" : "#000",
    },
    date: {
      fontSize: isLargeText ? dateFontSize + 8 : dateFontSize,
      color: isDarkMode ? "#bbb" : "#888",
    },
    time: {
      fontSize: isLargeText ? timeFontSize + 8 : timeFontSize,
      color: isDarkMode ? "#bbb" : "#888",
    },
    button: {
      backgroundColor: "orange",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
    },
    buttonText: {
      color: "#fff",
      fontSize: isLargeText ? baseFontSize - 2 + 10 : baseFontSize - 2,
    },
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#333" : "#fff",
      width: "100%",
      padding: 16,
    },
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "red",
    },
  });

  return styles;
}
