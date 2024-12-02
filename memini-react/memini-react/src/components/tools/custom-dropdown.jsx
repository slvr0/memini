import React, { Component } from "react";

const CustomDropdown = ({ options, value, onChange, defaultValue = '' }) => {
    return(
        <select  
        className="ui dropdown"  
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