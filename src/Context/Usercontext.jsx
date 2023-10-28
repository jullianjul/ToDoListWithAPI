// UserContext.js
import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User_Auth} from '../ServicesApi/Apifecth';
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};


//guarda el usuario en un contexto global
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [credentialserror, setCredentialsError]=useState(false);
  const continueloguin = async (user) => {
    try {
      const response = await User_Auth(user);
      if ('error' in response) {
        // Si hay un error en la respuesta de la API, no actualices currentUser
        console.error('Error en la solicitud:', response.error);
        if(response.error==='Credentials are incorrect'){
          setCredentialsError(true);
        }else{
          window.alert('Lo sentimos, sucedió un error inesperado')
        }
        //no hay un if que detecte el error de la solicitud
      } else {
        // Si la respuesta es exitosa, actualiza el estado de currentUser
        setCurrentUser(response.user);
        setIsLoggedIn(true);
        console.log(response)
        navigate('/ToDoList/aplication');
      }
    } catch (error) {
      console.error('Error en continueloguin:', error);
      // Manejar el error, si es necesario
    }
  };
  

  const login = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, currentUser, login, logout,continueloguin,credentialserror,setCredentialsError }}>
      {children}
    </UserContext.Provider>
  );
};
