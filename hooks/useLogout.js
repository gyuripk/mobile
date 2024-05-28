import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "There was an error logging out. Please try again.");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading, error };
};

export default useLogout;
