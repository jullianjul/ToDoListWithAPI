import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Modals/DarkModeContext';
import { useNavigate } from "react-router-dom";
import Mainregister from '../Logic/Mainregister';
import Mainlogin from '../Logic/Mainlogin';

const LoginAndRegister= () => {
  {/*inicio animación*/}
  const { toggleDarkMode,mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();
  const getislog = localStorage.getItem('islog')||{};
  useEffect(() => {
    console.log(getislog)
    if(getislog==='true'){
      redirectuser();
    }
    // Opcional: puedes devolver una función de limpieza (cleanup) si es necesario
    return () => {
      // Código de limpieza (se ejecuta cuando el componente se desmonta o cuando las dependencias cambian)
    };
  }, []);
  function redirectuser(){
    toggleDarkMode();
    toggleDarkMode();
    navigate('/ToDoList/aplication');
  }
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

