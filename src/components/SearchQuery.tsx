import { useEffect, useRef } from "react";
import { useTheme } from "../CustomHooks/ThemeProvider";
import { SearchIcon, XIcon } from "../utils/SvgIcons";

type SearchQueryProps = {
  search: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
  clearSearch: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export const SearchQuery = ({
  search,
  handleSearch,
  clearSearch,
}: SearchQueryProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative flex items-center">
      <div className="pointer-events-none absolute inset-y-0 left-12 flex items-center">
        <SearchIcon />
      </div>
      <input
        ref={inputRef}
        className={`h-16 w-full p-6 pl-20 shadow-lg outline-none lg:w-[30rem] ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-LightModeBg text-LightModeText"}`}
        placeholder="Search for a country"
        type="text"
        value={search}
        onChange={handleSearch}
      />
      <div
        onClick={clearSearch}
        className="absolute inset-y-0 right-6 flex cursor-pointer items-center"
      >
        <XIcon />
      </div>
    </div>
  );
};
