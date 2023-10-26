import React from 'react';
import { useDarkMode } from './DarkModeContext'; // Importa el hook para consumir el contexto

const DarkModeButton = () => {
  const { darkmode, toggleDarkMode } = useDarkMode(); // Obtiene el valor y la función del contexto

  const darkmodeButtonText = darkmode ? 'Darkmode on' : 'Darkmode off';

  return (
    <li className={darkmode?'Navs_lidark':'Navs_li'} onClick={toggleDarkMode}>
      <a className={darkmode?'Navs_adark':'Navs_a'}>
        {darkmodeButtonText}
      </a>
    </li>
  );
};

export default DarkModeButton;
