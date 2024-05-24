import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/global";

export default function NoteListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  const API_URL = "http://localhost:3000"; // 서버의 API URL

  const fetchNotes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText || "Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
    const focusListener = navigation.addListener("focus", fetchNotes);
    return () => {
      focusListener();
    };
  }, [navigation]);

  const globalStyles = GlobalStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.note_id.toString()} // 고유한 키로 'note_id' 사용
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() =>
              navigation.navigate("NoteScreen", {
                noteId: item.note_id,
                noteTitle: item.title,
                noteContent: item.content, // noteContent 추가 전달
              })
            }
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NoteScreen", { noteId: null })}
      >
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  note: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noteTitle: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
