import React, { useState } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';

const ModalUpdateinput = ({attributes, handlemodalupdateuser}) => {
  const {darkmode}=useDarkMode();
  return (
    <>
     <label htmlFor="FormUpdateuser" className={'title_input_updateuser'+' title_input_updateuser'+darkmode}>{attributes.title}</label>
     <input type="text" className={attributes.className} name={attributes.name}  defaultValue={attributes.defaultValue} onChange={(e) => handlemodalupdateuser(e.target, e.target.value)}/>
    </>
  );
}

export default ModalUpdateinput;
