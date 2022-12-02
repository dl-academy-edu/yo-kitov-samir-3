import {createControls, hideSlide, showSlide, changeCounterArrows, makeDotActive} from './utils.js';

if (document.querySelector('.slider__list')) {
  const parentSlides = document.querySelector('.slider__list');
  const listControls = document.querySelector('.controls__list');
  const doxControls = document.querySelector('.controls');

  const SLIDE_ACTIVE = 'slider__item--active';
  const SLIDE_DISABLED = 'slider__item--disabled';
  const BUTTON_ACTIVE = 'controls__button--active';
  const BUTTON = '.controls__button';
  const CONTROL_ITEM = '.controls__item';
  const ARROW = '.controls__arrow';

  const TIME_SHOW = 500;
  const TIME_HIDE = 500;

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

  [].forEach.call(parentSlides.children, (item) => {
    if (!item.classList.contains(SLIDE_ACTIVE) && !item.classList.contains(SLIDE_DISABLED)) {
      item.classList.add(SLIDE_DISABLED);
    }
  });

  const controls = createControls(parentSlides.children.length, CONTROL_ITEM, BUTTON_ACTIVE, optionsSlider.start);

  listControls.replaceChildren();
  listControls.append(...controls);

  if (localStorage.slide && optionsSlider.start !== Number(localStorage.slide)) {
    hideSlide(optionsSlide, optionsSlider.start, TIME_HIDE);
    showSlide(optionsSlide, localStorage.slide, TIME_SHOW);
    makeDotActive(listControls, optionsSlider.start, localStorage.slide, BUTTON_ACTIVE);

    optionsSlider.prevCounter = localStorage.slide;
  }

  doxControls.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest(BUTTON)) {
      const data = Number(target.dataset.buttonNumber);
      const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

      if (optionsSlider.prevCounter !== data && numberOfHidden.length === parentSlides.children.length - 1) {

        hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
        showSlide(optionsSlide, data, TIME_SHOW);
        makeDotActive(listControls, optionsSlider.prevCounter, data, BUTTON_ACTIVE);

        optionsSlider.prevCounter = data;
        optionsSlider.counter = data;
        localStorage.slide = optionsSlider.counter;
      }
    }

    if (target.closest(ARROW)) {
      const dataArrow = target.dataset.arrow;
      const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

      if (dataArrow === 'right' && numberOfHidden.length === parentSlides.children.length - 1) {
        optionsSlider.counter = changeCounterArrows(optionsSlider, 'right');
      }

      if (dataArrow === 'left' && numberOfHidden.length === parentSlides.children.length - 1) {
        optionsSlider.counter = changeCounterArrows(optionsSlider, 'left');
      }

      if (optionsSlider.prevCounter !== optionsSlider.counter) {
        hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
        showSlide(optionsSlide, optionsSlider.counter, TIME_SHOW);
        makeDotActive(listControls, optionsSlider.prevCounter, optionsSlider.counter, BUTTON_ACTIVE);

        optionsSlider.prevCounter = optionsSlider.counter;
        localStorage.slide = optionsSlider.counter;
      }

    }
  });
}
