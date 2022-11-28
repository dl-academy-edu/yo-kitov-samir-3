function createControls(numberControls, selectorItem, selectorActive, start) {
  const result = [];
  const itemControl = document.querySelector(selectorItem);

  if (!itemControl) return;

  for (let i = 0; i < numberControls; i++) {
    const item = itemControl.cloneNode(true);
    const buttonControl = item.querySelector('button');

    buttonControl.setAttribute('aria-label', `Переключить на ${i + 1} слайдер`);
    buttonControl.dataset.buttonNumber = i.toString();

    // Делаем все кнопки слайдера не активными
    if (buttonControl.classList.contains(selectorActive)) {
      buttonControl.classList.remove(selectorActive);
    }

    result.push(item);
  }

  // делаем одну кнопку активной
  result[start].querySelector('button')
               .classList
               .add(selectorActive);

  return result;
}

function hideSlide({parentSlides, selectorActive, selectorHidden}, prevSlide, time) {
  const previousSlide = parentSlides.children[prevSlide];

  // Прячем текущий слайдер
  previousSlide.classList.remove(selectorActive);
  // Если слайд спрятан, то убераем его доступность
  const timeout = setTimeout(() => {
    if (!previousSlide.classList.contains(selectorActive)) {
      previousSlide.classList.add(selectorHidden);
    }
    clearTimeout(timeout);
  }, time);
}

function showSlide({parentSlides, selectorActive, selectorHidden}, numberSlide, time) {
  const currentSlide = parentSlides.children[numberSlide];

  // Делаем следующий слайд доступным
  currentSlide.classList.remove(selectorHidden);
  // Показываем следующий слайд
  const timeout = setTimeout(() => {
    currentSlide.classList.add(selectorActive);
    clearTimeout(timeout);
  }, time);
}

function setHeightParent(parentSlides, numberSlide) {
  parentSlides.style.height = parentSlides.children[numberSlide].offsetHeight + 'px';
}

export {createControls, hideSlide, showSlide, setHeightParent};
