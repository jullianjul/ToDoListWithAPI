import React, { useState } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import './Updateuserform.css'

const Updateuserform = () => {
  const { isLoggedIn, state,dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser } = state;
  const { toggleDarkMode, mostrarFormulario,darkmode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <>
      <div className='Container_Modal_Update_User_Form'>
        <div className='Subcontainer_Modal_Update_user'>
            <form action="">
                <label htmlFor="">Nombre:</label>
                <input type="text"  value={currentUser.firstName}/>
            </form>
        </div>
      </div>
    </>
  );
}

export default Updateuserform;
