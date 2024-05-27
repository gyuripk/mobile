// // import { Text, Switch, View, StyleSheet, TouchableOpacity } from "react-native";
// // import { GlobalLayout } from "../components/Layout";
// // import { useTheme } from "../context/theme";
// // import { GlobalStyles } from "../styles/global";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // export default function SettingScreen({ navigation }) {
// //   const { isLargeText, setIsLargeText, isDarkMode, setIsDarkMode } = useTheme();

// //   const globalStyles = GlobalStyles();

// //   const handleLogout = async () => {
// //     try {
// //       await AsyncStorage.removeItem("token");
// //       navigation.navigate("Login");
// //     } catch (error) {
// //       console.error("Error logging out:", error);
// //     }
// //   };

// //   return (
// //     <GlobalLayout>
// //       <View style={globalStyles.container}>
// //         <Switch
// //           value={isLargeText}
// //           onValueChange={async () => {
// //             setIsLargeText(!isLargeText);
// //             await AsyncStorage.setItem(
// //               "isLargeText",
// //               JSON.stringify(!isLargeText)
// //             );
// //           }}
// //           trackColor={{ false: "gray", true: "orange" }}
// //         />
// //         <Text style={globalStyles.text}>Large Text</Text>
// //         <Switch
// //           value={isDarkMode}
// //           onValueChange={async () => {
// //             setIsDarkMode(!isDarkMode);
// //             await AsyncStorage.setItem(
// //               "isDarkMode",
// //               JSON.stringify(!isDarkMode)
// //             );
// //           }}
// //           trackColor={{ false: "gray", true: "orange" }}
// //         />
// //         <Text style={globalStyles.text}>Dark Mode</Text>
// //       </View>
// //       <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
// //         <Text style={[globalStyles.buttonText, globalStyles.text]}>Logout</Text>
// //       </TouchableOpacity>
// //     </GlobalLayout>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   view: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   button: {
// //     backgroundColor: "#007BFF",
// //     padding: 16,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     marginTop: 16,
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontSize: 18,
// //   },
// // });

//-------------------test1
// import { Text, Switch, View, StyleSheet, TouchableOpacity } from "react-native";
// import { GlobalLayout } from "../components/Layout";
// import { useTheme } from "../context/theme";
// import { GlobalStyles } from "../styles/global";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function SettingScreen({ navigation }) {
//   const { isLargeText, setIsLargeText, isDarkMode, setIsDarkMode } = useTheme();

//   const globalStyles = GlobalStyles();

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       navigation.navigate("Login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <GlobalLayout>
//       <View style={globalStyles.container}>
//         <View
//           style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
//         >
//           <View style={styles.switchContainer}>
//             <Text style={globalStyles.text}>Large Text</Text>
//             <Switch
//               value={isLargeText}
//               onValueChange={async () => {
//                 setIsLargeText(!isLargeText);
//                 await AsyncStorage.setItem(
//                   "isLargeText",
//                   JSON.stringify(!isLargeText)
//                 );
//               }}
//               trackColor={{ false: "gray", true: "orange" }}
//             />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text style={globalStyles.text}>Dark Mode</Text>
//             <Switch
//               value={isDarkMode}
//               onValueChange={async () => {
//                 setIsDarkMode(!isDarkMode);
//                 await AsyncStorage.setItem(
//                   "isDarkMode",
//                   JSON.stringify(!isDarkMode)
//                 );
//               }}
//               trackColor={{ false: "gray", true: "orange" }}
//             />
//           </View>
//         </View>
//         <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
//           <Text style={[globalStyles.buttonText, globalStyles.text]}>
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </GlobalLayout>
//   );
// }

// const styles = StyleSheet.create({
//   view: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
//   switchContainer: {
//     marginBottom: 20,
//   },
// });

//--------------------
import { Text, Switch, View, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";

export default function SettingScreen({ navigation }) {
  const { isLargeText, setIsLargeText, isDarkMode, setIsDarkMode } = useTheme();

  const globalStyles = GlobalStyles();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "There was an error logging out. Please try again.");
    }
  };

  useEffect(() => {
    const updateIsLargeText = async () => {
      await AsyncStorage.setItem("isLargeText", JSON.stringify(isLargeText));
    };

    updateIsLargeText();
  }, [isLargeText]);

  useEffect(() => {
    const updateIsDarkMode = async () => {
      await AsyncStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    };

    updateIsDarkMode();
  }, [isDarkMode]);
  return (
    <GlobalLayout>
      <View style={globalStyles.container}>
        <View style={styles.switchContainer}>
          <Text style={globalStyles.text}>Large Text</Text>
          <Switch
            value={isLargeText}
            onValueChange={() => setIsLargeText(!isLargeText)}
            trackColor={{ false: "gray", true: "orange" }}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={globalStyles.text}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
            trackColor={{ false: "gray", true: "orange" }}
          />
        </View>
        <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
          <Text style={[globalStyles.buttonText, globalStyles.text]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
