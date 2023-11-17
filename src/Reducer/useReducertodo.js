export const initialState = {
    todos: [],
    currentFilter: 'pendientes',
    isEditing: false,
    selectedTodo: null,
    createtodo: false,
    isloading:true,
    
};

export const todoReducer = (statet, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...statet,
                todos: action.payload,
            };

        case 'CREATE_TODO':
            return {
                ...statet,
                todos: [...statet.todos, action.payload],
            };

        case 'UPDATE_TODO':
            return {
                ...statet,
                todos: statet.todos.map(todo =>
                    todo._id === action.payload._id ? action.payload : todo
                ),
            };

        case 'DELETE_TODO':
            return {
                ...statet,
                todos: statet.todos.filter(todo => todo._id !== action.payload),
            };

        case 'MARK_COMPLETED':
            return {
                ...statet,
                todos: statet.todos.map(todo =>
                    todo._id === action.payload._id ? action.payload : todo
                ),
            };

        case 'TOGGLE_CREATE_TODO':
            return {
                ...statet,
                createtodo: !statet.createtodo,
            };

        case 'SET_EDIT_MODE':
            return {
                ...statet,
                isEditing: action.payload,
            };

        case 'SET_SELECTED_TODO':
            return {
                ...statet,
                selectedTodo: action.payload,
            };

        case 'SET_CURRENT_FILTER':
            return {
                ...statet,
                currentFilter: action.payload,
            };
        case 'IsLoading':
                return {
                    ...statet,
                    isloading: action.payload,
                };

        default:
            return statet;
    }
};
