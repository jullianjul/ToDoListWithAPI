// EditForm.jsx
import React, { useState } from 'react';
import './Updatetodo.css'
import { TiDeleteOutline } from "react-icons/ti";
import { useDarkMode } from '../../Context/DarkModeContext';

const EditForm = ({ todo, onUpdate, onCancel }) => {
  const { darkmode, toggleDarkMode } = useDarkMode();
  const [title, setTitle] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [editerror, setEditError]= useState(false);

  const handleUpdate = () => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var finalDate = yyyy + '-' + mm + '-' + dd;
    if(title.length>3 && description.length>3){
      const updatedTodo = { ...todo, name: title, description, finishDate:finalDate,};
      onUpdate(updatedTodo);
    }else{
      setEditError(true);
    }
  };
  const editinghandler=()=>{
    setEditError(false)
  }

  return (
    <div className={'edit-container-all'+' edit-container-all'+darkmode}>
      <div className={'edit-subcontainer'+' edit-subcontainer'+darkmode}>
          <div className={'edit-exitbutton-container'+' edit-exitbutton-container'+darkmode}>
            {editerror &&   
          <div className='form_create_todo_inputerror'>
              <p>Todos los campos deben tener más de 3 carácteres</p>
              <TiDeleteOutline className='disableinputerror' onClick={editinghandler} />
         </div>
            }
            <TiDeleteOutline className='exiticon' onClick={onCancel} />
          </div>
        <div className={'edit-sub-subcontainer'+' edit-sub-subcontainer'+darkmode}>
        <div className='edit-labels'>
            <label className='edit-label'>
              <p className={'todotitles'+' todotitles'+darkmode}>Nuevo título:</p>
              <input type="text" value={title} className='edit-input' onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className='edit-label'>
              <p className={'todotitles'+' todotitles'+darkmode}>Nueva descripción:</p>
              <textarea type="text" className='edit-input edit-textarea' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
        </div>
      </div>
      <div className='edit-buttons'>
            <button onClick={handleUpdate} className={'edit-btn editactu'+' editactu'+darkmode}>Actualizar Tarea</button>
            <button onClick={onCancel} className={'edit-btn editcancel'+' editcancel'+darkmode}>Cancelar</button>
          </div>
    </div>
  );
};

export default EditForm;
