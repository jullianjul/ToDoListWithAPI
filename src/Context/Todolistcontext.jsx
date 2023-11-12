// TodoContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useUser } from './Usercontext';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const { state } = useUser();
  const { currentUser } = state;
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('pendientes');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const gettodos = (todo) => {
    setTodos(todo);
  };

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        gettodos,
        currentFilter,
        setCurrentFilter,
        isEditing,
        setIsEditing,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
