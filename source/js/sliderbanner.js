import {createControls, hideSlide, showSlide, changeCounterArrows} from './utils.js';

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

  // setHeightParent(parentSlides, optionsSlider.start);

  const controls = createControls(parentSlides.children.length, CONTROL_ITEM, BUTTON_ACTIVE, optionsSlider.start);

  listControls.replaceChildren();
  listControls.append(...controls);

  // let isCooldown = false;
  doxControls.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest(BUTTON)) {
      const data = Number(target.dataset.buttonNumber);
      const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

      if (optionsSlider.prevCounter !== data && numberOfHidden.length === parentSlides.children.length - 1) {

        hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
        showSlide(optionsSlide, data, TIME_SHOW);

        optionsSlider.prevCounter = data;
        optionsSlider.counter = data;

        // (function () {
        //   if (isCooldown) return;
        //   isCooldown = true;

        // hideSlide(optionsSlide, optionsSlider.prevCounter, 500);
        // showSlide(optionsSlide, data, 500);
        //
        // optionsSlider.prevCounter = data;
        // optionsSlider.counter = data;

        //   setTimeout(() => isCooldown = false, 510);
        // })();
      }
    }

    if (target.closest(ARROW)) {
      const dataArrow = target.dataset.arrow;
      const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

      switch (dataArrow) {
        case 'right':
          if (numberOfHidden.length === parentSlides.children.length - 1) {
            optionsSlider.counter = changeCounterArrows(optionsSlider, 'right');

            if (optionsSlider.prevCounter !== optionsSlider.counter) {
              hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
              showSlide(optionsSlide, optionsSlider.counter, TIME_SHOW);

              optionsSlider.prevCounter = optionsSlider.counter;
            }
          }
          break;

        case 'left':
          if (numberOfHidden.length === parentSlides.children.length - 1) {
            optionsSlider.counter = changeCounterArrows(optionsSlider, 'left');

            if (optionsSlider.prevCounter !== optionsSlider.counter) {
              hideSlide(optionsSlide, optionsSlider.prevCounter, TIME_HIDE);
              showSlide(optionsSlide, optionsSlider.counter, TIME_SHOW);

              optionsSlider.prevCounter = optionsSlider.counter;
            }
          }
          break;
      }
    }
  });
}
