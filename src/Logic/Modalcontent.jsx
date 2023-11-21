import React, { useEffect, useState } from 'react';
import Modal from '../Modals/Modal';

const Modalcontent = ({
    registersuccess,
    registerblank,
    Emailalreadyregister,
    Requireddataincorrect,
    hasErrorR,
    Onexit,
    Oncontinue,
  }) => {
    const [modalAttributes, SetModalAttributes] = useState({
      modal: '',
      content: '',
      close: '',
      container: '',
      anouncement: 'useroremail_alert',
      description: 'useroremail_alert_description',
      button: '',
      anuncementtitle: "¡No puedes dejar areas en blanco!",
      descriptiontext:
        "Has intentado ingresar dejando areas en blanco, porfavor llene todo el formulario antes de continuar",
      buttontext: "Continuar",
    });
  
    useEffect(() => {
      if (registersuccess) {
        SetModalAttributes((prevState) => ({
          ...prevState,
          anouncement: '',
          description: '',
          anuncementtitle: "¡Bienvenido!",
          descriptiontext: "Te has registrado, dale click a continuar para iniciar sesión",
        }));
      } else if (registerblank) {
        SetModalAttributes((prevState) => ({
          ...prevState,
          anuncementtitle: "¡No puedes dejar areas en blanco!",
          descriptiontext:
            "Has intentado ingresar dejando areas en blanco, porfavor llene todo el formulario antes de continuar",
            buttontext: "Ok",
        }));
      } else if (Emailalreadyregister === true) {
        SetModalAttributes((prevState) => ({
          ...prevState,
          anuncementtitle: "¡Email en uso!",
          descriptiontext: "Usted ya esta registrado en la plataforma, porfavor inicie sesión",
          buttontext: "Ok",
        }));
      } else if (Requireddataincorrect) {
        SetModalAttributes((prevState) => ({
          ...prevState,
          anuncementtitle: "ups, Algo salio mal :c",
          descriptiontext: `lo sentimos parece estamos teniendo errores y trabajamos para solucionarlos`,
          buttontext: "Ok",
        }));
      } else if (hasErrorR) {
        SetModalAttributes((prevState) => ({
          ...prevState,
          anuncementtitle: "Error Al Registrarse",
          descriptiontext: `porfavor ingrese bien los campos, no debe quedar ni un solo campo en rojo ;)`,
          buttontext: "Ok",
        }));
      }
    }, [registersuccess, registerblank, Emailalreadyregister, Requireddataincorrect, hasErrorR]);
  
    return (
      <Modal
        modalattributes={modalAttributes}
        onClose={Onexit}
        onContinue={Oncontinue}
      />
    );
  };
  
  export default Modalcontent;