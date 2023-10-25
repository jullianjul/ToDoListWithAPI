import React from 'react'
import './Register.css'
import { useDarkMode } from '../Modals/DarkModeContext'

export const Register = ({attributes, handleChangeregister, props}) => {
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
    onChange={ (e) => handleChangeregister(e.target, e.target.value)}
    className={attributes.Check}
   />
    </div>
    </>
  )
}
