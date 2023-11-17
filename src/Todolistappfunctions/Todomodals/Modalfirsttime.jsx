import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useTodoContext } from '../../Context/Todolistcontext';
import './Modalfirsttime.css'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosWarning } from "react-icons/io";

export const Modalfirsttimetutorial = ({oncancel,oncontinue}) => {

  return (
    <>
    <div className='Modalfirsttime_container_ALL'>
        <div className='Modalfirsttime_subcontainer'>
            <div className='Modalfirsttimeexiticon'>
                <br />
                <IoIosWarning className='Modalfirsttime_warning'/>
                <TiDeleteOutline className='exiticon' onClick={oncancel}/>
            </div>
            <div className='Modalfirsttime_description'>
                <p>Parece que aún no has creado ninguna tarea. ¿Te gustaría probar un breve tutorial para aprender a manejar tu lista de tareas (ToDoList)?</p>
            </div>
        </div>
        <div className='Modalfirsttime_buttons'>
        <button onClick={oncontinue} className='Modalfirsttime_btn Modalfirsttime_continue'>Sí</button>
            <button onClick={oncancel} className='Modalfirsttime_btn Modalfirsttime_cancel'>No</button>
        </div>
    </div>
    
    </>
  );
};
