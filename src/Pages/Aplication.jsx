import React, { useEffect, useState } from 'react';
import './Aplication.css'
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import { Todolist } from './Todolist';
import Alertnotlog from './Alertnotlog';

const Aplication = () => {
  const { state } = useUser(); // Aquí obtendrás el estado y las funciones del reducer
  const { isLoggedIn } = state; // Accedes a las propiedades desde el estado del reducer
  return (
    <div>
      {isLoggedIn ? (
          <Todolist />
      ) : (
        <Alertnotlog/>
      )}
    </div>
  );
};

export default Aplication;
