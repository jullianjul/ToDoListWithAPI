import React from 'react'

export const Register = ({attributes, handleChangeregister, props}) => {
  return (
    <>
    <label htmlFor={attributes.id}></label>
    <input
    id={attributes.id}
    name={attributes.name}
    placeholder={attributes.placeholder}
    type={attributes.type}
    onChange={ (e) => handleChangeregister(e.target, e.target.value)}
    className={attributes.Check}
   />
    </>
  )
}
