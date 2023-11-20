import React, { useState } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import './Updateuserform.css'
import ModalUpdateinput from '../Inputs/ModalUpdateinput';
import { Update_user } from '../ServicesApi/Apifecth';

const Updateuserform = () => {
  const { isLoggedIn, state,dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser } = state;
  const { toggleDarkMode, mostrarFormulario,darkmode } = useDarkMode();
  const navigate = useNavigate();
  const [verificateinputs, SetVerificateInputs]=useState(false);
  const [name, setName]= useState(currentUser.firstName);
  const [lastname,setLastName]=useState(currentUser.lastName);
  const [password,setPassword]=useState(currentUser.password);
  const [nameerror,setNameError]=useState(false);
  const [passworderror,setPasswordErrorr]=useState(false);
  const [lastnameerror, setLastnameError]=useState(false);

  function handlemodalupdateuser(attributes, Value){
    SetVerificateInputs(true);
    if(attributes.name==='Name'){
      {Value.length>=3 ? (setName(Value), setNameError(false)):(setNameError(true))}
    }
    if(attributes.name==='Lastname'){
      {Value.length>=3 ? (setLastName(Value), setLastnameError(false)):(setLastnameError(true))}
    }
    if(attributes.name==='password'){
      {Value.length>=8 ? (setPassword(Value), setLastnameError(false)):(setLastnameError(true))}
    }
  }
  const handlesubmit= async()=>{
    if((verificateinputs==true)&&(passworderror==false)&&(nameerror==false)&&(lastnameerror==false)){
      let body={
        _id:currentUser._id,
        firstName:name,
        lastName:lastname,
        email:currentUser.email,
        password:password
      }
      try {
        dispatch({ type: 'UPDATE_USER', payload: body });
        const response= await Update_user(body);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log(response)
      } catch (error) {
        console.error('Error al actualizar el usuario', error);
      }
      setFormUpdateUser(false);
    }
  }

  return (
    <>
      <div className={'ContainerModaldatapassword' + ' ContainerModaldatapassword' + darkmode}>
        <div className='Subcontainer_Modal_Update_user'>
            <div className='Exit_modal_update_div'>
                        <button onClick={()=>setFormUpdateUser(false)}>x</button>
            </div>
            <form action="" className='Update_User_Form'>
                <div className='Subcontainer_Update_User_Form'>
                    <label htmlFor="">Nombre:</label>
                    <ModalUpdateinput attributes={{
                      className:'modalupdateuserinput',
                      defaultValue:currentUser.firstName,
                      name:'Name'
                    }} handlemodalupdateuser={handlemodalupdateuser}/>
                    <label htmlFor="">Apellido:</label>
                    <ModalUpdateinput attributes={{
                      className:'modalupdateuserinput',
                      defaultValue:currentUser.lastName,
                      name:'Lastname'
                    }} handlemodalupdateuser={handlemodalupdateuser}/>
                    <label htmlFor="">Contraseña:</label>
                    <ModalUpdateinput attributes={{
                      className:'modalupdateuserinput',
                      defaultValue:currentUser.password,
                      name:'password'
                    }} handlemodalupdateuser={handlemodalupdateuser}/>
                </div>
            </form>
            <div className='Modal_Update_buttons'>
              <button onClick={handlesubmit}>Actualizar</button>
              <button onClick={()=>setFormUpdateUser(false)}>Cancelar</button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Updateuserform;
