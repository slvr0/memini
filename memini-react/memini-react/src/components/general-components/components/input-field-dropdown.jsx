import { React, useState } from "react";
import "../css/input-fields.css";

const InputFieldDropdown = (props) => {
  const { placeholder, options = [], value, onChange } = props;  // Ensure options are passed
  const placeholderText = placeholder ?? "Select an option";

  
  return (
    <div className="input-field-dropdown">
      <select
        ref={props.fieldListener.ref}
        className="input-field-text"
        value={value}        
        aria-placeholder={placeholderText}
      >
        <option value="" disabled>{placeholderText}</option> {/* Placeholder */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputFieldDropdown;
