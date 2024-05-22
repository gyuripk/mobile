import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const ThemeContext = createContext();

//custom hook -> 이방식으로 다른 파일에서 theme 사용하는 것 추천함
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false); //default is small text

  useEffect(() => {
    //load theme from asyncstorage
    const getTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("isLargeText"); //load theme from storage
        const parsedTheme = storedTheme ? JSON.parse(storedTheme) : false; //null =  falsy value, string = truthy value
        setIsLargeText(parsedTheme);
      } catch (err) {
        console.error("Error loading theme: ", err); //not like this(consle error) -> user readable error message needed in assignment
      }
    };
    getTheme(); //cal getTheme function
  }, []); //only run this once

  return (
    <ThemeContext.Provider value={{ isLargeText, setIsLargeText }}>
      {/* exported value -> can access this values even in another file */}
      {children}
    </ThemeContext.Provider>
  );
}
