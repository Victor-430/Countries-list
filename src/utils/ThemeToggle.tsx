import { useTheme } from "../CustomHooks/ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-col-1 flex items-center space-x-2">
      <button
        onClick={toggleTheme}
        className="transition-all duration-300 hover:scale-110 hover:transform"
        aria-label="Toogle Dark Mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
      <h2
        className={`text-lg font-semibold ${theme === "dark" ? "text-white" : ""}`}
      >
        Dark Mode
      </h2>
    </div>
  );
};
