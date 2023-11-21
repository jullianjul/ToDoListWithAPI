import React, { useState,useEffect } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import Updatemyprofileverification from '../Modals/Updatemyprofileverification';
import './Myprofilelogic.css'
import { FaInfoCircle } from "react-icons/fa";

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
    navigate('/ToDoListWithAPI/loginandregister')
  }
  // Estados para almacenar la información ingresada por el usuario

  return (
    <>
      {formupdateuser && <Updatemyprofileverification/>}
      <div className={'myprofilecontainerALL' + ' myprofilecontainerALL' + darkmode}>
        <div className={'tabladatauser'+' tabladatauser'+darkmode}>
          <h1 className='user_info'>nombre: {currentUser.firstName}</h1>
          <h1 className='user_info'>apellido: {currentUser.lastName}</h1>
          
          {/* Mostrar contraseña solo si la verificación es exitosa */}
          <h1 className='user_info'>email: {currentUser.email}</h1>
          {isVerified ? <h1 className='user_info'>contraseña: {currentUser.password}</h1>: <h1 className='user_info'> contraseña: #########</h1>}
          <h1 className='user_info'>id: {currentUser._id}</h1>
          <h1 className='user_info'><FaInfoCircle/>(si quieres ver tu contraseña, verifica que eres tú apretando el boton 'actualizar usuario')</h1>
          <div className='updateuserlogic-buttons'>
          <button onClick={() => setFormUpdateUser(true)} className={'updateuserlogic-btn btn_update_actu'+' btn_update_actu'+darkmode}>actualizar usuario</button>
          <button onClick={clearlocalstorage} className={'updateuserlogic-btn btn_update_logout'+' btn_update_logout'+darkmode}>cerrar sesión</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myprofilelogic;
