import React, { useState, useEffect } from 'react';
import './Todofunctions.css';
import { useUser } from '../Context/Usercontext';
import { Delete_TODO, Get_TODOS, Update_Todo } from '../ServicesApi/Apifecth';
import { useTodoContext } from '../Context/Todolistcontext';
import EditForm from './Updatetodo';
import { FaPencil } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { FaEdit,FaCheckCircle,FaTrashAlt } from "react-icons/fa";
import { useDarkMode } from '../Context/DarkModeContext';

export const Todofunctions = () => {
  const { darkmode, toggleDarkMode } = useDarkMode();
  const { state } = useUser();
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
    createtodohandler,
    dispatch,
    isloading // Utiliza el dispatch del contexto para enviar acciones al reducer
  } = useTodoContext(); // Utiliza el hook useTodoContext

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({type:'IsLoading'})
        const response = await Get_TODOS(currentUser._id);
        dispatch({ type: 'GET_TODOS', payload: response.todos });
        console.log(response.todos.length)
      } catch (error) {
        console.error('Error al obtener la lista de TODOS:', error);
      }finally{
        dispatch({type:'IsLoading'})
      }
    };

    fetchData();
  }, [currentUser._id]);

  const handleDelete = async (_id) => {
    try {
      dispatch({ type: 'DELETE_TODO', payload: _id });
      await Delete_TODO(_id);
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
      const updatedTodo = { ...todo, isCompleted: true };
      dispatch({ type: 'MARK_COMPLETED', payload: updatedTodo });
      await Update_Todo(updatedTodo);
    } catch (error) {
      console.error('Error al marcar como completada:', error);
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
      setIsEditing(false);
      await Update_Todo(updatedTodo);
    } catch (error) {
      console.error('Error al actualizar el TODO:', error);
    }
  };

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
    {isEditing && <EditForm todo={selectedTodo} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />}
      <div className={'contenedortotal'+' contenedortotal'+darkmode}>
        <div>
          <div className='Mainbuttons_todolist'>
            <div className='pendingandcompleted-btn'>
              <button onClick={() => setCurrentFilter('pendientes')} className={'mainbuttons-btn '+'pending'+currentFilter+' pending'+darkmode+currentFilter}>Pendientes</button>
              <button onClick={() => setCurrentFilter('completadas')} className={'mainbuttons-btn '+'completed'+currentFilter+' completed'+darkmode+currentFilter}>Completadas</button>
            </div>
            <button onClick={() => dispatch({ type: 'TOGGLE_CREATE_TODO' })} className='activatecreatetodo'>
              Crear una tarea <FaPencil className='iconpencil' />
            </button>
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
          <div className={'ALLTODOS'+' ALLTODOS'+darkmode}>
            {isloading ? (
              <div className='loading'>
                <p>Cargando...</p>
              </div>
            ) : (
              filteredTodos.length === 0 ? (
                <div className={'no-todos-message'+' no-todos-message'+darkmode}>
                  <p>No hay tareas que coincidan con la búsqueda o filtro seleccionado.</p>
                </div>
              ) :
              (filteredTodos.map((todo) => (
                <div key={todo._id} className={'todo_container'+' todo_container'+darkmode}>
                  <div className={'Todo_information'+' Todo_information'+darkmode}>
                    <h1 className={'Todo-title t title'+currentFilter+' titletodo'+darkmode}>{todo.name.charAt(0).toUpperCase() + todo.name.slice(1)}</h1>
                    <p className={'todo-description t description'+currentFilter}>{todo.description}</p>
                    {currentFilter==='pendientes' ? <p>creada el: {todo.finishDate.substring(0, 10)}</p>:<p>finalizada el: {todo.finishDate.substring(0, 10)}</p>}
                  </div>
                  <div className='Todo_buttons'>
                    <p onClick={() => handleDelete(todo._id)} className='todo-btn trash'><FaTrashAlt /></p>
                    {!todo.isCompleted && (
                      <>
                        <p onClick={() => handleEdit(todo)} className={'todo-btn edit'+' edit'+darkmode}><FaEdit /></p>
                        <p onClick={() => handleMarkCompleted(todo)} className='todo-btn check'><FaCheckCircle /></p>
                      </>
                    )}
                  </div>
                </div>
              )))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
