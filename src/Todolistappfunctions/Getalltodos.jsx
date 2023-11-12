import React, { useState, useEffect } from 'react';
import './Todolistapp.css';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import { Delete_TODO, Get_TODOS, Update_Todo } from '../ServicesApi/Apifecth';
import { Maininputs } from './Inputs/Maininputs';
import { useTodoContext } from '../Context/Todolistcontext';
import EditForm from './Updatetodo';

export const Getalltodos = () => {
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
  } = useTodoContext(); // Utiliza el hook useTodoContext

  const name = currentUser.firstName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Get_TODOS(currentUser._id);
        gettodos(response.todos)
      } catch (error) {
        console.error('Error al obtener la lista de TODOS:', error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  const handleDelete = async (_id) => {
    try {
      await Delete_TODO(_id);
      // Actualizar el contexto después de eliminar
      gettodos(todos.filter((todo) => todo._id !== _id));
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
      await Update_Todo(updatedTodo);
      // Actualizar el contexto después de marcar como completada
      gettodos(todos.map((t) => (t._id === todo._id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error al marcar como completada:', error);
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      await Update_Todo(updatedTodo);
      // Actualizar el contexto después de editar
      gettodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
      setIsEditing(false);
      setSelectedTodo(null);
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
      <div>
        <Maininputs />
        <button onClick={() => setCurrentFilter('pendientes')}>Pendientes</button>
        <button onClick={() => setCurrentFilter('completadas')}>Completadas</button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por título..."
        />
        {filteredTodos.map((todo) => (
          <div key={todo._id}>
            <h1>{todo.name}</h1>
            <div>{todo.description}</div>
            <p>{todo.finishDate}</p>
            <button onClick={() => handleDelete(todo._id)}>Eliminar</button>
            {!todo.isCompleted && (
              <>
                <button onClick={() => handleEdit(todo)}>Editar</button>
                <button onClick={() => handleMarkCompleted(todo)}>Marcar como Completada</button>
              </>
            )}
          </div>
        ))}
        {isEditing && <EditForm todo={selectedTodo} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />}
      </div>
    </>
  );
};
