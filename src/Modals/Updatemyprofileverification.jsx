import React, { useState,useEffect } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import './Updatemyprofileverification.css'
import Updateuserform from './Updateuserform';
import { TiDeleteOutline } from "react-icons/ti";

const Updatemyprofileverification = () => {
  const { isLoggedIn, state,dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser,isVerified } = state;
  const { toggleDarkMode, mostrarFormulario,darkmode } = useDarkMode();
  const navigate = useNavigate();
  // Estados para almacenar la información ingresada por el usuario
  const [password, setPassword] = useState('');
  const[passworderror, setPaswordError]=useState(false);
  const handlepassworderror=(Value)=>{
    setPaswordError(false);
    setPassword(Value);
  }

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
              <div className={'Modaldatapassword'+' Modaldatapassword'+darkmode}>
                <div className='Exit_modal_update_div'>
                  <p className={'Close_Update_modal'+' Close_Update_modal'+darkmode} onClick={()=>setFormUpdateUser(false)}><TiDeleteOutline/></p>
                </div>
                <div className={'Subcontainer_modaldatapassword'+' Subcontainer_modaldatapassword'+darkmode}>
                  <div className={'Modaldatapassword_subsubcontainer'+' Modaldatapassword_subsubcontainer'+darkmode}>
                      <h3 className='Modaldatapassword_title'>Porfavor escriba su contraseña para poder modificar a sus datos de usuario</h3>
                      <label className={'ModalUpdateuser_labelpassword'+' ModalUpdateuser_labelpassword'+darkmode}>Escriba su contraseña actual: </label>
                      <input type="password" className={'verificate_pasword_input'+' verificate_pasword_input'+darkmode} value={password} onChange={(e) => handlepassworderror(e.target.value)} />
                      {passworderror &&  
                        <div className='Modaldatapassword_error'>
                            <p className='Modaldatapassword_error_information'>Las contraseñas no coinciden</p>
                            <div className='close-modal-alert' onClick={()=>setPaswordError(false)}><TiDeleteOutline/></div>
                        </div>
                      }
                  </div>
                  <button onClick={handleVerification} className={'Modaldatapassword-btn'+' Modaldatapassword-btn'+darkmode}>Verificar Identidad</button>
                </div>
              </div>
            </div>
          
      )}
    </>
  );
}

export default Updatemyprofileverification;
