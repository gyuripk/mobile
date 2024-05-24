// screens/AboutScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../styles/global";

const AboutScreen = () => {
  const globalStyles = GlobalStyles();
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text]}>About Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutScreen;
