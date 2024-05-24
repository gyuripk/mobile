import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalStyles() {
  const { isLargeText } = useTheme();
  const baseFontSize = 16;
  const styles = StyleSheet.create({
    text: {
      // fontSize: isLargeText ? 28 : 16,
      fontSize: isLargeText ? baseFontSize + 12 : baseFontSize, // 12를 기본 fontSize에 더함
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
      fontSize: 18,
    },
  });

  return styles;
}
