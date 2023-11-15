// TodoContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from './Usercontext';
import { todoReducer, initialState } from '../Reducer/useReducertodo';
import { Get_TODOS } from '../ServicesApi/Apifecth';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const { state } = useUser();
  const [statet, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (newTodo) => {
    dispatch({ type: 'CREATE_TODO', payload: newTodo });
  };

  const gettodos = (todos) => {
    dispatch({ type: 'GET_TODOS', payload: todos });
  };

  const createtodohandler = () => {
    dispatch({ type: 'TOGGLE_CREATE_TODO' });
  };

  const setCurrentFilter = (filter) => {
    dispatch({ type: 'SET_CURRENT_FILTER', payload: filter });
  };

  const setIsEditing = (editing) => {
    dispatch({ type: 'SET_EDIT_MODE', payload: editing });
  };

  const setSelectedTodo = (todo) => {
    dispatch({ type: 'SET_SELECTED_TODO', payload: todo });
  };

  // Otras funciones según sea necesario

  return (
    <TodoContext.Provider
      value={{
        todos: statet.todos,
        addTodo,
        gettodos,
        currentFilter: statet.currentFilter,
        setCurrentFilter,
        isEditing: statet.isEditing,
        setIsEditing,
        selectedTodo: statet.selectedTodo,
        setSelectedTodo,
        createtodo: statet.createtodo,
        createtodohandler,
        isloading: statet.isloading,
        dispatch
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
