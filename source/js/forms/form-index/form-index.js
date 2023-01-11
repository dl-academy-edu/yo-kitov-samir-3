import {
  activeModalForm,
  closeModalForm,
  MODAL_CLOSE_BUTTON_SELECTOR,
  formValidation,
  getObjDataForm,
  sendRequestForForm,
  onFormSubmission,
  renderLinks,
  clearForm,
  saveDataUser,
  showPreloader,
  deletePreloader,
  URL,

  createModalMessage,
  showModalMessage,
  removeLaterModalMessage,
  MODAL_MESSAGE_TEXT_ERROR,
  MODAL_MESSAGE_INVALID,
  MODAL_MESSAGE_TEXT_SUCCESS,
  MODAL_MESSAGE_VALID,
} from '../utils-form.js';

import {
  accessToSubmitButton,
  resolveFormSignIn
} from './utils-form-index.js';

const pageIndex = document.querySelector('.page-index--js');

if (pageIndex) {
  const formSignInModal = document.querySelector('.sign-in__form');
  const modalSignIn = document.querySelector('.sign-in');
  const formRegisterModal = document.querySelector('.register__form');
  const modalRegister = document.querySelector('.register');
  const formMessageModal = document.querySelector('.message__form');
  const modalMessage = document.querySelector('.message');

  const ITEM_OPEN_SIGN_IN_MODAL = 'header__item--sign-in-js';
  const ITEM_OPEN_REGISTER_MODAL = 'header__item--register-js';
  const BUTTON_OPEN_MESSAGE_MODAL = 'footer__message-button--js';

  pageIndex.addEventListener('click', (e) => {
    const target = e.target;

    //форма входа
    if (target.closest(`.${ITEM_OPEN_SIGN_IN_MODAL}`)) {
      const objRemoveEvent = {
        formSignInModal: {
          element: formSignInModal,
          event: 'submit',
          callback: onFormSubmission
        }
      };

      activeModalForm(modalSignIn, objRemoveEvent);

      const optionsRequestSignIn = {
        url: 'api/users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        modal: modalSignIn
      };

      formSignInModal.addEventListener('submit', onFormSubmission(optionsRequestSignIn, 'validate', resolveFormSignIn));
    }

    //форма регистрации
    if (target.closest(`.${ITEM_OPEN_REGISTER_MODAL}`)) {
      const objEventButtonSubmit = accessToSubmitButton(formRegisterModal);

      const objRemoveEvent = {
        ...objEventButtonSubmit,
        formRegisterModal: {
          element: formRegisterModal,
          event: 'submit',
          callback: onFormSubmission
        }
      };

      activeModalForm(modalRegister, objRemoveEvent);

      const optionsRequestRegister = {
        url: 'api/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        modal: modalRegister,
      };

      formRegisterModal.addEventListener('submit', onFormSubmission(optionsRequestRegister));
    }

    //форма сообщения
    if (target.closest(`.${BUTTON_OPEN_MESSAGE_MODAL}`)) {
      const objEventButtonSubmit = accessToSubmitButton(formMessageModal);

      const objRemoveEvent = {
        ...objEventButtonSubmit,
        formMessageModal: {
          element: formMessageModal,
          event: 'submit',
          callback: onFormSubmission
        }
      };

      activeModalForm(modalMessage, objRemoveEvent);

      const optionsRequestSignIn = {
        url: 'api/emails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        modal: modalMessage,
        extendedData: true
      };

      formMessageModal.addEventListener('submit', onFormSubmission(optionsRequestSignIn, 'validate'));
    }
  });
}
