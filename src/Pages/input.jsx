import React from 'react';
import './Input.css'
import { useDarkMode } from '../Modals/DarkModeContext'

const Input = ({attributes, handleChange, param})=> {
  const { darkmode, toggleDarkMode } = useDarkMode();
  return (
    <>
    <div className='input_container'>
    <label htmlFor={attributes.id} className={darkmode?'Input_title_contentdark':'Input_title_content'}>{attributes.id}</label>
    <input
      id={attributes.id}
      name={attributes.name}
      placeholder={attributes.placeholder}
      type={attributes.type}
      onChange={ (e) => handleChange(e.target, e.target.value)}
      className={ param ? 'input-error': 'input_Style'}
      required
     />
    </div>
    </>
  );
}

export default Input;

