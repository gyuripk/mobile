import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLayout } from "../components/Layout";
import { format } from "date-fns";
import { GlobalStyles } from "../styles/global";

export default function NoteListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  const API_URL = "http://localhost:3000";
  const globalStyles = GlobalStyles();

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
      navigation.removeListener("focus", fetchNotes);
    };
  }, [navigation]);

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.note_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.note}
              onPress={() =>
                navigation.navigate("NoteScreen", {
                  noteId: item.note_id,
                  noteTitle: item.title,
                  noteContent: item.content,
                })
              }
            >
              <View style={styles.noteHeader}>
                <Text style={globalStyles.title}>{item.title}</Text>
                <Text style={globalStyles.date}>
                  {format(new Date(item.created_at), "dd MMM yyyy")}
                </Text>
              </View>
              <Text style={globalStyles.time}>
                {format(new Date(item.created_at), "HH:mm")}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
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
    backgroundColor: "#e6e6e6", //스크린 컨테이너 배경색
    padding: 10,
  },
  note: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
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
    fontSize: 24, // 폰트 크기 증가
    fontWeight: "bold", // 텍스트 굵게
  },
  //   addButton: {
  //     // backgroundColor: "orange",
  //     // padding: 16,
  //     // borderRadius: 8,
  //     // alignItems: "center",
  //     // marginTop: 16,
  //     // addButton: {
  //     backgroundColor: "orange", // 색상 유지
  //     paddingVertical: 10, // 세로 패딩 조절
  //     paddingHorizontal: 20, // 가로 패딩 추가
  //     borderRadius: 20, // 더 둥근 모서리
  //     alignItems: "center",
  //     justifyContent: "center", // 텍스트를 버튼 중앙에 위치
  //     elevation: 3, // 그림자 효과를 위한 엘리베이션 추가
  //     shadowColor: "#000", // 그림자 색
  //     shadowOffset: { width: 0, height: 2 }, // 그림자 위치
  //     shadowOpacity: 0.25, // 그림자 투명도
  //     shadowRadius: 3.84, // 그림자 블러 반경
  //     marginTop: 16,
  //   },
  //   addButtonText: {
  //     color: "#fff",
  //     fontSize: 18,
  //     fontWeight: "bold", // 텍스트 굵게
  //   },
});
