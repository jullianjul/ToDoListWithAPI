import React, { useState } from 'react';
import { useUser } from '../../Context/Usercontext';
import { Create_Todo } from '../../ServicesApi/Apifecth';
import { useTodoContext } from '../../Context/Todolistcontext';
import './Maininputs.css';
import { TiDeleteOutline } from "react-icons/ti";

export const Maininputs = () => {
  const { state } = useUser();
  const { currentUser } = state;
  const { addTodo,createtodohandler } = useTodoContext(); // Utiliza el hook useTodoContext

  // Estados para los valores del título y la descripción
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para indicar carga
  const [inputerror, setInputError]= useState(false);
  const [inputerrorlength, setInputErrorLength]= useState(false);
  // Función para manejar el cambio en el input del título
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setInputError(false)
  };

  // Función para manejar el cambio en el input de la descripción
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setInputError(false)
  };
  const disableinputerror=()=>{
    setInputError(false);
    setInputErrorLength(false);
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    if (title === '' || description === '') {
      console.log('papi como me vas a dejar eso en blanco???');
      setInputError(true);
    }else if(title.length<4 || description.length<4){
      setInputErrorLength(true)
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
      console.log(todoData);

      try {
        // Iniciar la carga
        setLoading(true);

        // Llamar a Create_Todo y esperar la respuesta
        const response = await Create_Todo(todoData);
        
        // Agrega el nuevo TODO al contexto
        addTodo(response.todo);
        console.log('Respuesta de la API:', response);
      } catch (error) {
        // Manejar errores, si es necesario
        console.error('Error al enviar la tarea:', error);
      } finally {
        // Detener la carga después de que la petición se complete (éxito o error)
        setLoading(false);
        createtodohandler();
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
          <div className="buttondiv">
          {inputerror &&    
        <>
          <div className='form_create_todo_inputerror'>
              <p>No puedes crear una tarea con campos vacios</p>
              <TiDeleteOutline className='disableinputerror' onClick={disableinputerror} />
          </div>
        </>
        }
        {inputerrorlength && 
                <div className='form_create_todo_inputerror'>
                    <p>Ambos campos deben tener mas de 3 carácteres</p>
                    <TiDeleteOutline className='disableinputerror' onClick={disableinputerror} />
                </div>
        }
            <TiDeleteOutline onClick={createtodohandler} className='exiticon' />
          </div>
          <div className='form_container_labelinputs'>
          <label className='form_label'>
            <h6 className='todotitles'>Titulo:</h6>
            <input type="text" className='formtodo_inputs' value={title} onChange={handleTitleChange} />
          </label>
          <label className='form_label'>
            <h6 className='todotitles'>Descripcion:</h6>
            <textarea className='formtodo_inputs textareainput' value={description} onChange={handleDescriptionChange} />
          </label>
          </div>
        </div>
        <button type="submit" disabled={loading} className='form_create_todos_button'>
          {loading ? 'Cargando...' : 'Guardar Tarea'}
        </button>
      </form>
    </>
  );
};
