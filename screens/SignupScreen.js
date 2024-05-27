import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../styles/global";
import { useTheme } from "../context/theme"; // 다크 모드 사용을 위한 추가
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const globalStyles = GlobalStyles();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme(); // 다크 모드 상태 가져오기

  const API_URL = "http://localhost:3000";

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User created successfully");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode && { backgroundColor: "#333" }, // 다크 모드일 때 배경색 변경
      ]}
    >
      {/* Add the icon above the Username input */}
      <FontAwesome5
        name="user"
        size={180}
        color={isDarkMode ? "#fff" : "orange"}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          globalStyles.text,
          isDarkMode && {
            backgroundColor: "#444",
            color: "#fff",
            borderColor: "#555",
          }, // 다크 모드일 때 입력 필드 스타일 변경
        ]}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? "#bbb" : "#999"} // 다크 모드일 때 플레이스홀더 색상 변경
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          globalStyles.text,
          isDarkMode && {
            backgroundColor: "#444",
            color: "#fff",
            borderColor: "#555",
          },
        ]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? "#bbb" : "#999"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
        <Text style={[globalStyles.buttonText, globalStyles.text]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          style={[styles.signupText, globalStyles.text]}
          // style={[
          //   globalStyles.text,
          //   isDarkMode && { color: "#fff" }, // 다크 모드일 때 텍스트 색상 변경
          // ]}
        >
          {"Already have an account?\nLogin"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   padding: 16,
  //   backgroundColor: "#fff",
  // },
  input: {
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10, // 둥근 테두리 추가
    alignSelf: "center", // 요소를 가로로 중앙에 배치
  },
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
  icon: {
    marginBottom: 10, // Add margin to position the icon properly
  },
});
