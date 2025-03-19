import { useEffect, useRef } from "react";
import { useTheme } from "../CustomHooks/ThemeProvider";

type SearchQueryProps = {
  search: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export const SearchQuery = ({ search, handleSearch }: SearchQueryProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-12 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <input
        ref={inputRef}
        className={`h-16 w-full p-6 pl-20 shadow-lg ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-LightModeBg text-LightModeText"}`}
        placeholder="Search for a country"
        type="text"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};
