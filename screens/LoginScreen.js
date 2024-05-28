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
import useLogin from "../hooks/useLogin";

export default function LoginScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const { handleLogin, isLoading, error } = useLogin(navigation); // Use login hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const globalStyles = GlobalStyles();

  // Reset username and password fields when the screen is focused
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
        <Image style={styles.image} source={require("../assets/orange.png")} />
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
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => handleLogin(username, password)}
          disabled={isLoading}
        >
          <Text style={[globalStyles.buttonText, globalStyles.text]}>
            {isLoading ? "Logging in..." : "Login"}
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
    borderRadius: 10,
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: 10,
  },
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});
