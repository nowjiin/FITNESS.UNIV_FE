import React, { useState } from "react";
import "./SearchInput.scss";

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

function SearchInput({ placeholder, onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="search-input-container full-width">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <button className="search-button">
        <img src="./buttons/icon-search.png" alt="Search" />
      </button>
    </div>
  );
}

export default SearchInput;
