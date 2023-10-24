import React, { useState, useEffect, useContext } from 'react';
import './Todolistapp.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import Modal from './../Modals/Modal';
import { useDarkMode } from '../Modals/DarkModeContext';
import { useNavigate } from "react-router-dom";

export const Todolistapp = () => {
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('islog');
                // Retraso de 0.05 segundos antes del primer toggleDarkMode
                setTimeout(() => {
                  toggleDarkMode();
                  // Retraso de 0.05 segundos antes del segundo toggleDarkMode
                  setTimeout(() => {
                    toggleDarkMode();
                  }, 10);
                }, 10);
    navigate("/ToDoList/loginandregister");
  };

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos, newToDoObj];
    setAllTodos(updatedTodoArr);
    saveTodos(updatedTodoArr);
    setNewDescription('');
    setNewTodoTitle('');
  };

  const saveTodos = (updatedTodos) => {
    if (loggedInUser) {
      const userKey = loggedInUser.EmailR;
      const userSpecificData = JSON.parse(localStorage.getItem(userKey));

      if (userSpecificData) {
        userSpecificData.todos = updatedTodos;
        localStorage.setItem(userKey, JSON.stringify(userSpecificData));
      }
    }
  };

  const saveCompletedTodos = (updatedCompletedList) => {
    if (loggedInUser) {
      const userKey = loggedInUser.EmailR;
      const userSpecificData = JSON.parse(localStorage.getItem(userKey));

      if (userSpecificData) {
        userSpecificData.completedTodos = updatedCompletedList;
        localStorage.setItem(userKey, JSON.stringify(userSpecificData));
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('account'));
    setLoggedInUser(user);

    if (user) {
      const userKey = user.EmailR;
      const userSpecificData = JSON.parse(localStorage.getItem(userKey));

      if (!userSpecificData) {
        localStorage.setItem(userKey, JSON.stringify({ todos: [], completedTodos: [] }));
      } else {
        setAllTodos(userSpecificData.todos);
        setCompletedTodos(userSpecificData.completedTodos);
      }
    }
  }, []);

  const handleToDoDelete = (index) => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    setAllTodos(updatedTodoArr);
    saveTodos(updatedTodoArr);
  };

  const handleCompletedTodoDelete = (index) => {
    let updatedCompletedList = [...completedTodos];
    updatedCompletedList.splice(index, 1);
    setCompletedTodos(updatedCompletedList);
    saveCompletedTodos(updatedCompletedList);
  };

  const handleComplete = (index) => {
    if (loggedInUser) {
      const date = new Date();
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var minutes = date.getMinutes();
      var ss = date.getSeconds();
      var finalDate = dd + '-' + mm + '-' + yyyy + ' a las ' + hh + ':' + minutes + ':' + ss;

      let filteredTodo = {
        ...allTodos[index],
        completedOn: finalDate,
      };

      let updatedCompletedList = [...completedTodos, filteredTodo];
      let updatedTodoArr = allTodos.filter((_, i) => i !== index);

      setCompletedTodos(updatedCompletedList);
      setAllTodos(updatedTodoArr);

      saveCompletedTodos(updatedCompletedList);
      saveTodos(updatedTodoArr);
    }
  };

  //funcion actualizar To do
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTitle, setEditedTitle] = useState(allTodos[editingIndex]?.title || '');
  const [editedDescription, setEditedDescription] = useState(allTodos[editingIndex]?.description || '');


  const handleEdit = (index) => {
  // Establece el índice de edición en el índice de la tarea que se está editando
  setEditingIndex(index);

  // Obtiene los detalles de la tarea que se está editando y establece los valores en los campos de edición
  const todoToEdit = allTodos[index];
  setEditedTitle(todoToEdit.title);
  setEditedDescription(todoToEdit.description);
};





  const handleSaveEdit = (index) => {
    // Crea un objeto actualizado con los valores editados
    const updatedTodo = {
      title: editedTitle,
      description: editedDescription,
    };
  
    // Crea una copia de la lista de tareas pendientes
    const updatedTodoList = [...allTodos];
    // Reemplaza la tarea original con la tarea actualizada
    updatedTodoList[index] = updatedTodo;
  
    // Actualiza el estado con la nueva lista de tareas
    setAllTodos(updatedTodoList);
    saveTodos(updatedTodoList);
  
    // Restablece el índice de edición para detener la edición
    setEditingIndex(-1);
  };

  //funciones modal
    {/* register success functions*/}
    const [editingModalError, SeteditingModalerror]=useState(false);

    const handleModalClose = () => {
      SeteditingModalerror(false);
      // Habilita la interacción con la página nuevamente
    }
  
    const handleContinue = () => {
      SeteditingModalerror(false);
    }
    
  
    {/* register success functions end*/}

    //darkmode:
    const { darkmode, toggleDarkMode } = useDarkMode();

  return (
    <> {editingModalError &&
    <Modal
  modalattributes={{
    modal: '-alert', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: '-alert', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: '-alert', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón.
    anuncementtitle:'¡Ten cuidado!',
    descriptiontext:'No puedes borrar, editar, marcar o como completada una tarea que estas editando', //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalClose}
  onContinue={handleContinue}
/> }

    <div className={darkmode?"container-ALLdark":"container-ALL"}>
      <div className='espace'></div>
      <h1 className='Todolisttitle'>Tu lista maestra</h1>

      <div className={darkmode?"todo-wrapperdark":"todo-wrapper"}>

        <div className="todo-input">
          <div className="todo-input-item">
            <label className='New-to-do-listtitle'>Titulo:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle (e.target.value)}
              placeholder="TITULO"
              className={darkmode?'inputtittledark':'inputtittle'}
            />
          </div>
          <div className="todo-input-item">
            <label className='New-to-do-liststyle-description'>Descripción:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="DESCRIPCION"
              className={darkmode?'inputtittledark':'inputtittle'}
            />
          </div>
          <div className="todo-input-item">
            <button
              className={darkmode?"primary-btndark":"primary-btn"}
              type="button"
              onClick={handleAddNewToDo}
            >
              Añadir
            </button>
          </div>
        </div>
        <div className={darkmode?"btn-areadark":"btn-area"}>
          <button
            className={`${darkmode?"secondaryBtndark":"secondaryBtn"} ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            Pendientes
          </button>
          <button
            className={`${darkmode?"secondaryBtndark":"secondaryBtn"} ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Finalizadas
          </button>
        </div>
        <div className="todo-list">

        {isCompletedScreen === false &&
  allTodos.map((item, index) => (
    <div className={darkmode?"todo-list-itemdark":"todo-list-item"} key={index}>
      {editingIndex === index ? (
                // Mostrar el formulario de edición
                <div className='edit-container'>
                  <div className='edit-container__inputs'>
                    <h5 className={darkmode?'tittleeditdark':'tittleedit'}>titulo:</h5>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className={darkmode?'inputeditdark':'inputedit'}
                  />
                  
                  </div>
                  <div className='edit-container__inputs'>
                  <h5 className={darkmode?'tittleeditdark':'tittleedit'}>descripción:</h5>
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className={darkmode?'inputeditdark':'inputedit'}
                  />
                  </div>
                  <button className={darkmode?"edit-icondark":"edit-icon"} onClick={() => handleSaveEdit(index)}>Guardar</button>
                </div>
              ) : (
                // Mostrar el título y la descripción
                <div>
                  <h3 className={darkmode?'Todotitledark':'Todotitle'}>{item.title}</h3>
                  <p className={darkmode?'Tododesdark':'Tododes'}>{item.description}</p>
                </div>
              )}
              <div className='btn-edit-clear-completed'>
                <button
                  title="Editar"
                  className={darkmode?"edit-icondark":"edit-icon"}
                  //comprueba si seteditingmode esta activado, si esta activado el usuario no podra realizar las
                  //funciones normales que se darian si estuviese desactivado en la tarea que esta editando
                  //el resto de tareas actuaran normal
                  onClick={()=>editingIndex===index?(SeteditingModalerror(true)):(handleEdit(index))}
                >
                  Editar
                </button>
                <AiOutlineDelete
                  title="Delete?"
                  className={darkmode?'icondark':"icon"}
                  onClick={() =>editingIndex===index?(SeteditingModalerror(true)):( handleToDoDelete(index))}
                />
                <BsCheckLg
                  title="Completed?"
                  className="check-icon"
                  onClick={() =>editingIndex===index?(SeteditingModalerror(true)):(  handleComplete(index))}
                />
              </div>
            </div>
          ))
        }

          {isCompletedScreen === true &&
            completedTodos.map ((item, index) => (
              <div className={darkmode?"todo-list-itemdark":"todo-list-item"} key={index}>
                <div className={darkmode?'Todocompleteddark':'Todocompleted'}>
                  <h3 className={darkmode?'completed-taskdark':'completed-task'}>{item.title}</h3>
                  <p className={darkmode?'Tododesdark':'Tododes'}>{item.description}</p>
                  <p className={darkmode?'Tododesdark':'Tododes'}> <i>Completado el: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className={darkmode?'icondark':"icon"}
                    onClick={() => handleCompletedTodoDelete (index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='cerrarsesion'>
        <button onClick={clearLocalStorage} className='cerrarsesion-btn'>Cerrar Sesión</button>
        </div>
    </div>
    </>
  );
}



{/*DOCUMENTACION DEL CODIGO:

Importaciones: Importa las bibliotecas y componentes necesarios, como React y algunos iconos.

Función Todolistapp: Define el componente Todolistapp. Aquí se encuentra toda la funcionalidad de la lista de tareas.

clearLocalStorage: Una función que borra los datos del usuario almacenados en el almacenamiento local y redirige al usuario
 a la página de inicio de sesión (Loginandregister).

Estado: Se definen varios estados utilizando el hook useState para manejar los datos de la aplicación, como el usuario que ha
 iniciado sesión, todas las tareas, nuevas tareas, tareas completadas y si la pantalla muestra tareas completadas o pendientes.

handleAddNewToDo: Agrega una nueva tarea a la lista de tareas. Crea un objeto con el título y la descripción de la nueva tarea, lo agrega a la lista de tareas y luego guarda los cambios en el almacenamiento local.

saveTodos y saveCompletedTodos: Funciones para guardar la lista de tareas y la lista de tareas completadas en el almacenamiento
 local. Utilizan los datos del usuario para almacenar información específica del usuario.

Hook useEffect: Se utiliza para cargar los datos del usuario y sus tareas cuando el componente se monta. También se encarga de
 inicializar las listas de tareas y tareas completadas, o de crearlas si aún no existen.

handleToDoDelete y handleCompletedTodoDelete: Eliminan una tarea de la lista de tareas o la lista de tareas completadas, 
respectivamente. Actualizan el estado y guardan los cambios en el almacenamiento local.

handleComplete: Marca una tarea como completada. Agrega la tarea a la lista de tareas completadas, la elimina de la lista de 
tareas pendientes y guarda los cambios en el almacenamiento local. También registra la fecha y hora en que se completó la tarea.

Renderizado: El componente se renderiza con la interfaz de usuario de la lista de tareas. Incluye campos para ingresar el título
 y la descripción de una nueva tarea, botones para cambiar entre la vista de tareas pendientes y completadas, y listas de tareas 
 pendientes y completadas. También hay botones para eliminar tareas y marcarlas como completadas. El botón "Cerrar Sesión" permite al usuario cerrar la sesión y eliminar sus datos del almacenamiento local.

*/}
