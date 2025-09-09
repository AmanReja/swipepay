import { createContext, useState } from "react";
export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme,setTheme] = useState("");
  return (
    <themeContext.Provider value={{ theme,setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

