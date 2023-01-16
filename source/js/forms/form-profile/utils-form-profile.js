import {deleteDataUser, renderLinks, URL} from '../utils-form.js';

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
  onSuccessDelete,
  onSuccessFormData,
}
