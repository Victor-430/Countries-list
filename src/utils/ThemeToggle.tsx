import { useTheme } from "../CustomHooks/ThemeProvider";
import { MoonIcon } from "./SvgIcons";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-col-1 flex items-center space-x-2">
      <button
        onClick={toggleTheme}
        className="transition-all duration-300 hover:scale-110 hover:transform"
        aria-label="Toogle Dark Mode"
      >
        <MoonIcon theme={theme} />
      </button>
      <h2
        className={`text-lg font-semibold ${theme === "dark" ? "text-white" : ""}`}
      >
        Dark Mode
      </h2>
    </div>
  );
};
