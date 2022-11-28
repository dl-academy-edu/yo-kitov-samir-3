import {createControls} from './utils.js';

if (document.querySelector('.slider__list')) {
  const parentSlides = document.querySelector('.slider__list');
  const parentControls = document.querySelector('.controls__list');

  const SLIDE_ACTIVE = '.slider__item--active';
  const CONTROL_ACTIVE = 'controls__item--active';
  const CONTROL = '.controls__item';

  const optionsSlider = {
    start: 1 + [].indexOf.call(parentSlides.children, parentSlides.querySelector(SLIDE_ACTIVE)),
    step: 1,
    counter: 0
  };

  const controls = createControls(parentSlides.children.length, CONTROL, CONTROL_ACTIVE, optionsSlider.start);

  parentControls.replaceChildren();
  parentControls.append(...controls);

  [].forEach.call()
}
