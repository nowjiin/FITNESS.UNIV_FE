import React from "react";
import "./ModalInputDisplay.scss";

interface InputDisplayProps {
  displayText: string;
  onClick: () => void;
  placeholder: string;
}

const InputDisplay: React.FC<InputDisplayProps> = ({
  displayText,
  onClick,
  placeholder,
}) => {
  const isSelected = displayText && displayText !== "";

  return (
    <div className="custom-input-group mb-3">
      <div
        className={`custom-input-display ${
          isSelected ? "selected" : "placeholder"
        }`}
        onClick={onClick}
      >
        {displayText || placeholder}
      </div>
      <button
        className="btn custom-input-button"
        type="button"
        onClick={onClick}
      >
        <img src="./buttons/icon-arrow-right-circle.png" alt="arrow icon" />
      </button>
    </div>
  );
};

export default InputDisplay;
