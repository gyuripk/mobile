import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/global";

export default function NoteListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(`${API_URL}/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            // Authorization:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiZXhwIjoxNzE2NjAyODIzLCJpYXQiOjE3MTY1MTY0MjN9.nP1VvI3_oQLutaFyqQePa9ENz3kFiRBIP6EagL9ZX5w", // 필요한 경우 토큰을 헤더에 포함
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

    fetchNotes();
  }, []);

  const globalStyles = GlobalStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.user_id.toString()}
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
      <Button
        title="Add Note"
        onPress={() => navigation.navigate("NoteScreen", { noteId: null })}
      />
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
});
