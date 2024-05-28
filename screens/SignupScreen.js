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
import { useTheme } from "../context/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import useSignup from "../hooks/useSignup";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const globalStyles = GlobalStyles();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { handleSignup, isLoading, error } = useSignup();

  return (
    <View style={[styles.container, isDarkMode && { backgroundColor: "#333" }]}>
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
          },
        ]}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? "#bbb" : "#999"}
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
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => handleSignup(username, password)}
        disabled={isLoading}
      >
        <Text style={[globalStyles.buttonText, globalStyles.text]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.signupText, globalStyles.text]}>
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
  input: {
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "center",
  },
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
  icon: {
    marginBottom: 10,
  },
});
