import React from "react";
import "./GrayButton.scss";

interface ButtonProps {
  value: string;
  onClick?: () => void;
}

const GrayButton: React.FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <button className="gray-button" onClick={onClick}>
      {value}
    </button>
  );
};

export default GrayButton;
