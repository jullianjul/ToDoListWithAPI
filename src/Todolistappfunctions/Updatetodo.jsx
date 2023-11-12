// EditForm.jsx
import React, { useState } from 'react';

const EditForm = ({ todo, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = () => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var finalDate = yyyy + '-' + mm + '-' + dd;
    const updatedTodo = { ...todo, name: title, description, finishDate:finalDate,};
    onUpdate(updatedTodo);
  };

  return (
    <div>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Descripción:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdate}>Actualizar Tarea</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditForm;
