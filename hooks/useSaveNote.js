import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const useSaveNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to save or update a note
  const saveNote = async (note, noteId, navigation) => {
    setIsLoading(true);
    setError(null);

    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      // Determine the HTTP method and endpoint based on whether noteId exists
      const method = noteId ? "PUT" : "POST";
      const endpoint = noteId
        ? `${API_URL}/notes/${noteId}`
        : `${API_URL}/notes`;
      // Make the API request to save or update the note
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
      // Show success message based on the method used
      const data = await response.json();
      if (method === "POST") {
        Alert.alert("Success", "Note saved successfully");
      } else {
        Alert.alert("Success", "Note updated successfully");
      }
      // Navigate back to the NoteListScreen and trigger a refresh
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
