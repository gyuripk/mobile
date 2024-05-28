import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

const useDeleteNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteNote = async (noteId, navigation) => {
    setIsLoading(true);
    setError(null);

    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      // Send DELETE request to the API
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to delete note");
      }

      Alert.alert("Success", "Note deleted successfully");
      navigation.navigate("Notes", { notesUpdated: true });
    } catch (err) {
      // Handle errors
      console.error("Error deleting note:", err);
      Alert.alert("Error", "Failed to delete note");
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteNote, isLoading, error };
};

export default useDeleteNote;
