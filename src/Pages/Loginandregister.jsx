import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import Mainregister from '../Logic/Mainregister';
import Mainlogin from '../Logic/Mainlogin';
import { useUser } from '../Context/Usercontext';

const LoginAndRegister= () => {
  {/*inicio animación*/}
  const {isLoggedIn} = useUser();//contexto
  const { toggleDarkMode,mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoggedIn==='true'){
      navigate('/ToDoList/aplication');
    }
    // Opcional: puedes devolver una función de limpieza (cleanup) si es necesario
    return () => {
      // Código de limpieza (se ejecuta cuando el componente se desmonta o cuando las dependencias cambian)
    };
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

