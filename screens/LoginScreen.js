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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";

export default function LoginScreen({ navigation }) {
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

  return (
    <GlobalLayout>
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
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});
