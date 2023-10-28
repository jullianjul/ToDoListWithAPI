import React, { useEffect, useState } from 'react';
import { Register } from '../licomponents/Register';
import Modal from '../Modals/Modal';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import './Mainregister.css';
import { useUser } from '../Context/Usercontext';


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
  const handleRegister = (Ruser) => {
    // Crear un objeto con los datos del registro
    const userData = {
      firstName: Ruser.NameR,
      lastName: Ruser.username,
      email: Ruser.EmailR,
      password: Ruser.passwordR,
      // Otros campos de registro si los tienes
    };

    // Realizar una solicitud a la API para registrar al usuario
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // Registro exitoso
          console.log('Usuario registrado con éxito');
          setRegisterSuccess(true);
          // Puedes realizar otras acciones aquí, como redirigir al usuario
        } else {
          // Si la respuesta es un error, muestra el mensaje de error
          return response.json().then((errorData) => {
            console.error('Error en el registro:', errorData.error);
            if(errorData.error==='Entered email already exists'){
              setEmailAlreadyRegister(true);
            }else{
              setRequiredDataIncorrect(true);
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        // Manejar errores, si es necesario
      });
  };
  //register


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
        let usertotalinfo={EmailR,passwordR,NameR,username}
        console.log('user:', usertotalinfo)
        handleRegister(usertotalinfo);
        
      }
    }else{
      console.log('XD dejaba los campos vacios')
      setHasErrorr(true)
    }
  }
  {/*fin funciones register*/}
  {/* register success functions*/}
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
    // Lógica para continuar, si es necesario
    // Por ejemplo, redirigir a otra página
  }

  {/* register success functions end*/}

  return (
    <>
    {registersuccess &&         <Modal
  modalattributes={{
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: '', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: '', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
    anuncementtitle:'¡Bienvenido!',
    descriptiontext:'Te has registrado, dale click a "continuar" para iniciar sesión', //  TEXTO DENTRO DEL MODAL
    buttontext:'Continuar'
  }}
  onClose={handleModalClose}
  onContinue={handleContinue}
/>}
{registerblank &&         <Modal
  modalattributes={{
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: 'useroremail_alert', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: 'useroremail_alert_description', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
    anuncementtitle:'¡No puedes dejar areas en blanco!',
    descriptiontext:'Has intentado ingresar dejando areas en blanco, porfavor llene todo el formulario antes de continuar', //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalCloseeu}
  onContinue={handleContinueeu}
/>}


{(Emailalreadyregister===true) &&         (<Modal
  modalattributes={{
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: 'useroremail_alert', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: 'useroremail_alert_description', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
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
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: 'useroremail_alert', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: 'useroremail_alert_description', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
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
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: 'useroremail_alert', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: 'useroremail_alert_description', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
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
                    <Register attributes={{
                  id:'Contraseña:',
                  name: 'Passworduser',
                  type: 'password',
                  placeholder: 'Ingrese una Contraseña',
                  Check: passwordErrorR ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} 
                />
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

