import React, { useState } from 'react';
import { useDarkMode } from '../Context/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/Usercontext';
import './Updatemyprofileverification.css'

const Updatemyprofileverification = () => {
  const { isLoggedIn, state,dispatch,formupdateuser,setFormUpdateUser } = useUser();
  const { currentUser } = state;
  const { toggleDarkMode, mostrarFormulario,darkmode } = useDarkMode();
  const navigate = useNavigate();

  // Estados para almacenar la información ingresada por el usuario
  const [password, setPassword] = useState('');
  const[passworderror, setPaswordError]=useState(false);
  const [Updateusermodal,setUpdateusermodal]=useState(false);

  const handleVerification = () => {
    if(password===currentUser.password){
      dispatch({ type: 'VERIFY_USER'});
      setUpdateusermodal(true);
    }else{
      setPaswordError(true);
    }
  };

  return (
    <>
           {Updateusermodal ? ('si'):(
              <div className={'ContainerModaldatapassword' + ' ContainerModaldatapassword' + darkmode}>
              <div className='Modaldatapassword'>
                <button onClick={()=>setFormUpdateUser(false)}>x</button>
                <h1>Porfavor escriba su contraseña para poder modificar a sus datos de usuario</h1>
                <label>Escriba Contraseña actual: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
                <button onClick={handleVerification}>Verificar Identidad</button>
              </div>
            </div>
          
      )}
    </>
  );
}

export default Updatemyprofileverification;
