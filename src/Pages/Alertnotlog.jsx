import React, { useEffect, useState } from 'react';
import './Aplication.css'
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import { Todolist } from './Todolist';

const Alertnotlog = () => {
    const navigate = useNavigate();
    const { state } = useUser(); // Aquí obtendrás el estado y las funciones del reducer
    const { isLoggedIn } = state; // Accedes a las propiedades desde el estado del reducer
    const [segundosRestantes, setSegundosRestantes] = useState(10);
  
    // Función que se ejecutará después de la cuenta regresiva
    const funcionDemorada = () => {
      navigate("/ToDoList/Loginandregister");
    };
  
    useEffect(() => {
      if (!isLoggedIn) {
        if (segundosRestantes > 0) {
          const intervalo = setInterval(() => {
            setSegundosRestantes((prevSegundos) => prevSegundos - 1);
          }, 1000);
          return () => {
            clearInterval(intervalo); // Limpieza al desmontar el componente
          };
        } else if (segundosRestantes === 0) {
          funcionDemorada();
        }
      }
    }, [segundosRestantes, isLoggedIn]);
  
  
  
    return (
      <div>
          <div className='alertnotlog'>
          <h1>Muy mal, no has iniciado sesión y estas intentando entrar</h1>
          {segundosRestantes > 0 && (
            <p>Redirigiendo en {segundosRestantes} segundos...</p>
          )}
          {segundosRestantes === 0 && (
            <p>Redirigiendo después de la cuenta regresiva.</p>
          )}
          {/* Aquí puedes incluir contenido adicional para usuarios que no se han logueado */}
        </div>
      </div>
    );
};

export default Alertnotlog;
