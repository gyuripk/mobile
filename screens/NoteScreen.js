import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function NoteScreen({ route, navigation }) {
  const { noteId, noteTitle } = route.params || {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noteId !== null) {
      // 로컬 임시 데이터 (노트 내용)
      setTitle(noteTitle || "");
      setContent("This is the content of the note.");
    }
  }, [noteId]);

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
