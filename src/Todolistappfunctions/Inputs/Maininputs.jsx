import React, { useState } from 'react';
import { useUser } from '../../Context/Usercontext';
import { Create_Todo } from '../../ServicesApi/Apifecth';
import { useTodoContext } from '../../Context/Todolistcontext';
import './Maininputs.css'

export const Maininputs = () => {
  const { state } = useUser();
  const { currentUser } = state;
  const { addTodo } = useTodoContext(); // Utiliza el hook useTodoContext
  // Estados para los valores del título y la descripción
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Función para manejar el cambio en el input del título
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Función para manejar el cambio en el input de la descripción
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    if (title === '' || description === '') {
      console.log('papi como me vas a dejar eso en blanco???');
    } else {
      const date = new Date();
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var finalDate = yyyy + '-' + mm + '-' + dd;
      //2023-11-11
      console.log(finalDate);
      const todoData = {
        name: title,
        description: description,
        finishDate: finalDate,
        isCompleted: false,
        userId: currentUser._id,
      };
  
      try {
        // Llamar a Create_Todo y esperar la respuesta
        const response = await Create_Todo(todoData);
        addTodo(response.todo); // Agrega el nuevo TODO al contexto
        console.log('Respuesta de la API:', response);
      } catch (error) {
        // Manejar errores, si es necesario
        console.error('Error al enviar la tarea:', error);
      }
  
      // Limpiar los campos después de enviar el formulario
      setTitle('');
      setDescription('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='form_create_todos'>
        <div className='form_container'>
        <label className='form_label'>
          <h6 className='todotitles'>titulo:</h6>
          <input type="text" className='formtodo_inputs' value={title} onChange={handleTitleChange} />
        </label>
        <label className='form_label'>
          <h6 className='todotitles'>Descripcion:</h6>
          <input type="text" className='formtodo_inputs' value={description} onChange={handleDescriptionChange} />
        </label>
        </div>
        <button type="submit">Guardar Tarea</button>
      </form>
    </>
  );
};
