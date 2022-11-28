function createControls(numberControls, selectorItem, selectorActive, start) {
  const result = [];
  const itemControl = document.querySelector(selectorItem);

  if (!itemControl) return;

  for (let i = 1; i <= numberControls; i++) {
    const item = itemControl.cloneNode(true);
    const buttonControl = item.querySelector('button');

    buttonControl.setAttribute('aria-label', `Переключить на ${i} слайдер`);
    item.dataset.buttonNumber = i.toString();

    // Делаем все кнопки слайдера не активными
    if (item.classList.contains(selectorActive)) {
      item.classList.remove(selectorActive);
    }

    result.push(item);
  }

  // делаем одну кнопку активной
  result[start - 1].classList.add(selectorActive);

  return result;
}

export {createControls};
