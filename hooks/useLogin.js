import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const useLogin = (navigation) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make a POST request to the login endpoint
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // If the response is OK, save the token and navigate to the main screen
      if (response.ok) {
        // Save the token in AsyncStorage
        await AsyncStorage.setItem("token", data.token);
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", data.message);
        setError(data.message);
      }
    } catch (error) {
      // Handle any other errors that occur during the request
      Alert.alert("Error", "An error occurred. Please try again.");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};

export default useLogin;
