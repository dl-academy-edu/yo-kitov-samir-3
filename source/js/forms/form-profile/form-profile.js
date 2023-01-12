import {
  activeModalForm,
  renderLinks,
  formValidation,
  getObjDataForm,
  sendRequestForForm,
  onFormSubmission,
  URL
} from '../utils-form.js';

if (document.querySelector('.profile__info')) {
  const wrapButton = document.querySelector('.profile__info');
  const formPassModal = document.querySelector('.editing-pass__form');
  const modalPass = document.querySelector('.editing-pass');
  const formDataModal = document.querySelector('.editing-data__form');
  const modalData = document.querySelector('.editing-data');

  const ITEM_OPEN_PASS_MODAL = 'profile__button--password';
  const ITEM_OPEN_DATA_MODAL = 'profile__button--data';

  wrapButton.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest(`.${ITEM_OPEN_PASS_MODAL}`)) {
      const objRemoveEvent = {
        formPassModal: {
          element: formPassModal,
          event: 'submit',
          callback: onFormSubmission
        }
      };

      activeModalForm(modalPass, objRemoveEvent);

      const optionsRequestSignIn = {
        url: 'api/users',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        modal: modalPass
      };

      formPassModal.addEventListener('submit', onFormSubmission(optionsRequestSignIn, 'validate'));
    }

    if (target.closest(`.${ITEM_OPEN_DATA_MODAL}`)) {
      activeModalForm(modalData);
      formDataModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const dataForm = getObjDataForm(formDataModal);
        console.log(dataForm);
      });
    }
  });

  function formPassSubmission(e) {
    e.preventDefault();
    const form = e.target;

    if (!formValidation(form)) return;

    const formData = getObjDataForm(form);
    console.log(formData);
    //todo
    //продолжить написание логики, пока отвлекусь на регистрацию
  }


}
