import {openPopupButtonClick, closePopupKeyup} from './utils-form-profile.js';

if (document.querySelector('.profile__info')) {
  const wrapButton = document.querySelector('.profile__info');
  const formPass = document.querySelector('.editing-pass__form');
  const formData = document.querySelector('.editing-data__form');

  const HIDDEN = 'hidden';

  wrapButton.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.profile__button--password')) {
      openPopupButtonClick(formPass, HIDDEN);
    }

    if (target.closest('.profile__button--data')) {
      openPopupButtonClick(formData, HIDDEN);
    }

    document.addEventListener('keyup', closePopupKeyup(HIDDEN));
  });


}

//
// function closePopupKeyboard() {
//   return function () {
//     const
//   }
// }
