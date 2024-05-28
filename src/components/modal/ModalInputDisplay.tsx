import React from "react";
import "./ModalInputDisplay.scss";

interface InputDisplayProps {
  displayText: string;
  onClick: () => void;
}

const InputDisplay: React.FC<InputDisplayProps> = ({
  displayText,
  onClick,
}) => (
  <div className="custom-input-group mb-3">
    <div className="custom-input-display">{displayText || "운동 선택"}</div>
    <button className="btn custom-input-button" type="button" onClick={onClick}>
      <img src="./buttons/icon-arrow-right-circle.png" alt="arrow icon" />
    </button>
  </div>
);

export default InputDisplay;
