const URL = 'https://academy.directlinedev.com/';

function closeModal(modal, selectorButtonClose) {
  const button = modal.querySelector(`.${selectorButtonClose}`);
  button.click();
}

function activeModal(modal, objEvent, selectorButtonCloseModal = 'close-form', selectorHiddenModal = 'hidden') {
  modal.classList.remove(selectorHiddenModal);

  const forms = [...modal.querySelectorAll('form')];
  const formActive = forms.find((form) => {
    return !form.classList.contains(selectorHiddenModal);
  });
  formActive.querySelector('input')
            .focus();

  const buttonCloseForm = modal.querySelector(`.${selectorButtonCloseModal}`);
  buttonCloseForm.addEventListener('click', closePopupButtonClick);

  document.addEventListener('keyup', closePopupKeyup);

  //вспомогательные функции
  function closePopupButtonClick() {
    modal.classList.add(selectorHiddenModal);

    this.removeEventListener('click', closePopupButtonClick);
    modal.removeEventListener('keyup', closePopupKeyup);

    removeHandlers(objEvent);
  }

  function closePopupKeyup(e) {
    if (e.code === 'Escape') {
      modal.classList.add(selectorHiddenModal);

      document.removeEventListener('keyup', closePopupKeyup);
      buttonCloseForm.removeEventListener('click', closePopupButtonClick);

      removeHandlers(objEvent);
    }
  }
}

function removeHandlers(objEvent) {
  if (objEvent) {
    Object.keys(objEvent)
          .forEach((nameElement) => {
            objEvent[nameElement].element.removeEventListener(`${objEvent[nameElement].event}`, objEvent[nameElement].callback);
          });
  }
}

function renderLinks(selectorHiddenItem = 'hide-completely') {
  const itemSign = document.querySelector('.header__item--sign-in-js');
  const itemRegister = document.querySelector('.header__item--register-js');
  const itemProfile = document.querySelector('.header__item--profile-js');

  if (localStorage.token) {
    itemSign.classList.add(selectorHiddenItem);
    itemRegister.classList.add(selectorHiddenItem);
    itemProfile.classList.remove(selectorHiddenItem);
  } else {
    itemSign.classList.remove(selectorHiddenItem);
    itemRegister.classList.remove(selectorHiddenItem);
    itemProfile.classList.add(selectorHiddenItem);
  }
}

function formValidation(form, {
  regularEmail = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
  regularPhone = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g
} = {}) {
  //получаем все инпуты формы
  const inputs = [...form.elements];

  //создаём пустой рбъект ошибок
  let errors = {};

  //если сообщения с ошибкой гдето есть то удаляем их
  removeErrorMessages();

  //перебираем все полученные инпуты
  inputs.forEach((input) => {
    //если у инпута есть атрибут 'required' то значит этот инпут надо проверить
    //и мы его проверяем
    if (input.hasAttribute('required')) {
      //проверка инпутов будет зависить от их типа
      //поэтому мы проверяем тип инпута
      switch (input.type) {
        //если тип инпута радио
        case 'radio':
          //тогда мы находим в форме все радио с таким же именем
          // и при помощи метода 'find' ищем первый попавшийся выбранный инпут радио
          const inputsRadio = [...form.elements[input.name]].find((radio) => radio.checked);
          //если метод find не нашел ни одного выбраного инпута радио
          //то мы складываем в объект ошибок: имя инпута(в качестве свойства), сам инпут
          //и сообщение об ошибке в качестве значения
          if (!inputsRadio) {
            errors[input.name] = {input: input, message: 'Choose one of the values'};
          } else {
            //если метод find нашел выбранный инпут радио, тогда мы проверяем устраивает ли нас
            //его значение, и если нет, то мы складываем в объект ошибок: имя инпута(в качестве свойства), сам инпут
            //и сообщение об ошибке в качестве значения
            if (inputsRadio.value !== 'yes') {
              errors[input.name] = {input: input, message: 'Choose another value'};
            }
          }
          break;

        //если тип инпута email
        case 'email':
          //тогда мы проверяем его значение регулярным выражением, и если проверка не прошла
          //мы складываем в объект ошибок: имя инпута(в качестве свойства), сам инпут
          //и сообщение об ошибке в качестве значения
          if (!input.value.match(regularEmail)) {
            errors[input.name] = {
              input: input,
              message: 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
            };
          }
          break;

        //здесь тоже самое что и с email только tel
        case 'tel':
          if (!input.value.match(regularPhone)) {
            errors[input.name] = {
              input: input,
              message: 'Please enter a valid phone (your entry is not in the format "+7-9xx-xxx-xx-xx" or "8-9xx-xxx-xx-xx")'
            };
          }
          break;

        //здесь проверяем все остальные инпуты на пустую строку, и если значение пустая строка
        //то мы складываем в объект ошибок: имя инпута(в качестве свойства), сам инпут
        //и сообщение об ошибке в качестве значения
        default:
          if (!input.value.length) {
            errors[input.name] = {input: input, message: 'This field is required'};
          }
      }
    }
  });


  return errorFormHandler(errors, form);
}

