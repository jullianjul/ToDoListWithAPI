import React, { useState, useEffect } from "react";
import './Homem.css';
import { useDarkMode } from "./Modals/DarkModeContext";
import { useNavigate } from "react-router-dom";

function Homem() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/ToDoList/Loginandregister");
  }
  const slides = [
    {
      description: "¿Necesitas organizar tus tareas diarias de manera sencilla y eficaz? Con nuestro ToDo List, podrás gestionar tus pendientes de forma intuitiva y personalizada. Marca tus tareas a medida que avanzas y mejora tu productividad. ¡Pon fin a la procrastinación hoy mismo!",
      image: "", // Ruta de tu imagen
    },
    {
      description: "El proyecto de ToDo List es una aplicación que te permite crear, organizar y gestionar tus tareas diarias de manera eficiente. Puedes agregar, editar y eliminar tareas y marcarlas como completadas",
      image: "./../img/Marcandocorrecto.jpg", // Ruta de tu imagen
    },
    {
      description: "¡Organiza, Haz, Realiza! Con Tu Lista Maestra, tu lista de tareas nunca ha sido tan fácil de manejar. ¡Únete hoy y pon fin a la procrastinación!",
      image: "./../img/hacertodo.jpg", // Ruta de tu imagen
      link: "Registrate Aquí"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [btnlistener, setBtnListener] = useState(false);

  const goToPrevious = () => {
    setBtnListener(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
    }, 500); // Retraso de 1 segundo
    setTimeout(() => {
      setBtnListener(false);
    }, 500); // Cambia btnListener de nuevo a false después de 2 segundos
  };

  const goToNext = () => {
    setBtnListener(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 500); // Retraso de 1 segundo
    setTimeout(() => {
      setBtnListener(false);
    }, 500); // Cambia btnListener de nuevo a false después de 2 segundos
  };

  


  const { darkmode} = useDarkMode();

  return (
    <>
      <main className={darkmode?'maindark':'main'}>
        <div className="title">
          <h1 className="titulo">
            Bienvenido a <span className={darkmode?'titlebranddark':'titlebrand'}>Tu Lista Maestra</span>
          </h1>
          <h1 className="titulo">¿Estás preparado para no dejar ninguna tarea sin resolver?</h1>
        </div>
        <div className={darkmode?'descripcion2dark':'descripcion2'}>
              <div className={`descripcion ${btnlistener ? "active-BTN" : ""}`}>
                  <div className="cajadescripcion">
                    <p className="descripcionP">{slides[currentIndex].description}</p>
                    <a onClick={handleClick} className="link">{slides[currentIndex].link}</a>
                  </div>
              <div className="ImgTodolist">
              <div
                    src="./../img/hacertodo.jpg"
                    alt={slides[currentIndex].title}
                    className={`carousel__image${currentIndex} ${btnlistener ? "active-BTN" : ""}`}
                  >
                  </div>
              </div>
            </div>
            <div className="Botonesdenavegacion">
                  <button className="carousel__button" onClick={goToPrevious}>
                        Anterior
                  </button>
                  <button className="carousel__button" onClick={goToNext}>
                        Siguiente
                  </button>
            </div>  
        </div>
      </main>
    </>
  );
}

export default Homem;
