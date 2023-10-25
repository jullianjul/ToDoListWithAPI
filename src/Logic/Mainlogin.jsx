import React, { useEffect, useState } from 'react';
import './Mainregister.css';
import Input from './../input';
import { useDarkMode } from './../Modals/DarkModeContext';
import { useNavigate } from "react-router-dom";

const Mainlogin= () => {
  {/*inicio animación*/}
  const { darkmode, toggleDarkMode,mostrarFormulario, toggleFormulario } = useDarkMode();
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
  const [hasError, setHasError]= useState(false);
  
  {/*fin parametros login*/}
   {/*funciones login*/}
  function handleChange(attributes,Value){
    if (attributes.name === 'email'){
      setEmail(Value)
      setHasError(false)
    } else if(attributes.name === 'Password'){
      if(Value.length <8){
        setPasswordError(true);
        setHasError(false)
      }else{
        setPasswordError(false);
        setPassword(Value)
        setHasError(false)
      }
    }
  }

  const handlelogin = (user) => {
    // Crear un objeto con los datos del registro
    const userData = {
      email: user.Email,
      password: user.password,
      // Otros campos de registro si los tienes
    };

    // Realizar una solicitud a la API para registrar al usuario
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/auth', {
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
          return response.json()
          // Puedes realizar otras acciones aquí, como redirigir al usuario
        } else {
          // Si la respuesta es un error, muestra el mensaje de error
          return response.json().then((errorData) => {
            console.error('Error en el registro:', errorData.error);
          });
        }
      })
      .then((data) => {
        // Los datos exitosos están disponibles aquí
        console.log('Datos de usuario:', data.user);
        navigate('/ToDoList/aplication');

    
        // Puedes realizar otras acciones aquí, como redirigir al usuario
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        // Manejar errores, si es necesario
      });
  };
  




  function handleSubmit(){
    let account = {Email, password}
    console.log(account)
    handlelogin(account)
  } 


  return (
    <>
    <div className={darkmode?"Onlyregisterdark":"Onlyregister"}>
    <form  className={darkmode?'formulario_dark':"formulario_"}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Iniciar Sesión</h2>
                
                {hasError &&
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
                <input onClick={handleSubmit} type='button' value={'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Aun no estas registrado?</a>
                </div>
              </form> 
    </div>
    </>
  );
}

export default Mainlogin;

