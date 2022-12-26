import {initializeForm, createParamsSearch} from './utilsLocal.js';

if (location.search) {
  const arrayParamsSearch = location.search
                                    .slice(1)
                                    .split('&');

  let paramsSearch = createParamsSearch(arrayParamsSearch);

  [...document.forms].forEach((form) => {
    initializeForm(form, paramsSearch);
  });
}
