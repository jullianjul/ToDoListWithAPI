import { API_URL_USER, API_URL_USER_AUTH } from "./Urlapi";
import { API_URL_USER_AUTH } from "./Urlapi";

export const User_Auth = (userData) => {
  return fetch(API_URL_USER_AUTH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        // Registro exitoso
        console.log('Usuario registrado con éxito');
        return response.json();
        // Puedes realizar otras acciones aquí, como redirigir al usuario
      } else {
        // Si la respuesta es un error, muestra el mensaje de error
        return response.json().then((errorData) => {
          console.error('Error en el registro:', errorData.error);
          return { error: errorData.error };
        });
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
      // Manejar errores, si es necesario
      return { error: error.message };
    });
};

export const Create_user=()=>{
  return fetch(API_URL_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        // Registro exitoso
        console.log('Usuario registrado con éxito');
        return response.json();
        // Puedes realizar otras acciones aquí, como redirigir al usuario
      } else {
        // Si la respuesta es un error, muestra el mensaje de error
        return response.json().then((errorData) => {
          console.error('Error en el registro:', errorData.error);
          return { error: errorData.error };
        });
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
      // Manejar errores, si es necesario
      return { error: error.message };
    });

}
