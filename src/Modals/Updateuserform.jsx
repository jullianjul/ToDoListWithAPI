import React, { useState } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import './Updateuserform.css'
import ModalUpdateinput from '../Inputs/ModalUpdateinput';
import { Update_user } from '../ServicesApi/Apifecth';
import { TiDeleteOutline } from "react-icons/ti";

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
  const [formerror, setFormError]=useState(false);

  function handlemodalupdateuser(attributes, Value){
    SetVerificateInputs(true);
    setFormError(false);
    if(attributes.name==='Name'){
      {(Value.length>=3 && Value.length<=25) ? (setName(Value), setNameError(false)):(setNameError(true))}
    }
    if(attributes.name==='Lastname'){
      {(Value.length>=3 && Value.length<=25) ? (setLastName(Value), setLastnameError(false)):(setLastnameError(true))}
    }
    if(attributes.name==='password'){
      {(Value.length>=8 && Value.length<=25) ? (setPassword(Value), setPasswordErrorr(false)):(setPasswordErrorr(true))}
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
    }else{
      setFormError(true);
    }
  }

  return (
    <>
      <div className={'ContainerModaldatapassword' + ' ContainerModaldatapassword' + darkmode}>
        <div className={'Subcontainer_Modal_Update_user'+' Subcontainer_Modal_Update_user'+darkmode}>
            <div className='Exit_modal_update_div'>
               <p className={'Close_Update_modal'+' Close_Update_modal'+darkmode} onClick={()=>setFormUpdateUser(false)}><TiDeleteOutline/></p>
            </div>
            <form action="" id='FormUpdateuser' className={'Update_User_Form'+' Update_User_Form'+darkmode}>
                <div className={'Subcontainer_Update_User_Form'+' Subcontainer_Update_User_Form'+darkmode}>
                  <p className={'Info_modal_update'+' Info_modal_update'+darkmode}>Cambie los datos que deseé cambiar:</p>
                  {formerror && <p className='alert_formerror'>Porfavor, no deje ningun campo en rojo</p>}
                  <div className='label-inputs-updateuser'>
                    <ModalUpdateinput attributes={{
                        title:'Nombre:',
                        className:`modalupdateuserinput modalupdateuserinput${darkmode} name${nameerror}`,
                        defaultValue:currentUser.firstName,
                        name:'Name'
                      }} handlemodalupdateuser={handlemodalupdateuser}/>
                      <ModalUpdateinput attributes={{
                        title:'Apellido:',
                        className:`modalupdateuserinput modalupdateuserinput${darkmode} lastname${lastnameerror}`,
                        defaultValue:currentUser.lastName,
                        name:'Lastname'
                      }} handlemodalupdateuser={handlemodalupdateuser}/>
                      <ModalUpdateinput attributes={{
                        title:'Contraseña:',
                        className:`modalupdateuserinput modalupdateuserinput${darkmode} password${passworderror}`,
                        defaultValue:currentUser.password,
                        name:'password'
                      }} handlemodalupdateuser={handlemodalupdateuser}/>
                  </div>
                </div>
            </form>
            <div className='Modal_Update_buttons'>
              <button onClick={handlesubmit} className={'Updateuser_form_btn'+' Updateuser_form_btn'+darkmode}>Actualizar</button>
              <button onClick={()=>setFormUpdateUser(false)} className={'Updateuser_form_btn-cancel'+' Updateuser_form_btn-cancel'+darkmode}>Cancelar</button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Updateuserform;
