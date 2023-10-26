import React, { useEffect, useState } from 'react';
import './Aplication.css'
import { Todolistapp } from '../Todolistapp/Todolistapp';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';


const Aplication = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser(); //contexto
  // Estados para el contador y el valor inicial
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
      {isLoggedIn ? (
          <Todolistapp />
      ) : (
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
      )}
    </div>
  );
};

export default Aplication;
