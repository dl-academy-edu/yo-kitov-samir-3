if (docElement.querySelector('.header__burger-button')) {
  const button = docElement.querySelector('.header__burger-button');
  const nav = docElement.querySelector('.header__nav');

  const BUTTON_CLOSE = 'header__burger-button--close';
  const BUTTON_OPEN = 'header__burger-button--open';
  const NAV_DISABLED = 'hidden';
  const NAV_ACTIVE = 'header__nav--active';

  if (!nav.classList.contains(NAV_DISABLED)) {
    nav.classList.add(NAV_DISABLED);
  }

  button.addEventListener('click', onBurgerClick);

  function onBurgerClick(e) {
    const target = e.currentTarget;

    if (!target.classList.contains(BUTTON_OPEN) && !target.classList.contains(BUTTON_CLOSE)) {
      target.classList.toggle(BUTTON_OPEN);


      nav.classList.toggle(NAV_DISABLED);
      const timeoutShow = setTimeout(() => {
        nav.classList.toggle(NAV_ACTIVE);
        clearTimeout(timeoutShow);
      }, 0);

      return;
    }

    target.classList.toggle(BUTTON_CLOSE);
    target.classList.toggle(BUTTON_OPEN);


    nav.classList.toggle(NAV_ACTIVE);
    const timeoutDisabled = setTimeout(() => {
      nav.classList.toggle(NAV_DISABLED);
      clearTimeout(timeoutDisabled);
    }, 0);
  }
}
