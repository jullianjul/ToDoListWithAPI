import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';

const Myprofile= () => {
  {/*inicio animación*/}
  const {isLoggedIn,state} = useUser();
  const { currentUser } = state;
  const { toggleDarkMode,mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();
  return (
    <>
     {isLoggedIn ? (
        ''
     )

     :
     ('')}
    </>
  );
}

export default Myprofile;