import React, { useEffect, useState } from 'react';
import './Aplication.css'
import { Todolistapp } from './Todolistapp/Todolistapp';
import { useNavigate } from "react-router-dom";

const Aplication = () => {
  const navigate = useNavigate();
  const storedAccount = localStorage.getItem('account');
  const user = JSON.parse(storedAccount);
  const username = user ? user.username : '';
  const Name = user ? user.NameR : '';
  const Email = user ? user.EmailR : '';
  const Password = user ? user.passwordR : '';
  const getislog = localStorage.getItem('islog');
  const isloguin = JSON.parse(getislog);

  // Estados para el contador y el valor inicial
  const [segundosRestantes, setSegundosRestantes] = useState(10);

  // Función que se ejecutará después de la cuenta regresiva
  const funcionDemorada = () => {
    navigate("/ToDoList/Loginandregister");
  };

  useEffect(() => {
    if (!isloguin) {
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
  }, [segundosRestantes, isloguin]);



  return (
    <div>
      {isloguin ? (
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
