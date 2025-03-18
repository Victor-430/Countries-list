import { useState, useRef, useEffect } from "react";
import { DropdownProps } from "../Types";

export const Dropdown = ({ options, defaultText, onSelect }: DropdownProps) => {
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
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className="flex w-full cursor-pointer items-center justify-between bg-white p-6 py-4 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption || defaultText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          {isOpen ? <path d="m18 15-6-6-6 6" /> : <path d="m6 9 6 6 6-6" />}
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer p-4 hover:bg-gray-100"
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
