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
import Modalcontent from './Modalcontent';

const Mainregister= () => {
  {/*inicio animación*/}
  const { darkmode, toggleDarkMode, mostrarFormulario, toggleFormulario } = useDarkMode();
  const navigate = useNavigate();
  const {continueloguin,loading, setLoading} = useUser();
  
  
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
      setNamer(Value)
      {(Value.length <=2 || Value.length>20)? (setNameError(true)):(setNameError(false))}
    }
    if (attributes.name === 'Emailr') {
      setEmailr(Value);
      {(Value.includes(' ') || !Value.includes('@') || Value.length < 5) ? (setEmailError(true)):(setEmailError(false))}
    }
    if(attributes.name==='Usernamer'){
      //comprueba si el user tiene mas de 6 caracteres
      setUserName(Value);
      setHasErrorr(false);
      {(Value.length<3 || Value.length>=20)?(setUserError(true)):(setUserError(false))}
    }
    if(attributes.name==='Passworduser'){
      setHasErrorr(false)
      setPasswordr(Value)
      {Value.length<8 ? setPasswordErrorr(true) : setPasswordErrorr(false)}
    }
  }
  //register api:
  const [Requireddataincorrect, setRequiredDataIncorrect]= useState(false);
  //register
  const handleRegister = async(user) => {
    try {
      setLoading(true);
      const response = await Create_user(user);
      if ('error' in response) {
        if(response.error==='Entered email already exists'){
          setEmailAlreadyRegister(true);
        }else{
          window.alert('Lo sentimos, sucedió un error inesperado')
        }
      } else {
        // Si la respuesta es exitosa, activa el modal de register success
        setRegisterSuccess(true);
      }
    } catch (error) {
      console.error('Error en continueloguin:', error);
      // Manejar el error, si es necesario
    }finally{
      setLoading(false);
    }
  };
  //register supervisor:
  const [registerblank,setRegisterBlank]=useState(false)
  function handleSubmitregister(){
    if(EmailR===''||passwordR===''||username===''||NameR===''){
      setRegisterBlank(true)
      return;
    }
      if((EmailError===true) || (passwordErrorR===true) || (UserError===true) ||(nameerror===true)){
        setHasErrorr(true)
      }else{
        let usertotalinfo={ 
          firstName:NameR,
          lastName:username,
          email:EmailR,
          password:passwordR,
        }
        handleRegister(usertotalinfo);
      }
  }
  {/*end functions supervisor register*/}

  {/* register error functions*/}
  const handleContinueeu = () => {
    if(registersuccess){
      handleContinue();
      return;
    }
    setEmailAlreadyRegister(false);
    setRegisterBlank(false);
    setRequiredDataIncorrect(false);
    setHasErrorr(false);
  }

  const handleModalCloseeu = () => {
    setRegisterSuccess(false);
    setEmailAlreadyRegister(false);
    setRegisterBlank(false);
    setRequiredDataIncorrect(false);
    setHasErrorr(false);
  }
  {/* end register error functions*/}

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
  //password visibility functions
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordInputType = () => {
    return passwordVisible ? 'text' : 'password';
  };

  return (
    <>
    {(registersuccess || registerblank || Emailalreadyregister || Requireddataincorrect || hasErrorR) && 
     <Modalcontent registersuccess={registersuccess} registerblank={registerblank} Emailalreadyregister={Emailalreadyregister} Requireddataincorrect={Requireddataincorrect} hasErrorR={hasErrorR} Onexit={handleModalCloseeu} Oncontinue={handleContinueeu}/>
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
                <label htmlFor="" className='label-error'>Su nombre debe ser entre 3 y 20 caracteres</label>
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
                <input type='button' onClick={handleSubmitregister} value={loading ? 'Cargando...': 'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Ya tiene cuenta?</a>
                </div>
              </form>
    </div>
    </>
  );
}

export default Mainregister;