//Эта функция похожа на formValidation и их можно было объединить в одну, но есть формы
//которые не надо валидировать, а надо собрать только данные, поэтому было принято решение
//вынести сбор данных в отдельную функцию
function getObjDataForm(form) {
  const inputs = [...form.elements];

  let data = {};

  inputs.forEach((input) => {
    if (input.localName === 'button' || input.localName === 'fieldset') return;

    switch (input.type) {
      case 'radio':
        const inputsRadio = [...form.elements[input.name]].find((radio) => radio.checked);
        data[input.name] = inputsRadio.value || '';
        break;

      case 'file':
        data[input.name] = input.files[0] || '';
        break;

      default:
        data[input.name] = input.value || '';
    }
  });

  return data;
}

function errorFormHandler(error, form) {
  //проверяем есть ли у нас ошибки
  if (Object.keys(error).length) {
    //если есть то берём каждый инпут и показываем под его родителем сообщение об ошибке
    //при помощи самописной функции 'showMessage'
    Object.keys(error)
          .forEach(key => {
            const message = createErrorMessage(error[key].message || error[key]);
            showMessage(form.elements[key], message);
          });
    //и после показа соощений выходим из функции и возвращяем false
    return false;
  }
  //если объект ошибок пуст то выходим из функции и возвращаем true
  return true;
}

function createErrorMessage(text = '') {
  const div = document.createElement('div');
  const p = document.createElement('p');

  div.classList.add('error-message');
  p.textContent = text;

  div.append(p);
  return div;
}

function showMessage(target, message) {
  if (target.length) {
    target[0].parentElement.classList.add('input-default--invalid-js');
    target[0].parentElement.after(message);
    return;
  }

  target.classList.add('input-default--invalid-js');
  target.parentElement.after(message);
}

function removeErrorMessages() {
  const errors = document.querySelectorAll('.error-message');
  const errorsInputs = document.querySelectorAll('.input-default--invalid-js');

  if (errorsInputs) {
    [...errorsInputs].forEach((input) => input.classList.remove('input-default--invalid-js'));
  }

  if (errors) {
    [...errors].forEach((message) => message.remove());
  }
}

function saveDataUser(data) {
  localStorage.userId = data.id;
  localStorage.token = data.token;
}

function formRequest(url, options) {
  return fetch(url, options);
}

function createPreloader() {
  const div = document.createElement('div');
  const innerDiv = document.createElement('div');

  div.classList.add('preloader');
  div.append(innerDiv);

  innerDiv.classList.add('preloader__inner');
  return div;
}

function showPreloader() {
  document.body.append(createPreloader());
}

function deletePreloader() {
  const preloader = document.querySelector('.preloader');
  preloader.remove();
}

export {
  formValidation,
  createErrorMessage,
  errorFormHandler,
  showMessage,
  removeErrorMessages,
  getObjDataForm,
  activeModal,
  renderLinks,
  formRequest,
  closeModal,
  saveDataUser,
  showPreloader,
  deletePreloader,
  URL
};
