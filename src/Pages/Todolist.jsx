import React, { useState, useEffect } from 'react';
import { useUser } from '../Context/Usercontext';
import { useNavigate } from "react-router-dom";
import { useTodoContext } from '../Context/Todolistcontext';
import { Todofunctions } from '../Todolistappfunctions/Todofunctions';
import { Maininputs } from '../Todolistappfunctions/Inputs/Maininputs';
import './Todolist.css'

export const Todolist = () => {
  const { gettodos,createtodohandler,createtodo} = useTodoContext(); // Utiliza el hook useTodoContext
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
    {createtodo && 
     <Maininputs/>
    }
      <button onClick={clearLocalStorage}>salite pa</button>
      <Todofunctions/>
    </>
  );
};