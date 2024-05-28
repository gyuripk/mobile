import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const useSignup = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (username, password) => {
    setIsLoading(true);
    setError(null);

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
        setError(data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignup, isLoading, error };
};

export default useSignup;
