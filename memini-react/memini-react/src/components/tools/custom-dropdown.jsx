import React, { Component } from "react";

const CustomDropdown = ({ options, value, onChange, defaultValue = '', className = '' }) => {
    return(
        <select  
        className={`ui dropdown ${className}`} 
        value={value}
        onChange={(e) => {onChange(+e.target.value)}}
        >

        {defaultValue &&  <option value="" disabled>
            {defaultValue}
        </option>}
       
        {options.map((month) => (
        <option key={+month.key} value={+month.key}>
        {month.value}
        </option>
        ))}
        </select>
    )
}

export default CustomDropdown;