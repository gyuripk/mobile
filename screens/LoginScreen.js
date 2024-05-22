import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // 이 부분은 실제 API 호출로 대체되어야 합니다.
    // 현재는 로컬에서 간단한 유효성 검사로 처리합니다.
    if (username === "test" && password === "password") {
      //username이 'test'이고, password가 'password'일 때만 로그인이 성공하도록 되어 있습니다.
      try {
        await AsyncStorage.setItem("token", "dummy-auth-token");
        navigation.navigate("Main"); // Main 화면으로 이동
      } catch (error) {
        Alert.alert("Error", "Failed to save the token.");
      }
    } else {
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  const handleSignup = () => {
    // 회원가입 화면으로 이동하는 로직 추가
    navigation.navigate("Signup"); // SignupScreen이 준비되면 사용
    // Alert.alert("Signup", "Signup screen not implemented yet.");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.signupText} onPress={handleSignup}>
        Don't have an account? Sign Up
      </Text>
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
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});
