import "../css/input-fields.css"

const InputFieldLabel = (props: any) => { 
    return (
      <>
        <div className="input-field-label ">
          {props.children}
        </div>  
      </>
    )
}

export default InputFieldLabel;