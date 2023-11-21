import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import Mainregister from '../Logic/Mainregister';
import Mainlogin from '../Logic/Mainlogin';
import { useUser } from '../Context/Usercontext';

const LoginAndRegister= () => {
  {/*inicio animación*/}
  const {isLoggedIn} = useUser();
  const { toggleDarkMode,mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();
  useEffect(() => {
    const redirect=()=>{
      if(isLoggedIn){
        navigate('/ToDoListWithAPI/aplication')
      }
    }
    redirect();
    console.log(isLoggedIn)
  }, [isLoggedIn]);
  return (
    <>
      {mostrarFormulario ? (
        <Mainlogin mostrarFormulario={mostrarFormulario} />
      ) : (
        <Mainregister mostrarFormulario={mostrarFormulario} />
      )}
    </>
  );
}

export default LoginAndRegister;

