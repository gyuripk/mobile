import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // useNavigation 훅 추가
import { GlobalStyles } from "../styles/global";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const globalStyles = GlobalStyles();
  const navigation = useNavigation(); // navigation 객체 가져오기

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
        navigation.navigate("Login"); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, globalStyles.text]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, globalStyles.text]}
        placeholder="Password"
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
        <Text style={globalStyles.text}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
