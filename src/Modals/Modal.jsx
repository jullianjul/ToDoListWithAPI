import React from 'react';
import './Modal.css';
import { AiFillCloseCircle } from 'react-icons/ai';

const Modal = ({ onClose, onContinue, modalattributes }) => {
  return (
    <div className={`modal${modalattributes.modal}`}>
      <div className={`modal-content${modalattributes.content}`}>
        <span className={`close-simbol ${modalattributes.close}`} onClick={onClose}>
          <AiFillCloseCircle />
        </span>
        <div className={`modal-content-container ${modalattributes.container}`}>
          <h2 className={`modal-anuncement${modalattributes.anouncement}`}>
            {modalattributes.anuncementtitle}
          </h2>
          <p className={`modal-anuncement-description${modalattributes.description}`}>
            {modalattributes.descriptiontext}
          </p>
          <button className={`modal-button ${modalattributes.button}`} onClick={onContinue}>
            {modalattributes.buttontext}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

