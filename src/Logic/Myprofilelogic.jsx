import React, { useState,useEffect } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import Updatemyprofileverification from '../Modals/Updatemyprofileverification';

const Myprofilelogic = () => {
  const { isLoggedIn, state, dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser,isVerified } = state;
  const { toggleDarkMode, mostrarFormulario,darkmode } = useDarkMode();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: 'VERIFY_USER', payload:false})
  }, []);

  const clearlocalstorage=()=>{
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', false)
    dispatch({type:'LOGOUT'})
    navigate('/ToDoList/loginandregister')
  }
  // Estados para almacenar la información ingresada por el usuario

  return (
    <>
      {formupdateuser && <Updatemyprofileverification/>}
      <div className={'myprofilecontainerALL' + ' myprofilecontainerALL' + darkmode}>
        <div className='tabladatauser'>
          <h1>nombre: {currentUser.firstName}</h1>
          <h1>apellido: {currentUser.lastName}</h1>
          
          {/* Mostrar contraseña solo si la verificación es exitosa */}
          <h1>email: {currentUser.email}</h1>
          {isVerified ? <h1>contraseña: {currentUser.password}</h1>: <h1> contraseña: #########</h1>}
          <h1>id: {currentUser._id}</h1>
          <button onClick={() => setFormUpdateUser(true)}>actualizar usuario</button>
          <button onClick={clearlocalstorage}>cerrar sesión</button>
        </div>
      </div>
    </>
  );
}

export default Myprofilelogic;
