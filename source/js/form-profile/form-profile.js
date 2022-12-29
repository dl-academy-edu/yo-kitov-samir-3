import {
  formActive
} from './utils-form-profile.js';

import {
  formValidation
} from '../common.js';

if (document.querySelector('.profile__info')) {
  const wrapButton = document.querySelector('.profile__info');
  const formPass = document.querySelector('.editing-pass__form');
  const formData = document.querySelector('.editing-data__form');

  const HIDDEN = 'hidden';

  wrapButton.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.profile__button--password')) {
      const objRemoveEvent = {
        formPass: {
          element: formPass,
          event: 'submit',
          callback: formPassSubmission
        }
      };
      formActive(formPass, HIDDEN, objRemoveEvent);

      formPass.addEventListener('submit', formPassSubmission);
    }

    if (target.closest('.profile__button--data')) {
      formActive(formData, HIDDEN);
    }
  });

  function formPassSubmission(e) {
    e.preventDefault();
    const form = e.target;

    if (!formValidation(form)) {
      return;
    }
  }
}

