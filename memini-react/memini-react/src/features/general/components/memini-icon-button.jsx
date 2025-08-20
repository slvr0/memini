import {React,  useState} from "react";
import "../css/memini-icon-button.css"

const MeminiIconButton = (props) => { 
    const iconType = props.iconType;
    const iconColor = props.iconColor;
    const iconText = props.iconText;
    const onClick = props.onClick;
    const invertedCss = props.inverted  ? 'memini-icon-button-inverted-color' : 'memini-icon-button-normal-color';
    return (
      <>  
     
        <button className={`memini-icon-button memini-icon-button-hover-effect`} onClick={onClick}>
          <span className={`material-icons icon ${iconColor} ${invertedCss}`}>{iconType}</span>
          <span className={`memini-icon-label ${invertedCss}`}>{iconText}</span>
        </button>


      </>
    )
}

export default MeminiIconButton;