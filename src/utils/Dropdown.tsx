import { useState, useRef, useEffect } from "react";
import { DropdownProps } from "../Types";
import { useTheme } from "../CustomHooks/ThemeProvider";
import { DropdownIcon } from "./SvgIcons";

export const Dropdown = ({ options, defaultText, onSelect }: DropdownProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    //update state
    setSelectedOption(option);

    onSelect(option);

    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className={`flex w-full cursor-pointer items-center justify-between p-6 py-4 shadow-md ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-LightModeBg text-LightModeText"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption || defaultText}</span>
        <DropdownIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-full animate-slide-in rounded-md shadow-lg ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-LightModeBg text-LightModeText"}`}
        >
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer p-4 ${theme === "dark" ? "hover:bg-none" : "hover:bg-gray-100"}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
