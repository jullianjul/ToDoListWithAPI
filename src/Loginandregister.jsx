import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import Input from './input';
import { Register } from './licomponents/Register';
import Modal from './Modals/Modal';
import { useDarkMode } from './Modals/DarkModeContext';
import { useNavigate } from "react-router-dom";

const LoginAndRegister= () => {
  {/*inicio animación*/}
  const { darkmode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const getislog = localStorage.getItem('islog')||{};
  useEffect(() => {
    console.log(getislog)
    if(getislog==='true'){
      redirectuser();
    }
    // Opcional: puedes devolver una función de limpieza (cleanup) si es necesario
    return () => {
      // Código de limpieza (se ejecuta cuando el componente se desmonta o cuando las dependencias cambian)
    };
  }, []);
  function redirectuser(){
    toggleDarkMode();
    toggleDarkMode();
    navigate('/ToDoList/aplication');
  }
  
  {/*Fin animación*/}

  {/*recibidor de parametros*/}
  {/* parametros login*/}
  const [Email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [passwordError, setPasswordError]= useState(false);
  const [isLogin, setIsLogin]= useState(false);
  const [hasError, setHasError]= useState(false);
  const [registersuccess, setRegisterSuccess]= useState(false);
  
  {/*fin parametros login*/}
   {/*funciones login*/}
  function handleChange(attributes,Value){
    setEmailAlreadyRegister(false);
    setRegisterSuccess(false);
    setUserAlreadyRegister(false);
    if (attributes.name === 'email'){
      setEmail(Value)
      setHasError(false)
    } else if(attributes.name === 'Password'){
      if(Value.length <6){
        setPasswordError(true);
        setHasError(false)
      }else{
        setPasswordError(false);
        setPassword(Value)
        setHasError(false)
      }
    }
  }


  




  function handleSubmit(){
    let account = {Email, password}
    if (account){
      ifMatch(account)
    }
  } 

  function ifMatch(accountuser) {
    // Obtén el objeto de usuarios almacenados en localStorage
    const usersData = JSON.parse(localStorage.getItem('usertotalinfo')) || [];
    const matchingUser = usersData.find(user => user.EmailR === accountuser.Email && user.passwordR === accountuser.password);
  
    if (accountuser.Email.length > 0 && accountuser.password.length > 0 && matchingUser) {
      const { EmailR, passwordR, NameR, username } = matchingUser;
      let ac = { EmailR, passwordR,NameR, username};
      let account = JSON.stringify(ac);
      localStorage.setItem('account', account);
      localStorage.setItem('islog', true);
      setIsLogin(true);
      setHasError(false);
  
      console.log('Usuario logueado:', NameR);
        // Retraso de 0.5 segundos antes del primer toggleDarkMode
          setTimeout(() => {
            toggleDarkMode();
            // Retraso de 0.5 segundos antes del segundo toggleDarkMode
            setTimeout(() => {
              toggleDarkMode();
              navigate("/ToDoList/Aplication");
            }, 10);
          }, 10);

      navigate("/ToDoList/Aplication");
    } else {
      setIsLogin(false);
      setHasError(true);
      console.log('Credenciales incorrectas o usuario no encontrado');
    }
  }
  

  {/*fin parametros login*/}


  {/*funciones register*/}
  
  const [EmailR, setEmailr]= useState('');
  const [passwordR, setPasswordr]= useState('');
  const [NameR, setNamer]= useState('');
  const [username, setUserName]= useState('');
  const [passwordErrorR, setPasswordErrorr]= useState(false);
  const [EmailError, setEmailError]= useState(false);
  const [hasErrorR, setHasErrorr]= useState(false);
  const [UserError, setUserError]= useState(false);
  const [Useralreadyregister, setUserAlreadyRegister]= useState(false);
  const [Emailalreadyregister, setEmailAlreadyRegister]= useState(false);
  const [nameerror, setNameError]= useState(false)


  function handleChangeregister(attributes,Value){
    setRegisterSuccess(false);
    setEmailAlreadyRegister(false);
    setUserAlreadyRegister(false);
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
          setEmailr(Value);
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
   
      setHasErrorr(false);
      if(Value.includes(' ')){
        setEmailError(true);
      }else{
      if(Value.length<3){
        setUserError(true);
      }else{
        if(username.length>=20){
          setUserError(true)
        }else{
          setUserError(false);
          setUserName(Value);
        }
      }}
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
  const [erroresname, setErroresName]=useState('');
  const [erroresnamelastname, setErroresNameLastname]=useState('');
  const [errorespass, setErrorespass]=useState('');
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


  const handleModalClose = () => {
    setRegisterSuccess(false);
    // Habilita la interacción con la página nuevamente
  }
  const handleModalCloseeu = () => {
    setEmailAlreadyRegister(false);
    setUserAlreadyRegister(false);
    setRegisterBlank(false);
    setRequiredDataIncorrect(false);
    setHasErrorr(false);
  }

  const handleContinue = () => {
    setRegisterSuccess(false);
    let ac = { EmailR, passwordR,NameR, username};
    let account = JSON.stringify(ac);
    localStorage.setItem('account', account);
    localStorage.setItem('islog', true);
    setIsLogin(true);
    setHasError(false);
            // Retraso de 0.5 segundos antes del primer toggleDarkMode
            setTimeout(() => {
              toggleDarkMode();
              // Retraso de 0.5 segundos antes del segundo toggleDarkMode
              setTimeout(() => {
                toggleDarkMode();
                navigate("/ToDoList/Aplication");
              }, 10);
            }, 10);

    console.log('Usuario logueado:', NameR);


    navigate("/ToDoList/Aplication");
    // Lógica para continuar, si es necesario
    // Por ejemplo, redirigir a otra página
  }
  const handleContinueeu = () => {
    setEmailAlreadyRegister(false);
    setUserAlreadyRegister(false);
    setRegisterBlank(false);
    setRequiredDataIncorrect(false);
    setHasErrorr(false);
  }
  

  {/* register success functions end*/}

  //darkmode
  
  const Background=()=>{
    return <main className={darkmode?'Backgrounddark':'Background'}></main>
  }
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
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

<Background />
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


    <div className="LoginAndRegister">
        <main>
          <div className="contenedor__todo">
            <div className="contenedor__login-register">
              <form  className={darkmode?'formulario_dark':"formulario_"}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Iniciar Sesión</h2>
                
                {hasError &&
                <div className='label-alert'>
                <label htmlFor="" className='label-alert-content'>su contraseña o usuario son incorrectos o no estan en nuestra plataforma</label>
                </div>}
                <Input attributes={{
                  id:'email',
                  name: 'email',
                  type: 'text',
                  placeholder: 'Ingrese su email'
                }
                } handleChange={handleChange}/>
                <Input attributes={{
                  id:'Pass',
                  name: 'Password',
                  type: 'Password',
                  placeholder: 'Ingrese su contraseña',
                }
                }
                handleChange={handleChange}
                param={passwordError} 
                />
                {passwordError && 
                <label htmlFor="" className='label-error'>contraseña invalida o incompleta</label>
                }
                <input onClick={handleSubmit} type='button' value={'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Aun no estas registrado?</a>
                </div>
              </form> 
              <form className={`formulario_${darkmode?'dark':''} ${mostrarFormulario ? 'visible' : 'invisible'}`}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Regístrarse</h2>
                <Register attributes={{
                  id:'Nameuserid',
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
                  id:'Username',
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
                  id:'Correousuario',
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
                  id:'Password',
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
          </div>
        </main>
    </div>
    </>
  );
}

export default LoginAndRegister;


