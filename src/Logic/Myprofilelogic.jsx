import React, { useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import Updatemyprofile from './Updatemyprofile';

const Myprofile = () => {
  const { isLoggedIn, state, dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser,isVerified } = state;
  const { toggleDarkMode, mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();

  // Estados para almacenar la información ingresada por el usuario

  return (
    <>
      {formupdateuser && <Updatemyprofile/>}
      <div className={'myprofilecontainerALL' + ' myprofilecontainerALL' + darkmode}>
        <div className='tabladatauser'>
          <h1>nombre: {currentUser.firstName}</h1>
          <h1>apellido: {currentUser.lastName}</h1>
          
          {/* Mostrar contraseña solo si la verificación es exitosa */}
          {isVerified ? <h1>contraseña: {currentUser.password}</h1>: <h1>#########</h1>}
          <h1>id: {currentUser._id}</h1>
          {isVerified==false &&  
             <>
                <h1>para acceder a sus datos usted debe de autenticarse</h1>
                <button>autenticarse</button>
             </>
          }
        </div>
      </div>
    </>
  );
}

export default Myprofile;
