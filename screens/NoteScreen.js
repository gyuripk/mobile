import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/global";
import { GlobalLayout } from "../components/Layout";
import { format } from "date-fns";

export default function NoteScreen({ route, navigation }) {
  const { noteId, noteTitle, noteContent } = route.params || {};
  const [title, setTitle] = useState(noteTitle || "");
  const [content, setContent] = useState(noteContent || "");
  // console.log("NoteScreen:", { noteId, noteTitle });
  const API_URL = "http://localhost:3000"; // 서버의 API URL
  const globalStyles = GlobalStyles();

  useEffect(() => {
    if (noteId !== null) {
      setTitle(noteTitle || "");
      setContent(noteContent || "");
    }
  }, [noteId]);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      console.log("noteId:", noteId);

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
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to save note");
      }

      const data = await response.json();
      if (method == "POST") {
        Alert.alert("Success", "Note saved successfully");
      } else {
        Alert.alert("Success", "Note updated successfully");
      }
      // navigation.goBack();
      // 노트 수정 시 상태 업데이트
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error("Error saving note:", error);
      Alert.alert("Error", "Failed to save note");
    }
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

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
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting note:", error);
      Alert.alert("Error", "Failed to delete note");
    }
  };

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, globalStyles.title]}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, globalStyles.text]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
          <Text style={[styles.buttonText, globalStyles.text]}>Save</Text>
        </TouchableOpacity>
        {noteId !== null && (
          <TouchableOpacity style={globalStyles.button} onPress={handleDelete}>
            <Text style={[globalStyles.buttonText, globalStyles.text]}>
              Delete
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
