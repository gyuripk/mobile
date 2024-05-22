import { Text, Switch, View, StyleSheet } from "react-native";
import { useState } from "react";
import { GlobalLayout } from "../components/Layout";

import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen() {
  const { isLargeText, setIsLargeText } = useTheme(); //default is small text
  // change [] -> {} for using theme values from useTheme()

  const globalStyles = GlobalStyles();

  return (
    <GlobalLayout>
      <View style={styles.view}>
        <Switch
          value={isLargeText}
          onValueChange={async () => {
            setIsLargeText(!isLargeText);
            // store the value in async storage
            await AsyncStorage.setItem(
              //save as JSON string
              "isLargeText", //key(only string)
              JSON.stringify(!isLargeText) //value (only string)
            );
          }} //oposite value -> 과제에서 이런식으로 쓰기
          trackColor={{ false: "gray", true: "blue" }}
        />
        <Text style={globalStyles.text}>Large Text</Text>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
});
