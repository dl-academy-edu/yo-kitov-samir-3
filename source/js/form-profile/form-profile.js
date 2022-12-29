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

      formPass.addEventListener('submit', formSubmission);
    }

    if (target.closest('.profile__button--data')) {
      formActive(formData, HIDDEN);
    }
  });
}
const SELECTOR_ERROR = 'error-message';

function formSubmission(e) {
  e.preventDefault();
  const form = e.target;
  const inputsRequired = getRequiredInputs(form);

  // if (inputsRequired) {
  //   console.log(inputsRequired);
  // }

  const inputs = [...form.elements];

  let errors = {};

  removeErrorMessages(SELECTOR_ERROR);

  inputs.forEach((input) => {
    if (input.hasAttribute('required')) {
      switch (input.type) {
        case 'radio':
          const inputsRadio = [...form.elements[input.name]].find((radio) => radio.checked);

          if (!inputsRadio) {
            errors[input.name] = {input: input, message: 'Choose one of the values'};
          } else {
            if (inputsRadio.value !== 'yes') {
              errors[input.name] = {input: input, message: 'Choose another value'};
            }
          }
          break;

        case 'email':
          if (!input.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)) {
            errors[input.name] = {
              input: input,
              message: 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
            };
          }
          break;

        case 'tel':
          if (input.value.match(/(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g)) {

          }
          break;

        default:
          if (!input.value.length) {
            errors[input.name] = {input: input, message: 'This field is required'};
          }
      }


    }
  });

  if (Object.keys(errors).length) {
    Object.keys(errors)
          .forEach((name) => {
            const message = createErrorMessage(errors[name].message, SELECTOR_ERROR);
            showMessage(errors[name].input, message);
            errors[name];
          });

  }

  console.log(errors);
}

function getObjErrors(inputs) {

}

function createErrorMessage(text = '', selectorError) {
  const div = document.createElement('div');
  const p = document.createElement('p');

  div.classList.add(selectorError);
  p.textContent = text;

  div.append(p);
  return div;
}

function showMessage(target, message) {
  target.parentElement.after(message);
}

function removeErrorMessages(selectorError) {
  const errors = document.querySelectorAll(`.${selectorError}`);

  if (errors) {
    [...errors].forEach((message) => message.remove());
  }
}

function getRequiredInputs(form) {
  const inputs = [...form.elements].filter((input) => {
    return input.hasAttribute('required');
  });

  return inputs.length > 0 ? inputs : null;
}
