import { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeContextType } from "../Types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//checks if theme exists in local storage
const getSavedTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return (savedTheme as Theme) ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getSavedTheme());

  useEffect(() => {
    const root = window.document.documentElement;

    //remove old classes
    root.classList.remove("light", "dark");

    //Add new theme class
    root.classList.add(theme);

    // Apply background color based on theme
    if (theme === "dark") {
      document.body.style.backgroundColor = "hsl(207, 26%, 17%)"; // DarkModeBg
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "hsl(0, 0%, 98%)"; //LightModeBg
      document.body.style.color = "hsl(200, 15%, 8%)"; //LightModeText
    }

    //save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be within ThemeContext Provider");
  }
  return context;
};
