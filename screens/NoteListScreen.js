import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { GlobalStyles } from "../styles/global";
import NoteScreen from "./NoteScreen"; // NoteScreen 컴포넌트를 임포트

export default function NoteListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // 로컬 임시 데이터
    const localNotes = [
      { id: 1, title: "First Note" },
      { id: 2, title: "Second Note" },
      { id: 3, title: "Third Note" },
    ];
    setNotes(localNotes);
  }, []);

  const globalStyles = GlobalStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() =>
              navigation.navigate("NoteScreen", {
                noteId: item.id,
                noteTitle: item.title,
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
