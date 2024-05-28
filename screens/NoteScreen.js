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
import useSaveNote from "../hooks/useSaveNote";
import useDeleteNote from "../hooks/useDeleteNote";

export default function NoteScreen({ route, navigation }) {
  const { noteId, noteTitle, noteContent, noteCreatedAt, noteModifiedAt } =
    route.params || {};
  const [title, setTitle] = useState(noteTitle || "");
  const [content, setContent] = useState(noteContent || "");
  const { isDarkMode, isLargeText } = useTheme();
  const { saveNote, isLoading: isSaving, error: saveError } = useSaveNote();
  const {
    deleteNote,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteNote();
  const globalStyles = GlobalStyles();

  useEffect(() => {
    if (noteId !== null) {
      setTitle(noteTitle || "");
      setContent(noteContent || "");
    }
  }, [noteId]);

  const handleSave = () => {
    const note = { title, content };
    if (noteId) {
      note.id = noteId;
    }
    saveNote(note, noteId, navigation);
  };

  const handleDelete = () => {
    deleteNote(noteId, navigation);
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
          <TouchableOpacity
            style={[styles.saveButton]}
            onPress={handleSave}
            disabled={isSaving}
          >
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
              disabled={isDeleting}
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
