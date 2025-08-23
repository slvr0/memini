
import "../css/input-fields.css";

const InputFieldDropdown = (props: any) => {
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
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputFieldDropdown;
