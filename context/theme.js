import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

// custom hook
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("isLargeText");
        const parsedTheme = storedTheme ? JSON.parse(storedTheme) : false;
        setIsLargeText(parsedTheme);

        const storedDarkMode = await AsyncStorage.getItem("isDarkMode");
        const parsedDarkMode = storedDarkMode
          ? JSON.parse(storedDarkMode)
          : false;
        setIsDarkMode(parsedDarkMode);
      } catch (err) {
        console.error("Error loading theme: ", err);
      }
    };
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{ isLargeText, setIsLargeText, isDarkMode, setIsDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
