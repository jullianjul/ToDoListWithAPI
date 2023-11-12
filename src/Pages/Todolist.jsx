import React, { useState, useEffect } from 'react';
import { useUser } from '../Context/Usercontext';
import { useNavigate } from "react-router-dom";
import { Getalltodos } from '../Todolistappfunctions/Getalltodos';
import { Maininputs } from '../Todolistappfunctions/Inputs/Maininputs';
import { useTodoContext } from '../Context/Todolistcontext';

export const Todolist = () => {
  const { gettodos,} = useTodoContext(); // Utiliza el hook useTodoContext
    const { dispatch, state } = useUser();
    const { currentUser } = state;
    const navigate = useNavigate();
    const clearLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        gettodos([])
        dispatch({ type: 'LOGOUT' });
        navigate('/ToDoList/loginandregister');
    };
  return (
    <>
      <Getalltodos/>
      <div className='cerrarsesion'>
        <button onClick={clearLocalStorage} className='cerrarsesion-btn'>Cerrar Sesión</button>
      </div>
    </>
  );
};