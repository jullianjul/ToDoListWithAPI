import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loginandregister from './Loginandregister';
import './App.css';
import Homem from './Homem';
import Aplication from './Aplication';
import { Li } from '../licomponents/Li';
import DarkModeButton from '../licomponents/Darkmode';
import { useDarkMode } from '../Context/DarkModeContext';
import { useUser } from '../Context/Usercontext';
import Myprofile from './Myprofile';
import { useNavigate } from 'react-router-dom';

function App() {
  const { darkmode, toggleDarkMode } = useDarkMode();
  const { state } = useUser(); // Aquí obtendrás el estado y las funciones del reducer
  const { currentUser, isLoggedIn } = state; // Accedes a las propiedades desde el estado del reducer
  const navigate=useNavigate();
  
    let nameuser = currentUser ? currentUser.firstName : '';
    useEffect(() => {
      if(nameuser.length>10){
        nameuser=(nameuser.substring(0,10)+'...')
      }else{
        nameuser=nameuser
      }
    }, [nameuser]);



  return (
    <>
    <div className='App'>
      <div className={darkmode?'headerdark':'header'}>
      <div className='perfiltitulos'>
      {isLoggedIn ? (
        <>
        <h1 className='titulos'>Lista Maestra de {nameuser}</h1>
        <button className='btn-miperfil' onClick={()=> navigate('/ToDoList/myprofile')}>Mi perfil</button>
        </>
      ):
      (<h1 className='titulos'>Tu lista Maestra</h1>)
      }
      </div>
        <nav className='Cajanav'>
          <ul className='Navs'>
            <Li className={darkmode?'Navs_lidark':'Navs_li'} link='/ToDoList' content='Home'/>
            <Li className={isLoggedIn ? (darkmode?'Navs_log_userdark':'Navs_log_user') : (darkmode?'Navs_lidark':'Navs_li')} link={isLoggedIn ? '/ToDoList/aplication' : '/ToDoList/loginandregister'} content={isLoggedIn ? 'Ingresar' : 'Registrarse/iniciar'}/>
            <DarkModeButton/>
          </ul>
        </nav> 
      </div>
    </div>
    <Routes>
        <Route path='/ToDoList' element={<Homem />}/>
        <Route path='/ToDoList/loginandregister' element={<Loginandregister/>} />
        <Route path='/ToDoList/aplication' element={<Aplication/>} />
        <Route path='/ToDoList/myprofile' element={<Myprofile/>} />
      </Routes>
    </>
  );
}

export default App;

