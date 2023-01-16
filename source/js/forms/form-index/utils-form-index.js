import {renderLinks, saveDataUser, deleteDataUser, URL} from '../utils-form.js';

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

function onSuccessDelete(data) {
  changesUserData(data, '');
  location.pathname = '/';
  deleteDataUser();
  renderLinks();
}

function onSuccessFormData(data) {
  changesUserData(data);
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

export {
  accessToSubmitButton,
  resolveFormSignIn,
  onSuccessDelete,
  onSuccessFormData
};
