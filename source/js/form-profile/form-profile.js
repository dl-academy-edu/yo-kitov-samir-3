import {
  formActive
} from './utils-form-profile.js';

if (document.querySelector('.profile__info')) {
  const wrapButton = document.querySelector('.profile__info');
  const formPass = document.querySelector('.editing-pass__form');
  const formData = document.querySelector('.editing-data__form');

  const HIDDEN = 'hidden';

  wrapButton.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.profile__button--password')) {
      formActive(formPass, HIDDEN);
    }

    if (target.closest('.profile__button--data')) {
      formActive(formData, HIDDEN);
    }
  });
}
