import React from 'react'
import PropTypes from 'prop-types'

import './input.css';

export const Input = ({type, title, name, placeholder, value, callback, onChange}) => {
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(callback) callback();
    }

    
    return (
        <div className="input-container">
            <label>{title}</label>
            <input 
                className={!value? "input-in":"input-btn"}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onClick={handleSubmit}
                onChange={onChange}
                required
            />
        </div>
    )
}

Input.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    callback: PropTypes.func,
    onChange: PropTypes.func
}
