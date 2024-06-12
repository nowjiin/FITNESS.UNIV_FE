import React from "react";
import Button from "react-bootstrap/Button";
import "./SearchButton.scss";

interface SearchButtonProps {
  value: string;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ value, onClick }) => {
  return (
    <Button className="search-button" onClick={onClick}>
      {value}
      <img
        src="../buttons/icon-chevrons-down.png"
        alt="chevrons down icon"
        className="button-icon"
      />
    </Button>
  );
};

export default SearchButton;
