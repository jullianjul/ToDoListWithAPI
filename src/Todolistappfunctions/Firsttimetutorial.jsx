import React, { useState } from 'react';
import './Firsttimetutorial.css';
import Marcandocorrecto from '../../img/Marcandocorrecto.jpg'

export const Firsttimetutorial = () => {
  const [slides] = useState([
    {
      imageUrl: Marcandocorrecto,
      description: 'Descripción del slide 1',
    },
    {
      imageUrl: 'url_de_la_imagen_2',
      description: 'Descripción del slide 2',
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
            <div>
            <button onClick={handlePrevSlide}>flechita</button>
        </div>
                {/* Mostrar el contenido del slide actual */}
                <div className={`carousel-slide ${slides[currentSlide].imageUrl}`}>
                    {/* Contenido de tu slide */}
                    <div className='Img-carousel-container'>
                    <img src={slides[currentSlide].imageUrl} className='Slideimg' alt={`Slideimg ${currentSlide + 1}`} />
                    </div>
                    <div className='description-container'>
                      <p>{slides[currentSlide].description}</p>
                    </div>
                </div>
            <div>
                  <button onClick={handleNextSlide}>flechita</button>
            </div>
        </div>
    </div>
    
    </>
  );
};
