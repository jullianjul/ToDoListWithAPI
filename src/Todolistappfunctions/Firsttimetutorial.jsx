import React, { useState } from 'react';
import './Firsttimetutorial.css';
import Marcandocorrecto from '../../img/Marcandocorrecto.jpg'
import Carousel1stimg from '../../img/Carousel1stimg.jpg'
import Carousel2ndimg from '../../img/Carousel2ndimg.jpg'
import Carousel3rdimg from '../../img/Carousel3rdimg.jpg'
import Carousel4thimg from '../../img/Carousel4thimg.jpg'
import Carousel5thimg from '../../img/Carousel5thimg.jpg'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const Firsttimetutorial = () => {
  const [slides] = useState([
    {
      imageUrl: Carousel1stimg,
      description: 'Aquí, hallarás las pestañas de tareas pendientes y completadas. Para cambiar entre ellas, simplemente haz clic en la pestaña deseada (la más resaltada indicará la pestaña activa).',
    },
    {
      imageUrl: Carousel2ndimg,
      description: 'Con este botón, puedes generar nuevas tareas. Al hacer clic, se abrirá una "nota" que te permitirá introducir el título y la descripción de tu tarea. Ten en cuenta que no se pueden crear tareas con menos de 3 caracteres, así que asegúrate de proporcionar la información necesaria.',
    },
    {
      imageUrl: Carousel3rdimg,
      description: 'En este espacio, tienes la opción de buscar tus tareas por título. Simplemente introduce el nombre de la tarea que deseas encontrar. Si deseas volver a ver todas tus tareas, basta con borrar el contenido del buscador, y este dejará de filtrar las tareas.',
    },
    {
      imageUrl: Carousel4thimg,
      description: 'Aquí se exhibirán las tareas que has creado. La visualización dependerá de la pestaña en la que te encuentres, mostrando ya sea las tareas completadas o las pendientes.',
    },
    {
      imageUrl: Carousel5thimg,
      description: 'Estos son los botones relacionados con tus tareas. A través de ellos, puedes realizar las siguientes acciones: eliminar tareas, actualizar el contenido de una tarea (funciona similar al crear tareas) y marcar como completada la tarea que desees.',
    },
    // Agrega más objetos para más slides
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide < slides.length - 1 ? prevSlide + 1 : 0));
  };

  return (
    <>
    <div className='carousel-container-ALL'>
        <div className="carousel-container-firsttime">
            <div className='Arrow back_container'>
            <p onClick={handlePrevSlide}><IoIosArrowBack/></p>
        </div>
                {/* Mostrar el contenido del slide actual */}
                <div className={`carousel-slide ${slides[currentSlide].imageUrl}`}>
                    {/* Contenido de tu slide */}
                    <div className='Img-carousel-container'>
                    <img src={slides[currentSlide].imageUrl} className='Slideimg' alt={`Slideimg ${currentSlide + 1}`} />
                    </div>
                    <div className='space_carousel'>

                    </div>
                    <div className='description-container'>
                      <p>{slides[currentSlide].description}</p>
                    </div>
                </div>
            <div className='Arrow forward_container'>
                  <p onClick={handleNextSlide}><IoIosArrowForward/></p>
            </div>
        </div>
    </div>
    
    </>
  );
};
