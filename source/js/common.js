function formValidation(form, selectorErrorMessage = 'error-message', {
  regularEmail = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
  regularPhone = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g
} = {}) {
  //получаем все инпуты формы
  const inputs = [...form.elements];

  //создаём пустой рбъект ошибок
  let errors = {};

  //если сообщения с ошибкой гдето есть то удаляем их
  removeErrorMessages(selectorErrorMessage);

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
              message: 'Please enter a valid phone (your entry is not in the format "somebody@example.com")'
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

  //проверяем есть ли у нас ошибки
  if (Object.keys(errors).length) {
    //если есть то берём каждый инпут и показываем под его родителем сообщение об ошибке
    //при помощи самописной функции 'showMessage'
    Object.keys(errors)
          .forEach((name) => {
            const message = createErrorMessage(errors[name].message, selectorErrorMessage);
            showMessage(errors[name].input, message);
            errors[name];
          });
    //и после показа соощений выходим из функции и возвращяем false
    return false;
  }

  //если объект ошибок пуст то выходим из функции и возвращаем true
  return true;
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

function removeErrorMessages(selectorErrorMessage) {
  const errors = document.querySelectorAll(`.${selectorErrorMessage}`);

  if (errors) {
    [...errors].forEach((message) => message.remove());
  }
}

export {formValidation, createErrorMessage, showMessage, removeErrorMessages};
