import {React,  useState} from "react";
import "../css/input-fields.css"

const InputFieldText = (props) => { 
    const placeholder = props.placeholder ?? '';  
    return (
      <>  
         <input
            ref={props.fieldListener.ref}
            type="text"
            placeholder={placeholder}
            className="input-field-text"
            value={props.value}
          />
      </>
    )
}

export default InputFieldText;