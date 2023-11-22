// EditForm.jsx
import React, { useState } from 'react';
import './Updatetodo.css'
import { TiDeleteOutline } from "react-icons/ti";
import { useDarkMode } from '../../Context/DarkModeContext';

const EditForm = ({ todo, onUpdate, onCancel }) => {
  const { darkmode, toggleDarkMode } = useDarkMode();
  const [title, setTitle] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [finishDate, setFinishDate] = useState(todo.finishDate.substring(0, 10));
  const [editerror, setEditError]= useState(false);

  const handleUpdate = (event) => {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    if(title.length>3 && description.length>3 && !finishDate==''){
      const updatedTodo = { ...todo, name: title, description, finishDate,};
      onUpdate(updatedTodo);
    }else{
      setEditError(true);
    }
  };
  const editinghandler=()=>{
    setEditError(false)
  }

  return (
    <form onSubmit={handleUpdate} className={'edit-container-all'+' edit-container-all'+darkmode}>
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
            <label className='edit-label'>
              <p className={'todotitles' + ' todotitles' + darkmode}>Nueva fecha de finalización:</p>
              <input type="date" value={finishDate} className='edit-input' onChange={(e) => setFinishDate(e.target.value)} />
            </label>
          </div>
        </div>
      </div>
      <div className='edit-buttons'>
            <button type='submit' className={'edit-btn editactu'+' editactu'+darkmode}>Actualizar Tarea</button>
            <button onClick={onCancel} className={'edit-btn editcancel'+' editcancel'+darkmode}>Cancelar</button>
          </div>
    </form>
  );
};

export default EditForm;
