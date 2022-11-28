import {createControls, hideSlide, showSlide, setHeightParent} from './utils.js';

if (document.querySelector('.slider__list')) {
  const parentSlides = document.querySelector('.slider__list');
  const listControls = document.querySelector('.controls__list');
  const doxControls = document.querySelector('.controls');

  const SLIDE_ACTIVE = 'slider__item--active';
  const SLIDE_DISABLED = 'slider__item--disabled';
  const BUTTON_ACTIVE = 'controls__button--active';
  const BUTTON = '.controls__button';
  const CONTROL_ITEM = '.controls__item';

  const optionsSlider = {
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

      if (optionsSlider.prevCounter !== data) {
        const numberOfHidden = parentSlides.querySelectorAll(`.${optionsSlide.selectorHidden}`);

        if (numberOfHidden.length === parentSlides.children.length - 1) {
          hideSlide(optionsSlide, optionsSlider.prevCounter, 500);
          showSlide(optionsSlide, data, 500);

          optionsSlider.prevCounter = data;
          optionsSlider.counter = data;
        }
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

  });
}
