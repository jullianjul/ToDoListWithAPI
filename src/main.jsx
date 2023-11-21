import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import { HashRouter } from 'react-router-dom';  // Cambia a HashRouter
import { DarkModeProvider } from './Context/DarkModeContext';
import { UserProvider } from './Context/Usercontext';
import { TodoProvider } from './Context/Todolistcontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <DarkModeProvider>
      <UserProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </UserProvider>
    </DarkModeProvider>
  </HashRouter>
);
