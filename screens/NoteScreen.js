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
import { useTheme } from "../context/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import NoteListScreen from "./NoteListScreen";

export default function NoteScreen({ route, navigation }) {
  const { noteId, noteTitle, noteContent, noteCreatedAt, noteModifiedAt } =
    route.params || {};
  const [title, setTitle] = useState(noteTitle || "");
  const [content, setContent] = useState(noteContent || "");
  const { isDarkMode, isLargeText } = useTheme();
  const API_URL = "http://localhost:3000";
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
      setTitle(data.title);
      setContent(data.content);
      // 노트가 업데이트되었음을 알림
      navigation.navigate("Notes", { notesUpdated: true });
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
      // 노트가 업데이트되었음을 알림
      navigation.navigate("Notes", { notesUpdated: true });
      // navigation.goBack();
    } catch (error) {
      console.error("Error deleting note:", error);
      Alert.alert("Error", "Failed to delete note");
    }
  };

  return (
    <GlobalLayout>
      <View style={[styles.container, isDarkMode && globalStyles.container]}>
        <TextInput
          style={[
            styles.titleInput,
            globalStyles.title,
            isDarkMode && globalStyles.text,
          ]}
          placeholder="Title"
          placeholderTextColor={isDarkMode ? "#bbb" : "#999"}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[
            styles.contentInput,
            globalStyles.text,
            isDarkMode && globalStyles.text,
          ]}
          placeholder="Content"
          placeholderTextColor={isDarkMode ? "#bbb" : "#999"}
          value={content}
          onChangeText={setContent}
          multiline
        />
        {noteId !== null && (
          <View style={styles.dateContainer}>
            {noteCreatedAt && (
              <Text style={globalStyles.date}>
                Created: {format(new Date(noteCreatedAt), "dd MMM yyyy, HH:mm")}
              </Text>
            )}
            {noteModifiedAt && (
              <Text style={globalStyles.date}>
                Last modified:{" "}
                {format(new Date(noteModifiedAt), "dd MMM yyyy, HH:mm")}
              </Text>
            )}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.saveButton]} onPress={handleSave}>
            <FontAwesome5
              name="save"
              size={isLargeText ? 25 : 20}
              color="orange"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          {noteId !== null && (
            <TouchableOpacity
              style={[styles.deleteButton]}
              onPress={handleDelete}
            >
              <FontAwesome5
                name="trash"
                size={isLargeText ? 25 : 20}
                color="red"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titleInput: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  contentInput: {
    flex: 1,
    fontSize: 18,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: "top",
  },
  dateContainer: {
    marginBottom: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    // marginHorizontal: 5,
    flexDirection: "row",
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    // marginHorizontal: 5,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
