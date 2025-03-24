import {createRef, React,  useState} from "react";
import "../css/input-fields.css"
import InputFieldRow from "./input-field-row";
import MeminiButton from "./memini-button";

/*
 * Send in a list of rows in this format 
{id:'firstName', type: 'input', label:'First name', placeholder:'Enter first name...'}
if you use type dropdown a options param needs to be passed as well, options are built like this
 const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ]; 
 */
const GeneralForm = (props) => {
    let dataListeners = [];

    const  collectAllData = () => {
        const formData = dataListeners.reduce((acc, listener) => {
            acc[listener.id] = listener.ref.current.value; 
            return acc;  
          }, {});  

          return formData;
    }

    return (
      <>
        <div className="generic-form-container">
            {
                props.headerText &&
                <div className="generic-form-header">{props.headerText}</div>
            }            
            {
                props.headerSubText &&
                <div className="generic-form-subheader">{props.headerSubText}</div>
            }
            
            {
                props.rows.map((row, index) => {                    
                    let listener = {id:row.id, ref: createRef()}
                    dataListeners.unshift(listener);
                    return (
                        <InputFieldRow
                            key={index}
                            fieldListener={listener}
                            id={row.id}
                            type={row.type}
                            label={row.label}
                            textPlaceholder={row.placeholder}
                            options={row.options}
                        ></InputFieldRow>
                    );
                })
            }      
            <div className="flex items-center justify-between">
                <div className="memini-form-style-icon-sm">
                    F
                </div>

                <div>
                    <MeminiButton size="small" type="info" onClick={() => props.onSubmit(collectAllData())}>
                        {props.submitButtonName ?? 'Submit'}
                    </MeminiButton>
                </div>
            </div>
        </div> 
    </>
    )
}

export default GeneralForm;


 