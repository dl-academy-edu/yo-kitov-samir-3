import {
  saveDataUser,
} from './forms/utils-form.js';

const URL = 'https://academy.directlinedev.com';

const SELECTOR_AGREEMENT_CHECKBOX = 'input[name=agreement]';
const SELECTOR_BUTTON_SUBMIT = 'button[type=submit]';

function activeButtonSubmit(e) {
  const target = e.target;
  const form = target.form;
  const buttonSubmit = form.querySelector(SELECTOR_BUTTON_SUBMIT);
  buttonSubmit.disabled = !target.checked;
}

function accessToSubmitButton(form) {
  const agreementCheckbox = form.querySelector(SELECTOR_AGREEMENT_CHECKBOX);
  if (agreementCheckbox) {
    const buttonSubmit = form.querySelector(SELECTOR_BUTTON_SUBMIT);
    buttonSubmit.disabled = true;
    agreementCheckbox.addEventListener('click', activeButtonSubmit);

    return {
      agreementCheckbox: {
        element: agreementCheckbox,
        event: 'click',
        callback: activeButtonSubmit
      }
    };
  }
}

function resolveFormSignIn(data) {
  saveDataUser(data);
  renderLinks();
}

function getNumbersFromString(str) {
  return str.match(/(\d+(\.\d+)?)/g)
            .map(v => +v);
}

function changesUserData(dataUser, type = 'fill') {
  const profile = document.querySelector('.profile--js');
  const img = profile.querySelector('.profile__img--js');
  const name = profile.querySelector('.profile__value--name-js');
  const surname = profile.querySelector('.profile__value--surname-js');
  const email = profile.querySelector('.profile__value--email-js');
  const location = profile.querySelector('.profile__value--location-js');
  const age = profile.querySelector('.profile__value--age-js');

  if (type === 'fill' && dataUser) {
    name.textContent = dataUser.name;
    surname.textContent = dataUser.surname;
    email.textContent = dataUser.email;
    location.textContent = dataUser.location;
    age.textContent = dataUser.age;
    img.src = `${URL}${dataUser.photoUrl}`;
    return;
  }

  name.textContent = '';
  surname.textContent = '';
  email.textContent = '';
  location.textContent = '';
  age.textContent = '';
  img.src = './img/svg/no-photo.svg';
}

function renderLinks(selectorHiddenItem = 'hide-completely') {
  const itemSign = document.querySelector('.header__item--sign-in-js');
  const itemRegister = document.querySelector('.header__item--register-js');
  const itemProfile = document.querySelector('.header__item--profile-js');
  const itemSignOut = document.querySelector('.header__item--sign-out-js');

  if (localStorage.token) {
    itemSign.classList.add(selectorHiddenItem);
    itemRegister.classList.add(selectorHiddenItem);
    itemProfile.classList.remove(selectorHiddenItem);
    itemSignOut.classList.remove(selectorHiddenItem);
  } else {
    itemSign.classList.remove(selectorHiddenItem);
    itemRegister.classList.remove(selectorHiddenItem);
    itemProfile.classList.add(selectorHiddenItem);
    itemSignOut.classList.add(selectorHiddenItem);
  }
}

export {
  accessToSubmitButton,
  resolveFormSignIn,
  getNumbersFromString,
  changesUserData,
  renderLinks,
  URL
};
