// import { Text, Switch, View, StyleSheet } from "react-native";
// import { useState } from "react";
// import { GlobalLayout } from "../components/Layout";

// import { useTheme } from "../context/theme";
// import { GlobalStyles } from "../styles/global";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function SettingScreen() {
//   const { isLargeText, setIsLargeText } = useTheme(); //default is small text
//   // change [] -> {} for using theme values from useTheme()

//   const globalStyles = GlobalStyles();

//   return (
//     <GlobalLayout>
//       <View style={styles.view}>
//         <Switch
//           value={isLargeText}
//           onValueChange={async () => {
//             setIsLargeText(!isLargeText);
//             // store the value in async storage
//             await AsyncStorage.setItem(
//               //save as JSON string
//               "isLargeText", //key(only string)
//               JSON.stringify(!isLargeText) //value (only string)
//             );
//           }} //oposite value -> 과제에서 이런식으로 쓰기
//           trackColor={{ false: "gray", true: "blue" }}
//         />
//         <Text style={globalStyles.text}>Large Text</Text>
//       </View>
//     </GlobalLayout>
//   );
// }

// const styles = StyleSheet.create({
//   view: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });

import { Text, Switch, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const { isLargeText, setIsLargeText } = useTheme(); // default is small text

  const globalStyles = GlobalStyles();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // 토큰 삭제
      navigation.navigate("Login"); // 로그인 화면으로 이동
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <GlobalLayout>
      <View style={globalStyles.container}>
        <Switch
          value={isLargeText}
          onValueChange={async () => {
            setIsLargeText(!isLargeText);
            // store the value in async storage
            await AsyncStorage.setItem(
              // save as JSON string
              "isLargeText", // key (only string)
              JSON.stringify(!isLargeText) // value (only string)
            );
          }} // opposite value -> 과제에서 이런식으로 쓰기
          trackColor={{ false: "gray", true: "orange" }}
        />
        <Text style={globalStyles.text}>Large Text</Text>
      </View>
      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        {/* <Text style={[styles.buttonText, globalStyles.text]}>Logout</Text> */}
        <Text style={[globalStyles.buttonText, globalStyles.text]}>Logout</Text>
      </TouchableOpacity>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
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
