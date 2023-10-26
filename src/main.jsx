import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext'; // Importa el proveedor de contexto
import { UserProvider } from './Context/Usercontext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DarkModeProvider>
      <UserProvider>
      <App />
      </UserProvider>
    </DarkModeProvider>
  </BrowserRouter>
);
