import {
  activeModalForm,
  onFormSubmission,
  sendRequestForForm,
} from '../utils-form.js';

import {
  accessToSubmitButton,
  resolveFormSignIn,
  onSuccessDelete,
  onSuccessFormData
} from './utils-form-index.js';


const pageIndex = document.querySelector('.page-index--js');
const pageProfile = document.querySelector('.page-profile--js');

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
        url: '/api/users/login',
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
        url: '/api/users',
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
        url: '/api/emails',
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

if (pageProfile) {
  const formPasswordModal = document.querySelector('.editing-pass__form');
  const modalPassword = document.querySelector('.editing-pass');
  const formDataModal = document.querySelector('.editing-data__form');
  const modalData = document.querySelector('.editing-data');

  const BUTTON_OPEN_PASSWORD_MODAL = 'profile__button--password-js';
  const BUTTON_OPEN_DATA_MODAL = 'profile__button--data-js';
  const BUTTON_DELETE_USER = 'profile__button--delete-js';

  const optionsRequestUser = {
    url: `/api/users/${localStorage.userId}`,
  };
  sendRequestForForm(optionsRequestUser, 'GET', onSuccessFormData);

  pageProfile.addEventListener('click', (e) => {
    const target = e.target;

    //форма смены пароля
    if (target.closest(`.${BUTTON_OPEN_PASSWORD_MODAL}`)) {
      const objRemoveEvent = {
        formPasswordModal: {
          element: formPasswordModal,
          event: 'submit',
          callback: onFormSubmission
        }
      };

      activeModalForm(modalPassword, objRemoveEvent);

      const optionsRequestPassword = {
        url: '/api/users',
        method: 'PUT',
        headers: {
          'x-access-token': `${localStorage.token}`,
          'Content-Type': 'application/json;charset=utf-8'
        },
        modal: modalPassword,
      };

      formPasswordModal.addEventListener('submit', onFormSubmission(optionsRequestPassword));
    }

    //форма смены данных пользователя
    if (target.closest(`.${BUTTON_OPEN_DATA_MODAL}`)) {
      const objRemoveEvent = {
        formDataModal: {
          element: formDataModal,
          event: 'submit',
          callback: onFormSubmission
        }
      };

      activeModalForm(modalData, objRemoveEvent);

      const optionsRequestData = {
        url: '/api/users',
        method: 'PUT',
        headers: {
          'x-access-token': `${localStorage.token}`,
        },
        modal: modalData,
        typeBody: 'formData'
      };

      formDataModal.addEventListener('submit', onFormSubmission(optionsRequestData, '', onSuccessFormData));

    }

    //удаление аккаунта пользователя
    if (target.closest(`.${BUTTON_DELETE_USER}`)) {
      const optionsRequestUser = {
        url: `/api/users/${localStorage.userId}`,
        headers: {
          'x-access-token': `${localStorage.token}`,
          'Content-Type': 'application/json;charset=utf-8'
        }
      };
      sendRequestForForm(optionsRequestUser, 'DELETE', onSuccessDelete);
    }
  });
}
