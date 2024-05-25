import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../styles/global";
import { GlobalLayout } from "../components/Layout";

const AboutScreen = () => {
  const globalStyles = GlobalStyles();
  return (
    <GlobalLayout>
      <View style={styles.container}>
        <Text style={[globalStyles.text]}>About Screen</Text>
      </View>
    </GlobalLayout>
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
