import {
  activeModal,
  closeModal,
  deletePreloader,
  errorFormHandler,
  formValidation,
  getObjDataForm,
  removeErrorMessages,
  saveDataUser,
  showPreloader,
  removeMarkCorrectInputs
} from '../utils-form.js';

import {activeButtonSubmit} from './utils-form-index.js';

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
  const SELECTOR_BUTTON_CLOSE = 'close-form';

  pageIndex.addEventListener('click', (e) => {
    const target = e.target;

    //форма входа
    if (target.closest(`.${ITEM_OPEN_SIGN_IN_MODAL}`)) {
      activeModal(modalSignIn);
    }

    //форма регистрации
    if (target.closest(`.${ITEM_OPEN_REGISTER_MODAL}`)) {
      const agreementCheckbox = modalRegister.querySelector('input[name=agreement]');
      agreementCheckbox.addEventListener('click', activeButtonSubmit);

      const objRemoveEvent = {
        agreementCheckbox: {
          element: agreementCheckbox,
          event: 'click',
          callback: activeButtonSubmit
        }
      };
      activeModal(modalRegister, objRemoveEvent);

      formRegisterModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;

        if (!formValidation(form)) return;

        const data = getObjDataForm(form);
        showPreloader();

        fetch(`https://academy.directlinedev.com/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
          .then((response) => {
            if (response.ok || response.status === 422) {
              return response.json();
            } else {
              throw new Error(`status: ${response.status}`);
            }
          })
          .then((response) => {
            if (response.success) {
              form.reset();
              removeMarkCorrectInputs(form);
              closeModal(modalRegister, SELECTOR_BUTTON_CLOSE);
            } else {
              throw response;
            }
          })
          .catch((error) => {
            if (error.errors) {
              removeErrorMessages();
              errorFormHandler(error.errors, form);
              return;
            }

            if (error) {
              console.log(error.message);
            }
          })
          .finally(() => deletePreloader());
      });
    }

    //форма сообщения
    if (target.closest(`.${BUTTON_OPEN_MESSAGE_MODAL}`)) {
      activeModal(modalMessage);
    }
  });
}
