import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyles } from "../styles/global";

export default function NoteScreen({ route, navigation }) {
  const { noteId, noteTitle } = route.params || {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  console.log("NoteScreen:", { noteId, noteTitle });

  const API_URL = "http://localhost:3000"; // 서버의 API URL

  useEffect(() => {
    if (noteId !== null) {
      fetchNote();
    }
  }, [noteId]);

  const fetchNote = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to fetch note");
      }

      const note = await response.json();
      setTitle(note.title);
      setContent(note.content);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const handleSave = () => {
    // 로컬 상태 업데이트 (임시로 처리)
    console.log("Saved:", { title, content });
    navigation.goBack();
  };

  const handleDelete = () => {
    // 로컬 상태 업데이트 (임시로 처리)
    console.log("Deleted note with id:", noteId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
      {noteId !== null && <Button title="Delete" onPress={handleDelete} />}
    </View>
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
});
