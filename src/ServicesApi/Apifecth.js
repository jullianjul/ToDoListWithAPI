import { API_URL_USER, API_URL_USER_AUTH,API_URL_GET_TODOS, API_URL_CREATE_TODOS, API_URL_DELETE_TODOS, API_URL_UPDATE_TODOS } from "./Urlapi";
//FETCH USUARIOS DE LA PLATAFORMA:
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

export const Create_user=(userData)=>{
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

export const Update_user=(userData)=>{
  return fetch(API_URL_USER, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        // Registro exitoso
        console.log('Usuario se ha actualizado con éxito');
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

//FIN FETCH USUARIOS DE LA PLATAFORMA

//Fetch TO DO LIST
export const Get_TODOS = (_id) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL_GET_TODOS + _id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Registro exitoso
          console.log('Se obtuvieron las tareas con éxito');
          resolve(response.json());
          // Puedes realizar otras acciones aquí, como redirigir al usuario
        } else {
          // Si la respuesta es un error, muestra el mensaje de error
          response.json().then((errorData) => {
            console.error('Error en el registro:', errorData.error);
            reject({ error: errorData.error });
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        // Manejar errores, si es necesario
        reject({ error: error.message });
      });
  });
};


export const Create_Todo=(Tododata)=>{
  return fetch(API_URL_CREATE_TODOS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Tododata),
  })
    .then((response) => {
      if (response.ok) {
        // Registro exitoso
        console.log('Todo creada con éxito');
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

export const Delete_TODO = (_id) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL_DELETE_TODOS + _id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Registro exitoso
          console.log('Se elimino la tarea con exito');
          resolve(response.json());
          // Puedes realizar otras acciones aquí, como redirigir al usuario
        } else {
          // Si la respuesta es un error, muestra el mensaje de error
          response.json().then((errorData) => {
            console.error('Error en el registro:', errorData.error);
            reject({ error: errorData.error });
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        // Manejar errores, si es necesario
        reject({ error: error.message });
      });
  });
};

//update todo:

export const Update_Todo=(Tododata)=>{
  return fetch(API_URL_UPDATE_TODOS, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Tododata),
  })
    .then((response) => {
      if (response.ok) {
        // Registro exitoso
        console.log('Todo actualizada con exito con éxito');
        return response.json();
        // Puedes realizar otras acciones aquí, como redirigir al usuario
      } else {
        // Si la respuesta es un error, muestra el mensaje de error
        return response.json().then((errorData) => {
          console.error('Error en la actualización del todo', errorData.error);
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