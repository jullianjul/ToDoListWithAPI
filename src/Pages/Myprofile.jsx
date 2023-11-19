import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import Alertnotlog from './Alertnotlog';
import Myprofilelogic from '../Logic/Myprofilelogic';

const Myprofile= () => {
  {/*inicio animación*/}
  const {isLoggedIn,state} = useUser();
  const { currentUser } = state;
  const { toggleDarkMode,mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();
  return (
    <>
     {isLoggedIn ? (
        <Myprofilelogic/>
     )
     :
     (<Alertnotlog/>)}
    </>
  );
}

export default Myprofile;