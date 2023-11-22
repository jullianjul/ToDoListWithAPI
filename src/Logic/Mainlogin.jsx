import React, { useEffect, useState } from 'react';
import './Mainregister.css';
import Input from '../Inputs/input';
import { useDarkMode } from './../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from './../Context/Usercontext';


const Mainlogin= () => {
  {/*inicio animación*/}
  const { darkmode, toggleDarkMode, toggleFormulario } = useDarkMode();

  const navigate = useNavigate();
  const { state, continueloguin, loading, setLoading} = useUser(); // Aquí obtendrás el estado y las funciones del reducer
  const { credentialsError } = state; // Accedes a las propiedades desde el estado del reducer
  
  {/*Fin animación*/}

  {/*recibidor de parametros*/}
  {/* parametros login*/}
  const [Email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [passwordError, setPasswordError]= useState(false);
  
  {/*fin parametros login*/}
   {/*funciones login*/}
  function handleChange(attributes,Value){
    if (attributes.name === 'email'){
      setEmail(Value)
    } else if(attributes.name === 'Password'){
      if(Value.length <8){
        setPasswordError(true);
      }else{
        setPasswordError(false);
        setPassword(Value)
      }
    }
  }

  const handleSubmit = () => {
    // Crear un objeto con los datos del registro
    let user = {Email, password}
    const userData = {
      email: user.Email,
      password: user.password,
      // Otros campos de registro si los tienes
    };
    continueloguin(userData);
  };


  return (
    <>
    <div className={darkmode?"Onlyregisterdark":"Onlyregister"}>
    <form  className={darkmode?'formulario_dark':"formulario_"}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Iniciar Sesión</h2>
                
                {credentialsError &&
                <div className='label-alert'>
                <label htmlFor="" className='label-alert-content'>su contraseña o usuario son incorrectos o no estan en nuestra plataforma</label>
                </div>}
                <Input attributes={{
                  id:'email:',
                  name: 'email',
                  type: 'text',
                  placeholder: 'Ingrese su email'
                }
                } handleChange={handleChange}/>
                <Input attributes={{
                  id:'Contraseña:',
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
                <input onClick={handleSubmit} type='button' value={loading ?'Cargando...' :'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Aun no estas registrado?</a>
                </div>
              </form> 
    </div>
    </>
  );
}

export default Mainlogin;

