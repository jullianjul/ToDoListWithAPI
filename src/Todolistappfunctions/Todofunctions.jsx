import React, { useState, useEffect } from 'react';
import './Todofunctions.css'
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import { Delete_TODO, Get_TODOS, Update_Todo } from '../ServicesApi/Apifecth';
import { Maininputs } from './Inputs/Maininputs';
import { useTodoContext } from '../Context/Todolistcontext';
import EditForm from './Updatetodo';
import { FaPencil } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";


export const Todofunctions = () => {
  const { dispatch, state } = useUser();
  const { currentUser } = state;
  const {
    todos,
    gettodos,
    currentFilter,
    setCurrentFilter,
    isEditing,
    setIsEditing,
    selectedTodo,
    setSelectedTodo,
    createtodo,
    createtodohandler,
  } = useTodoContext(); // Utiliza el hook useTodoContext

  const [loading, setLoading] = useState(false); // Nuevo estado para indicar carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Get_TODOS(currentUser._id);
        gettodos(response.todos)
      } catch (error) {
        console.error('Error al obtener la lista de TODOS:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser._id]);

  const handleDelete = async (_id) => {
    try {
      gettodos(todos.filter((todo) => todo._id !== _id));
      await Delete_TODO(_id);
      // Actualizar el contexto después de eliminar
    } catch (error) {
      console.error('Error al borrar el TODO:', error);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsEditing(true);
  };

  const handleMarkCompleted = async (todo) => {
    try {
      // Hacer una copia del todo para no mutar el estado directamente
      const updatedTodo = { ...todo, isCompleted: true };
      gettodos(todos.map((t) => (t._id === todo._id ? updatedTodo : t)));
      await Update_Todo(updatedTodo);
      // Actualizar el contexto después de marcar como completada
    } catch (error) {
      console.error('Error al marcar como completada:', error);
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      gettodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
      setIsEditing(false);
      setSelectedTodo(null);
      await Update_Todo(updatedTodo);
      // Actualizar el contexto después de editar
    } catch (error) {
      console.error('Error al actualizar el TODO:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    const titleMatch = todo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const filterCondition = currentFilter === 'pendientes' ? !todo.isCompleted : todo.isCompleted;
    return titleMatch && filterCondition;
  });
  
  

  return (
    <>
     <div className='contenedortotal'>
     <div>
        <div className='Mainbuttons_todolist'>
          <div className='pendingandcompleted-btn'>
            <button onClick={() => setCurrentFilter('pendientes')}>Pendientes</button>
            <button onClick={() => setCurrentFilter('completadas')}>Completadas</button>
          </div>
          <button onClick={createtodohandler} className='activatecreatetodo'>Crear una tarea <FaPencil className='iconpencil' /></button>
          <div className='searcher'>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar por título..."
                className='searcher_input'
              />
              <div className='iconbox'>
                <IoSearchSharp />
              </div>
        </div>
        </div>
        {isEditing && <EditForm todo={selectedTodo} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />}
        <div className='ALLTODOS'>
        {loading ? (
              <p>Cargando...</p>
            ) : (
              filteredTodos.map((todo) => (
                <div key={todo._id} className='todo_container'>
                  <div className='Todo_information'>
                  <h1>{todo.name}</h1>
                  <div>{todo.description}</div>
                  <p>creada el: {todo.finishDate.substring(0, 10)}</p>
                  </div>
                  <div className='Todo_buttons'>
                  <button onClick={() => handleDelete(todo._id)}>Eliminar</button>
                  {!todo.isCompleted && (
                    <>
                      <button onClick={() => handleEdit(todo)}>Editar</button>
                      <button onClick={() => handleMarkCompleted(todo)}>Marcar como Completada</button>
                    </>
                  )}
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
     </div>
    </>
  );
};
