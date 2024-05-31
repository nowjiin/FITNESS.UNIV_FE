import React from "react";
import "./FormRadioGroup.scss";

interface FormRadioGroupProps {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  groupName: string;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  groupName,
}) => {
  return (
    <div className="form-group gap-2 center">
      {options.map((option) => (
        <label
          key={option}
          className={`form-label p-3 ${
            selectedValue === option ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name={groupName}
            value={option}
            checked={selectedValue === option}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="form-option">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default FormRadioGroup;
