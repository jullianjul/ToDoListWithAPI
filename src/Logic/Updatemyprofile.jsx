import React, { useState } from 'react';
import './Loginandregister.css';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';

const Updatemyprofile = () => {
  const { isLoggedIn, state,dispatch } = useUser();
  const { currentUser,isVerified } = state;
  const { toggleDarkMode, mostrarFormulario } = useDarkMode();
  const navigate = useNavigate();

  // Estados para almacenar la información ingresada por el usuario
  const [password, setPassword] = useState('');

  const handleVerification = () => {
    
  };

  return (
    <>
      <div className={'ContainerModaldatapassword' + ' ContainerModaldatapassword' + darkmode}>
        <div className='Modaldatapassword'>
          <h1>Porfavor escriba su contraseña para poder modificar a sus datos de usuario</h1>
          <label>Escriba Contraseña actual: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={handleVerification}>Verificar Identidad</button>

          <h1>id: {currentUser._id}</h1>
        </div>
      </div>
    </>
  );
}

export default Updatemyprofile;
