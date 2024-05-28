import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const useSaveNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveNote = async (note, noteId, navigation) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const method = noteId ? "PUT" : "POST";
      const endpoint = noteId
        ? `${API_URL}/notes/${noteId}`
        : `${API_URL}/notes`;

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to save note");
      }

      const data = await response.json();
      if (method === "POST") {
        Alert.alert("Success", "Note saved successfully");
      } else {
        Alert.alert("Success", "Note updated successfully");
      }
      navigation.navigate("Notes", { notesUpdated: true });
    } catch (err) {
      console.error("Error saving note:", err);
      Alert.alert("Error", "Failed to save note");
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveNote, isLoading, error };
};

export default useSaveNote;
