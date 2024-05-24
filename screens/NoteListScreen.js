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
import { GlobalLayout } from "../components/Layout";
import { format } from "date-fns"; // date-fns 라이브러리로 날짜 형식화

export default function NoteListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  const globalStyles = GlobalStyles();

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

  //   const globalStyles = GlobalStyles();

  return (
    <GlobalLayout>
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
              <Text style={[styles.noteTitle, globalStyles.text]}>
                {item.title}
              </Text>
              <Text style={[styles.noteDate, globalStyles.text]}>
                {format(new Date(item.created_at), "yyyy-MM-dd")}
              </Text>
              <Text style={[styles.noteTime, globalStyles.text]}>
                {format(new Date(item.created_at), "HH:mm")}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate("NoteScreen", { noteId: null })}
        >
          <Text style={[globalStyles.buttonText, globalStyles.text]}>
            Add Note
          </Text>
        </TouchableOpacity>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: ,
    backgroundColor: "#fff",
  },
  note: {
    // padding: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noteTitle: {
    fontSize: 18,
  },
  noteDate: {
    fontSize: 12,
    color: "#888",
  },
});
