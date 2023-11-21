import React, { useEffect, useState } from 'react';
import { Register } from '../licomponents/Register';
import Modal from '../Modals/Modal';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import './Mainregister.css';
import { useUser } from '../Context/Usercontext';
import { Create_user } from '../ServicesApi/Apifecth';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Mainregister= () => {
  {/*inicio animación*/}
  const { darkmode, toggleDarkMode, mostrarFormulario, toggleFormulario } = useDarkMode();
  const navigate = useNavigate();
  const {continueloguin} = useUser();
  
  
  {/*Fin animación*/}

  {/*funciones register*/}
  
  const [EmailR, setEmailr]= useState('');
  const [passwordR, setPasswordr]= useState('');
  const [NameR, setNamer]= useState('');
  const [username, setUserName]= useState('');
  const [passwordErrorR, setPasswordErrorr]= useState(false);
  const [EmailError, setEmailError]= useState(false);
  const [hasErrorR, setHasErrorr]= useState(false);
  const [UserError, setUserError]= useState(false);
  const [Emailalreadyregister, setEmailAlreadyRegister]= useState(false);
  const [nameerror, setNameError]= useState(false)
  const [registersuccess, setRegisterSuccess]= useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Nuevo estado para controlar la visibilidad de la contraseña


  function handleChangeregister(attributes,Value){
    setRegisterSuccess(false);
    setEmailAlreadyRegister(false);
    if(attributes.name==='Nameuser'){

      if(Value.length<=2){
        
        setNameError(true);
      }else{
        setNamer(Value)
        setNameError(false);
        console.log(NameR)
      }
    }
    if (attributes.name === 'Emailr') {
      setEmailr(Value);
      if(Value.includes(' ')){
        setEmailError(true);
      }else{
      if (Value.includes('@')) {
        // Verifica si el email contiene el símbolo "@"
        if (Value.length < 5) {
          // Verifica si el email tiene una longitud mínima (5 caracteres en este ejemplo)
          setEmailError(true);
          console.log('El email debe ser más largo');
        } else {
          // El email contiene "@" y tiene longitud suficiente
          setEmailError(false);
          console.log('El email es válido');
        }
      } else {
        // El email no contiene el símbolo "@"
        setEmailError(true);
        console.log('El email no es válido');
      }}
    }

    if(attributes.name==='Usernamer'){
      //comprueba si el user tiene mas de 6 caracteres
      setUserName(Value);
      setHasErrorr(false);
      if(Value.length<3){
        setUserError(true);
      }else{
        if(Value.length>=20){
          setUserError(true)
        }else{
          setUserError(false);
        }
      }
    }
    if(attributes.name==='Passworduser'){
      setHasErrorr(false)
      if(Value.length<8){
        setPasswordErrorr(true);
      }else{
        setPasswordr(Value)
        setPasswordErrorr(false);

      }
    }
  }
  //register api:
  const [Requireddataincorrect, setRequiredDataIncorrect]= useState(false);
  //register
  const handleRegister = async(user) => {
    // Crear un objeto con los datos del registro
    // Realizar una solicitud a la API para registrar al usuario
    try {
      const response = await Create_user(user);
      if ('error' in response) {
        // Si hay un error en la respuesta de la API, no actualices currentUser
        console.error('Error en la solicitud:', response.error);
        if(response.error==='Entered email already exists'){
          setEmailAlreadyRegister(true);
        }else{
          window.alert('Lo sentimos, sucedió un error inesperado')
        }
        //no hay un if que detecte el error de la solicitud
      } else {
        // Si la respuesta es exitosa, actualiza el estado de currentUser
        setRegisterSuccess(true);
      }
    } catch (error) {
      console.error('Error en continueloguin:', error);
      // Manejar el error, si es necesario
    }
  };
  //register supervisor:
  const [registerblank,setRegisterBlank]=useState(false)
  function handleSubmitregister(){
    if(EmailR===''||passwordR===''||username===''||NameR===''){
      console.log('papi sea serio')
      console.log(EmailR, passwordR, username, NameR)
      setRegisterBlank(true)
      return;
    }
    if(((EmailR!=='')||(passwordR!=='')||(username!=='')||(NameR!==''))){
      if((EmailError===true) || (passwordErrorR===true) || (UserError===true) ||(nameerror===true)){
        console.log('papi, llene bien los campos')
        setHasErrorr(true)
      }else{
        let usertotalinfo={ 
          firstName:NameR,
          lastName:username,
          email:EmailR,
          password:passwordR,
        }
        console.log('user:', usertotalinfo)
        handleRegister(usertotalinfo);
      }
    }else{
      console.log('XD dejaba los campos vacios')
      setHasErrorr(true)
    }
  }
  {/*end functions supervisor register*/}

  {/* register error functions*/}
  const handleContinueeu = () => {
    setEmailAlreadyRegister(false);
    setRegisterBlank(false);
    setRequiredDataIncorrect(false);
    setHasErrorr(false);
  }

  const handleModalCloseeu = () => {
    setEmailAlreadyRegister(false);
    setRegisterBlank(false);
    setRequiredDataIncorrect(false);
    setHasErrorr(false);
  }
  {/* end register error functions*/}

  {/*register success functions*/}
  const handleModalClose = () => {
    setRegisterSuccess(false);
    // Habilita la interacción con la página nuevamente
  }
  const handleContinue = () => {
    setRegisterSuccess(false);
    let usertotalinfo={
      email:EmailR,
      password:passwordR
    };
    continueloguin(usertotalinfo);
    // Lógica para guardar los datos del usuario en la pagina inmediatamente se registra
  }
  {/* end register success functions*/}
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordInputType = () => {
    return passwordVisible ? 'text' : 'password';
  };

  return (
    <>
    {registersuccess &&         <Modal
  modalattributes={{
    modal: '', 
    content: '', 
    close: '',
    container: '',
    anouncement: '',
    description: '', 
    button: '', 
    anuncementtitle:'¡Bienvenido!',
    descriptiontext:'Te has registrado, dale click a "continuar" para iniciar sesión', //  TEXTO DENTRO DEL MODAL
    buttontext:'Continuar'
  }}
  onClose={handleModalClose}
  onContinue={handleContinue}
/>}
{registerblank &&         <Modal
  modalattributes={{
    modal: '', 
    content: '', 
    close: '', 
    container: '', 
    anouncement: 'useroremail_alert', 
    description: 'useroremail_alert_description', 
    button: '', 
    anuncementtitle:'¡No puedes dejar areas en blanco!',
    descriptiontext:'Has intentado ingresar dejando areas en blanco, porfavor llene todo el formulario antes de continuar', //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalCloseeu}
  onContinue={handleContinueeu}
/>}

{(Emailalreadyregister===true) &&         (<Modal
  modalattributes={{
    modal: '', 
    content: '', 
    close: '', 
    container: '', 
    anouncement: 'useroremail_alert', 
    description: 'useroremail_alert_description', 
    button: '', 
    anuncementtitle:'¡Email en uso!',
    descriptiontext:'Usted ya esta registrado en la plataforma, porfavor inicie sesión', //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalCloseeu}
  onContinue={handleContinueeu}
/>)
}
{(Requireddataincorrect) &&         (<Modal
  modalattributes={{
    modal: '', 
    content: '', 
    close: '', 
    container: '', 
    anouncement: 'useroremail_alert', 
    description: 'useroremail_alert_description', 
    button: '', 
    anuncementtitle:'ups, Algo salio mal :c',
    descriptiontext:`lo sentimos parece estamos teniendo errores y trabajamos para solucionarlos`, //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalCloseeu}
  onContinue={handleContinueeu}
/>)
}
{(hasErrorR) &&         (<Modal
  modalattributes={{
    modal: '', 
    content: '', 
    close: '', 
    container: '', 
    anouncement: 'useroremail_alert', 
    description: 'useroremail_alert_description', 
    button: '', 
    anuncementtitle:'Error Al Registrarse',
    descriptiontext:`porfavor ingrese bien los campos, no debe quedar ni un solo campo en rojo ;)`, //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalCloseeu}
  onContinue={handleContinueeu}
/>)
}
    <div className={darkmode?"Onlyregisterdark":"Onlyregister"}>
    <form className={`formulario_${darkmode?'dark':''}`}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Regístrarse</h2>
                <Register attributes={{
                  id:'Nombre:',
                  name: 'Nameuser',
                  type: 'text',
                  placeholder:'ingrese su nombre',
                  Check: nameerror ? 'input-error' : 'input_Style'
                }
                }handleChangeregister={handleChangeregister} />
                {nameerror && 
                <label htmlFor="" className='label-error'>Su nombre debe tener 3 o más caracteres</label>
                }
                <Register attributes={{
                  id:'Apellido:',
                  name: 'Usernamer',
                  type: 'text',
                  placeholder: 'Ingrese su segundo nombre',
                  Check: UserError ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} />
                {UserError && 
                <label htmlFor="" className='label-error'>Su apellido debe ser entre 3 y 20 caracteres</label>
                }
                <Register attributes={{
                  id:'Correo:',
                  name: 'Emailr',
                  type: 'text',
                  placeholder: 'Ingrese su Email',
                  Check: EmailError ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} 
                />
                {EmailError && 
                <label htmlFor="" className='label-error'>Debe ingresar un correo valido</label>
                }
                <div className='cajapassword'>
                <Register attributes={{
                  id:'Contraseña:',
                  name: 'Passworduser',
                  type: renderPasswordInputType(),
                  placeholder: 'Ingrese una Contraseña',
                  Check: passwordErrorR ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} 
                />
                <p type="button" onClick={handleTogglePasswordVisibility} className={darkmode ? 'boton_register_showpass boton_register_showpassdark' : 'boton_register_showpass'}>
                  {passwordVisible ?  <FaRegEye/>  :<FaRegEyeSlash/>}
                </p>
                </div>
                {passwordErrorR && 
                <label htmlFor="" className='label-error'>contraseña invalida o incompleta</label>
                }
                <input type='button' onClick={handleSubmitregister} value={'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Ya tiene cuenta?</a>
                </div>
              </form>
    </div>
    </>
  );
}

export default Mainregister;

