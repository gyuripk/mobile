import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLayout } from "../components/Layout";
import { format } from "date-fns";
import { GlobalStyles } from "../styles/global";
import { useTheme } from "../context/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { it } from "date-fns/locale";
import useFetchNotes from "../hooks/useFetchNotes";

export default function NoteListScreen({ route, navigation }) {
  const { notes, filteredNotes, searchQuery, setSearchQuery, fetchNotes } =
    useFetchNotes();

  const globalStyles = GlobalStyles();
  const { isDarkMode, isLargeText } = useTheme();

  useEffect(() => {
    const notesUpdated = route.params?.notesUpdated || false;

    if (notesUpdated) {
      fetchNotes();

      navigation.setOptions({ notesUpdated: false });
    }
  }, [navigation, route.params]);

  return (
    <GlobalLayout>
      <View
        style={[styles.container, isDarkMode && { backgroundColor: "#333" }]}
      >
        <View
          style={[
            styles.searchContainer,
            isDarkMode && { backgroundColor: "#555", color: "#fff" },
            isLargeText && styles.searchContainerLarge,
          ]}
        >
          <FontAwesome5
            name="search"
            size={isLargeText ? 24 : 16}
            color={isDarkMode ? "#fff" : "#888"}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchBar,
              isDarkMode && { color: "#fff" },
              isLargeText && styles.searchBarLarge,
            ]}
            placeholder="Search notes..."
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.note_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.note, isDarkMode && { backgroundColor: "#444" }]}
              onPress={() =>
                navigation.navigate("NoteScreen", {
                  noteId: item.note_id,
                  noteTitle: item.title,
                  noteContent: item.content,
                  noteCreatedAt: item.created_at,
                  noteModifiedAt: item.modified_at,
                })
              }
            >
              <View style={styles.noteHeader}>
                <Text
                  style={[globalStyles.title, isDarkMode && { color: "#fff" }]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[globalStyles.date, isDarkMode && { color: "#bbb" }]}
                >
                  {format(new Date(item.created_at), "dd MMM yyyy")}
                </Text>
              </View>
              <Text
                style={[globalStyles.time, isDarkMode && { color: "#bbb" }]}
              >
                {format(new Date(item.created_at), "HH:mm")}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            isDarkMode && { backgroundColor: "#ff9900" },
          ]}
          onPress={() => navigation.navigate("NoteScreen", { noteId: null })}
        >
          <Text style={(styles.addButtonText, globalStyles.text)}>+</Text>
        </TouchableOpacity>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    fontSize: 16,
    borderColor: "#ccc",
    marginLeft: 10,
    marginRight: 10,
  },
  searchContainerLarge: {
    padding: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
  },
  searchBarLarge: {
    fontSize: 24,
  },
  note: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "orange",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
