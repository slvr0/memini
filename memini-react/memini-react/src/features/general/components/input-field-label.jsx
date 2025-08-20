import {React,  useState} from "react";
import "../css/input-fields.css"

const InputFieldLabel = (props) => { 
    

    return (
      <>
        <div className="input-field-label ">
          {props.children}
        </div>  
      </>
    )
}

export default InputFieldLabel;