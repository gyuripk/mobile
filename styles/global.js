import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalStyles() {
  const { isLargeText } = useTheme();
  const baseFontSize = 20;
  const titleFontSize = 16;
  const dateFontSize = 13;
  const timeFontSize = 12;
  const styles = StyleSheet.create({
    text: {
      fontSize: isLargeText ? baseFontSize + 8 : baseFontSize,
    },
    title: {
      fontSize: isLargeText ? titleFontSize + 8 : titleFontSize,
      fontWeight: "bold",
    },
    date: {
      fontSize: isLargeText ? dateFontSize + 8 : dateFontSize,
      color: "#888",
    },
    time: {
      fontSize: isLargeText ? timeFontSize + 8 : timeFontSize,
      color: "#888",
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
  });

  return styles;
}
