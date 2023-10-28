// UserContext.js
import { createContext, useContext, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User_Auth} from '../ServicesApi/Apifecth';
import { userReducer,initialState } from '../Reducer/useReduceruser';
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};


//guarda el usuario en un contexto global
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();
  const continueloguin = async (user) => {
    try {
      const response = await User_Auth(user);
      if ('error' in response) {
        // Si hay un error en la respuesta de la API, no actualices currentUser
        console.error('Error en la solicitud:', response.error);
        if(response.error==='Credentials are incorrect'){
          dispatch({ type: 'LOGIN_FAILURE', payload: response});
        }else{
          dispatch({ type: 'LOGIN_FAILURE' });
          window.alert('algo salio mal')
        }
        //no hay un if que detecte el error de la solicitud
      } else {
        // Si la respuesta es exitosa, actualiza el estado de currentUser
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
        navigate('/ToDoList/aplication')
      }
    } catch (error) {
      console.error('Error en continueloguin:', error);
      // Manejar el error, si es necesario
    }
  };
  return (
    <UserContext.Provider value={{ state, dispatch,continueloguin }}>
      {children}
    </UserContext.Provider>
  );
};
