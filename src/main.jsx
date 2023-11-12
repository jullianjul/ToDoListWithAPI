import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext'; // Importa el proveedor de contexto
import { UserProvider } from './Context/Usercontext';
import { TodoProvider } from './Context/Todolistcontext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DarkModeProvider>
      <UserProvider>
      <TodoProvider>
      <App />
      </TodoProvider>
      </UserProvider>
    </DarkModeProvider>
  </BrowserRouter>
);
