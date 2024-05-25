import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import { useTheme } from "../context/theme";

export default function LoginScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:3000";
  const globalStyles = GlobalStyles();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  // useEffect를 사용하여 컴포넌트가 마운트될 때 입력 필드를 초기화
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUsername("");
      setPassword("");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <GlobalLayout>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <Image
          style={styles.image}
          source={require("../assets/orange.png")} // Replace with the path to your image
        />
        <TextInput
          style={[
            styles.input,
            globalStyles.text,
            isDarkMode && styles.inputDark,
          ]}
          placeholder="Username"
          placeholderTextColor={isDarkMode ? "#ccc" : "#999"}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={[
            styles.input,
            globalStyles.text,
            isDarkMode && styles.inputDark,
          ]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? "#ccc" : "#999"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={[globalStyles.buttonText, globalStyles.text]}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.signupText, globalStyles.text]}
          onPress={() => navigation.navigate("Signup")}
        >
          {"Don't have an account?\nSign Up"}
        </Text>
      </View>
    </GlobalLayout>
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
  containerDark: {
    backgroundColor: "#333",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: "60%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 10, // 추가된 부분: 둥근 테두리 설정
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: 10, // 추가된 부분: 다크모드에서도 둥근 테두리 설정
  },
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});
