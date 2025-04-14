"use client";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type SortKey = "price" | "rating" | "distance";
type SortDirection = "asc" | "desc";

const SortDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [direction, setDirection] = useState<SortDirection>("asc");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (key: SortKey) => {
    if (sortBy === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setDirection("asc");
    }
    setIsOpen(false);
  };

  const getArrowIcon = (dir: SortDirection) =>
    dir === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );

  const renderArrow = (key: SortKey) => {
    if (sortBy !== key) return null;
    return getArrowIcon(direction);
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1 text-sm text-gray-800 transition hover:bg-gray-100"
      >
        Sort by: {capitalize(sortBy)} {getArrowIcon(direction)}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-md">
          {(["price", "rating", "distance"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 capitalize hover:bg-gray-100"
            >
              {key}
              {renderArrow(key)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
