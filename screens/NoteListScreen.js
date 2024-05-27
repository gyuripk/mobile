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
import { useTheme } from "../context/theme"; // 추가된 부분
import { FontAwesome5 } from "@expo/vector-icons"; // 아이콘 추가
import { it } from "date-fns/locale";

export default function NoteListScreen({ route, navigation }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); // 추가된 부분
  const [searchQuery, setSearchQuery] = useState(""); // 추가된 부분

  const API_URL = "http://localhost:3000";
  const globalStyles = GlobalStyles();
  const { isDarkMode, isLargeText } = useTheme(); // 추가된 부분

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
      setFilteredNotes(data); // 필터링된 노트도 설정
    } catch (error) {
      console.error("Error fetching notes:", error);
      Alert.alert("Error", error.message);
    }
  };

  // 컴포넌트가 마운트될 때 노트 목록을 가져옴
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    // fetchNotes();
    // notesUpdated 파라미터의 값 가져오기
    const notesUpdated = route.params?.notesUpdated || false;

    if (notesUpdated) {
      fetchNotes();

      // notesUpdated 파라미터를 다시 false로 설정
      navigation.setOptions({ notesUpdated: false });
    }
    // const focusListener = navigation.addListener("focus", fetchNotes);
    // return () => {
    //   navigation.removeListener("focus", fetchNotes);
    // };
  }, [navigation, route.params]);

  // 검색 기능 searchQuery가 변경될 때마다 필터링된 노트를 업데이트
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, notes]);

  return (
    <GlobalLayout>
      <View
        style={[
          styles.container,
          isDarkMode && { backgroundColor: "#333" }, // 다크 모드 스타일 적용
        ]}
      >
        {/* 검색 바 추가된 부분 */}
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
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"} // 다크 모드에 맞게 placeholder 색상 변경
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredNotes} // 수정된 부분: notes -> filteredNotes
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
          showsVerticalScrollIndicator={false} // 스크롤 바 숨김
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
    // padding: 10,
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
    // borderWidth: 1,
    // borderColor: "#ccc", // 기본 테두리 색상
    borderRadius: 10,
  },
  searchBarLarge: {
    fontSize: 24,
  },
  note: {
    // backgroundColor: "#fff",
    // padding: 20,
    // borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // elevation: 4,
    // marginBottom: 20,

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

    // backgroundColor: "#fff",
    // padding: 20,
    // borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 10 }, // 오프셋 변경
    // shadowOpacity: 0.25, // 그림자 불투명도 증가
    // shadowRadius: 20, // 그림자 반경 증가
    // elevation: 10, // 그림자 깊이 증가
    // marginBottom: 20,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  addButton: {
    position: "absolute", // 버튼을 화면의 오른쪽 아래에 고정
    right: 20, // 오른쪽에서 20 유닛 떨어진 위치
    bottom: 20, // 하단에서 20 유닛 떨어진 위치
    backgroundColor: "orange", // 색상 유지
    width: 60, // 버튼의 너비
    height: 60, // 버튼의 높이
    borderRadius: 30, // 원형 버튼 만들기 (너비와 높이의 반)
    alignItems: "center",
    justifyContent: "center",
    elevation: 8, // 그림자 효과를 위한 엘리베이션 추가 (안드로이드)
    shadowColor: "#000", // 그림자 색
    shadowOffset: { width: 0, height: 4 }, // 그림자 위치
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 4.65, // 그림자 블러 반경
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
