export const initialState = {
    isLoggedIn: false,
    currentUser: null,
    credentialsError: false,
    isVerified:false,
};
  
export const userReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          currentUser: action.payload,
          credentialsError: false,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          credentialsError: true,
        };
      case 'VERIFY_USER':
        return{
          ...state,
          isVerified:action.payload
        }
      case 'UPDATE_USER':
        return {
          ...state,
          currentUser:action.payload
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
};