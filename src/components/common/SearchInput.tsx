import "./SearchInput.scss";

interface SearchInputProps {
  placeholder: string;
}

function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div className="search-input-container full-width">
      <input type="text" className="search-input" placeholder={placeholder} />
      <button className="search-button">
        <img src="./buttons/icon-search.png" alt="Search" />
      </button>
    </div>
  );
}

export default SearchInput;
