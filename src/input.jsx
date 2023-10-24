import React from 'react';
import './Input.css'


const Input = ({attributes, handleChange, param})=> {
  return (
    <>
    <label htmlFor={attributes.id}></label>
    <input
      id={attributes.id}
      name={attributes.name}
      placeholder={attributes.placeholder}
      type={attributes.type}
      onChange={ (e) => handleChange(e.target, e.target.value)}
      className={ param ? 'input-error': 'input_Style'}
      required
     />
    </>
  );
}

export default Input;

