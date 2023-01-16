import {
  activeModalForm,
  onFormSubmission,
  sendRequestForForm
} from '../utils-form.js';

import {
  onSuccessDelete,
  onSuccessFormData
} from './utils-form-profile.js';

const pageProfile = document.querySelector('.page-profile--js');

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
