import React, { useState,useEffect } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import './Updatemyprofileverification.css'
import Updateuserform from './Updateuserform';

const Updatemyprofileverification = () => {
  const { isLoggedIn, state,dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser,isVerified } = state;
  const { toggleDarkMode, mostrarFormulario,darkmode } = useDarkMode();
  const navigate = useNavigate();
  // Estados para almacenar la información ingresada por el usuario
  const [password, setPassword] = useState('');
  const[passworderror, setPaswordError]=useState(false);

  const handleVerification = () => {
    if(password===currentUser.password){
      {isVerified ? (null) : ( dispatch({ type: 'VERIFY_USER', payload:true}))}
    }else{
      setPaswordError(true);
    }
  };

  return (
    <>
           {isVerified ? (<Updateuserform/>):(
              <div className={'ContainerModaldatapassword' + ' ContainerModaldatapassword' + darkmode}>
              <div className='Modaldatapassword'>
                <div className='Exit_modal_update_div'>
                  <button onClick={()=>setFormUpdateUser(false)}>x</button>
                </div>
                <div className='Modaldatapassword_subcontainer'>
                    <h3>Porfavor escriba su contraseña para poder modificar a sus datos de usuario</h3>
                    {passworderror &&  
                       <div className='Modaldatapassword_error'>
                          <p className='Modaldatapassword_error_information'>Las contraseñas no coinciden</p>
                          <button onClick={()=>setPaswordError(false)}>X</button>
                       </div>
                    }
                    <label>Escriba Contraseña actual: </label>
                    <input type="password" className='verificate_pasword_input' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleVerification}>Verificar Identidad</button>
              </div>
            </div>
          
      )}
    </>
  );
}

export default Updatemyprofileverification;
