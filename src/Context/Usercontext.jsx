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
  const storedUser = localStorage.getItem('user');
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [state, dispatch] = useReducer(userReducer, {
    ...initialState,
    currentUser: storedUser ? JSON.parse(storedUser) : null,
    isLoggedIn: storedIsLoggedIn || false,
  });
  const navigate = useNavigate();

  const continueloguin = async (user) => {
    try {
      const response = await User_Auth(user);
      if ('error' in response) {
        console.error('Error en la solicitud:', response.error);
        if (response.error === 'Credentials are incorrect') {
          dispatch({ type: 'LOGIN_FAILURE', payload: response });
        } else {
          dispatch({ type: 'LOGIN_FAILURE' });
          window.alert('algo salio mal');
        }
      } else {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/ToDoList/aplication');
      }
    } catch (error) {
      console.error('Error en continueloguin:', error);
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, continueloguin }}>
      {children}
    </UserContext.Provider>
  );
};
