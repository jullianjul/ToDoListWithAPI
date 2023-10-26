// UserContext.js
import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userShow, setUserShow] = useState('');
  const navigate = useNavigate();
  const continueloguin=(user)=>{
    const userData = {
        email: user.EmailR,
        password: user.passwordR,
        // Otros campos de registro si los tienes
      };
      console.log(userData)
  
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
              if(errorData.error==='Credentials are incorrect'){
                window.alert('algo no fue como esperabas')
              }else{
                window.alert('Algo salio mal :C')
              }
            });
          }
        })
        .then((data) => {
          // Los datos exitosos están disponibles aquí
          console.log('Datos de usuario:', data.user);
          let useraccount={
            Name:data.user.firstName,
            lastName:data.user.lastName,
            id:data.user._id,
            email:data.user.email,
            password:data.user.password
          };
          console.log(useraccount)
          login(useraccount);
          navigate('/ToDoList/aplication');
          // Puedes realizar otras acciones aquí, como redirigir al usuario
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          // Manejar errores, si es necesario
        });

  }

  const login = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, currentUser, login, logout, userShow, setUserShow,continueloguin }}>
      {children}
    </UserContext.Provider>
  );
};
