import {
  createControls,
  hideSlide,
  showSlide,
  changeCounterArrows,
  makeDotActive,
  checkLeftSlide,
  checkRightSlide
} from './utils.js';

if (document.querySelector('.slider__list')) {
  const parentSlides = document.querySelector('.slider__list');
  const listControls = document.querySelector('.controls__list');
  const itemControl = document.querySelector('.controls__item');
  const doxControls = document.querySelector('.controls');
  const leftArrow = document.querySelector('.controls__arrow[data-arrow="left"]');
  const rightArrow = document.querySelector('.controls__arrow[data-arrow="right"]');

  const SLIDE_ACTIVE = 'slider__item--active';
  const SLIDE_DISABLED = 'hidden';
  const BUTTON = '.controls__button';
  const ARROW = '.controls__arrow';

  const TIME_SHOW = 500;
  const TIME_HIDE = 500;

  const loc = document.location.pathname;

  const optionsSlider = {
    parentSlides: parentSlides,
    visibleSlides: 1,
    start: [].indexOf.call(parentSlides.children, parentSlides.querySelector(`.${SLIDE_ACTIVE}`)),
    step: 1,
    counter: 0,
    prevCounter: [].indexOf.call(parentSlides.children, parentSlides.querySelector(`.${SLIDE_ACTIVE}`))
  };

  const optionsSlide = {
    parentSlides: parentSlides,
    selectorActive: SLIDE_ACTIVE,
    selectorHidden: SLIDE_DISABLED
  };

  // сделать все не активные слайды не доступными
  [].forEach.call(parentSlides.children, (item) => {
    if (!item.classList.contains(SLIDE_ACTIVE) && !item.classList.contains(SLIDE_DISABLED)) {
      item.classList.add(SLIDE_DISABLED);
    }
  });

  // создать точки переключения слайдера
  let buttonActive;
  let controls;
  if (loc.includes('blog')) {
    buttonActive = 'controls__button--number-active';
    controls = createControls(parentSlides.children.length, itemControl, buttonActive, optionsSlider.start, 'numbers');
  } else {
    buttonActive = 'controls__button--active';
    controls = createControls(parentSlides.children.length, itemControl, buttonActive, optionsSlider.start);
  }


  //удалить все точки и добавить точек столько же сколько и слайдов
  listControls.replaceChildren();
  listControls.append(...controls);

  // сделать активным слайд который был при последнем посещениии страницы или до перезагрузки страницы
  if (localStorage[loc] && optionsSlider.start !== Number(localStorage[loc])) {
    hideSlide(optionsSlide, optionsSlider.start, TIME_HIDE);
    showSlide(optionsSlide, localStorage[loc], TIME_SHOW);
    makeDotActive(listControls, optionsSlider.start, localStorage[loc], buttonActive);

    optionsSlider.prevCounter = Number(localStorage[loc]);
    optionsSlider.counter = Number(localStorage[loc]);
  }

  disabledArrow();

  doxControls.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest(BUTTON)) {
      const data = Number(target.dataset.buttonNumber);
      const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

      if (optionsSlider.prevCounter !== data && numberOfHidden.length === parentSlides.children.length - 1) {

        hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
        showSlide(optionsSlide, data, TIME_SHOW);
        makeDotActive(listControls, optionsSlider.prevCounter, data, buttonActive);

        optionsSlider.prevCounter = data;
        optionsSlider.counter = data;
        localStorage.setItem(loc, optionsSlider.counter);

        disabledArrow();
      }
    }

    if (target.closest(ARROW)) {
      const dataArrow = target.dataset.arrow;
      const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

      if (dataArrow === 'right' && (numberOfHidden.length === parentSlides.children.length - optionsSlider.step)) {
        optionsSlider.counter = changeCounterArrows(optionsSlider, 'right');

        disabledArrow();
      }

      if (dataArrow === 'left' && (numberOfHidden.length === parentSlides.children.length - optionsSlider.step)) {
        optionsSlider.counter = changeCounterArrows(optionsSlider, 'left');

        disabledArrow();
      }

      if (optionsSlider.prevCounter !== optionsSlider.counter) {
        hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
        showSlide(optionsSlide, optionsSlider.counter, TIME_SHOW);
        makeDotActive(listControls, optionsSlider.prevCounter, optionsSlider.counter, buttonActive);

        optionsSlider.prevCounter = optionsSlider.counter;
        localStorage.setItem(loc, optionsSlider.counter);
      }
    }
  });

  function disabledArrow() {
    leftArrow.disabled = checkLeftSlide(optionsSlider.counter, optionsSlider.step);
    rightArrow.disabled = checkRightSlide(optionsSlider.parentSlides, optionsSlider.counter, optionsSlider.step);
  }
}
