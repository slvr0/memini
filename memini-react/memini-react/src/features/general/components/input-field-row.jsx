import {React,  useState} from "react";
import "../css/input-fields.css"
import InputFieldText from "./input-field-text";
import InputFieldLabel from "./input-field-label";
import InputFieldDropdown from "./input-field-dropdown";
import DiscreteTimeSlider from "./discrete-time-slider";

const InputFieldRow = (props) => { 
    const textPlaceholder = props.textPlaceholder ?? ''; 
    //const inputValue = props.inputValue; 
    const rowType = props.type ?? 'input'
    return (
      <>  
        <div className="grid grid-cols-4">
          <div className="col-span-1 flex items-center">
              <InputFieldLabel>{props.label}</InputFieldLabel>
          </div>

          <div className="col-span-3" id={props.id}>   
            {rowType === 'dropdown' ? (
            <InputFieldDropdown fieldListener={props.fieldListener} placeholder={textPlaceholder} options={props.options} />
            ) : rowType === 'input' ? (
            <InputFieldText fieldListener={props.fieldListener} placeholder={textPlaceholder} />
            ) : rowType === 'discrete-time-slider' ? (
              <DiscreteTimeSlider fieldListener={props.fieldListener} placeholder={textPlaceholder} />
            ) : null}            
          </div>
        </div>         
      </>
    )
}

export default InputFieldRow;