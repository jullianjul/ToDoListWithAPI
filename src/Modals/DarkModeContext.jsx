import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const DarkModeContext = createContext();

// Proporciona un componente que envuelva a la aplicación
const DarkModeProvider = ({ children }) => {
  const isDarkModeInLocalStorage = localStorage.getItem('darkmode') === 'true';
  const [darkmode, setDarkMode] = useState(isDarkModeInLocalStorage);
  const [mostrarFormulario, setMostrarFormulario]= useState(true);
  // Función para alternar el modo oscuro

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    localStorage.setItem('darkmode', !darkmode);
  };


  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <DarkModeContext.Provider value={{ darkmode, toggleDarkMode, mostrarFormulario, toggleFormulario }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Función personalizada para usar el contexto
const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export { DarkModeProvider, useDarkMode };
