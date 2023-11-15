export const initialState = {
    todos:[],

};
  
export const todoReducer = (statet, action) => {
    switch (action.type) {
      case 'GET_TODOS':
        return {

        };
      case 'CREATE_TODOS':
        return {

        };
      case 'UPDATE_TODOS':
        return {

        };
      case 'MARKCOMPLETED':
        return {

        };
      default:
        return statet;
    }
};