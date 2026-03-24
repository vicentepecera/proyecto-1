import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function SearchBar({
  texto = "Buscar...",
  width = "100%",
  height = "50px",
  onSearch,
  disabled = false
}) {
  const [searchText, setSearchText] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !disabled) {
      onSearch(searchText);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className={`
          relative
          flex items-center
          rounded-lg
          border border-gray-700
          bg-gray-800
          focus-within:ring-1 focus-within:ring-blue-400
          transition
          transform
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:bg-gray-700"}
        `}
        style={{ width, height }}
      >

        {/* Icono */}
        <div className="absolute left-3 text-gray-400">
          <FaSearch />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder={texto}
          value={searchText}
          disabled={disabled}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="
            w-full
            h-full
            pl-10
            pr-4
            rounded-lg
            bg-transparent
            text-white
            placeholder-gray-400
            focus:outline-none
          "
        />
      </div>
    </div>
  );
}