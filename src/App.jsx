import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loginandregister from './Loginandregister';
import './App.css';
import Homem from './Homem';
import Mainregister from './Logic/Mainregister';
import Aplication from './Aplication';
import { Li } from './licomponents/Li';
import DarkModeButton from './Modals/Darkmode';
import { useDarkMode } from './Modals/DarkModeContext';
import Mainlogin from './Logic/Mainlogin';

function Home() {

  return(
    <Homem/>
  )
}


function App() {
  const { darkmode, toggleDarkMode } = useDarkMode();
    const getislog = localStorage.getItem('islog');
    const isloguin = JSON.parse(getislog);
    const storedAccount = localStorage.getItem('account');
    const user = JSON.parse(storedAccount);
    const username = user ? user.username : '';
    const [usershow, setUserShow]= useState('');


    useEffect(() => {
      if(username.length>10){
        setUserShow(username.substring(0, 10) + '...')
      }else{
        setUserShow(username)
      }
    }, [username]);


  return (
    <>
    <div className='App'>
      <div className={darkmode?'headerdark':'header'}>
      <div className='perfiltitulos'>
      {isloguin ? (
        <>
        <h1 className='titulos'>Lista Maestra de {usershow}</h1>
        <button className='btn-miperfil'>Mi perfil</button>
        </>
      ):
      (<h1 className='titulos'>Tu lista Maestra</h1>)
      }
      </div>
        <nav className='Cajanav'>
          <ul className='Navs'>
            <Li className={darkmode?'Navs_lidark':'Navs_li'} link='/ToDoList' content='Home'/>
            <Li className={isloguin ? (darkmode?'Navs_log_userdark':'Navs_log_user') : (darkmode?'Navs_lidark':'Navs_li')} link={isloguin ? '/ToDoList/aplication' : '/ToDoList/loginandregister'} content={isloguin ? 'Ingresar' : 'Registrarse/iniciar'}/>
            <DarkModeButton/>
          </ul>
        </nav> 
      </div>
    </div>
    <Routes>
        <Route path='/ToDoList' element={<Home />}/>
        <Route path='/ToDoList/loginandregister' element={<Loginandregister/>} />
        <Route path='/ToDoList/aplication' element={<Aplication/>} />
      </Routes>
    </>
  );
}

export default App;

