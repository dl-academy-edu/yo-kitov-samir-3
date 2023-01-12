import {
  convertFormParametersToString,
  createBlog,
  getArrayTags,
  getObjParamsFormFilter,
  getObjParamsLocationSearch,
  initializeForm,
  requestTags,
  resetTags,
  showTags
} from './utils-blog.js';

import {getNumbersFromString} from '../common.js';

if (document.querySelector('.page-blog--js')) {
  const formFilters = document.querySelector('.filters__form');
  const buttonReset = document.querySelector('button[type="reset"]');
  const wrapTags = document.querySelector('.filters__list');

  const arrayParamsSearch = location.search
                                    .slice(1)
                                    .split('&');
  let paramsSearch;
  if (location.search) {
    paramsSearch = getObjParamsLocationSearch(arrayParamsSearch);
    [...document.forms].forEach((form) => {
      initializeForm(form, paramsSearch);
    });
  }

  formFilters.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const objParamsForm = getObjParamsFormFilter(form);

    const objDataFormForRequest = convertParametersFormForRequest(objParamsForm);

    const optionsRequestPosts = {
      url: 'api/posts?v=1.0.0',
      method: 'GET',
      body: objDataFormForRequest
    };
    requestTags(optionsRequestPosts, onSuccessPosts);

    function onSuccessPosts(arrayData) {

    }

    function createLinkPagination(page) {
      const li = document.createElement('li');
      li.classList.add('controls__item');
      const link = document.createElement('a');
      link.classList.add('controls__link');
      link.innerText = page + 1;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target;

        const activeLink = document.querySelector('.controls__link--active');
        activeLink.classList.remove('controls__link--active');

        link.classList.add('controls__link--active');
      });
    }

    // const strParamsForm = convertFormParametersToString(objParamsForm);
    // setLocationSearch(strParamsForms);

    function convertParametersFormForRequest(objParamsForm) {
      const dataForm = {
        filter: {},
        limit: 9
      };

      for (const name in objParamsForm) {
        if (objParamsForm.hasOwnProperty(name)) {
          switch (name) {
            case 'comments':
            case 'views':
              const arrayNumbers = getNumbersFromString(objParamsForm[name].join());
              const min = Math.min.apply(null, arrayNumbers);
              const max = Math.max.apply(null, arrayNumbers);

              dataForm.filter[name] = JSON.stringify({$between: [min, max]});
              break;

            default:
              dataForm[name] = JSON.stringify(objParamsForm[name]);
              break;
          }
        }
      }
      console.log(JSON.stringify(dataForm));
      return dataForm;
    }
  });

  const optionsRequestTags = {
    url: 'api/tags',
    method: 'GET',
    // headers: {name:'Content-Type', value:' application/json; charset=utf-8'}
  };

  function onSuccessTags(arrayTagsData) {
    const tags = getArrayTags(arrayTagsData, paramsSearch?.tags);
    showTags(wrapTags, tags);
  }

  requestTags(optionsRequestTags, onSuccessTags);

  buttonReset.addEventListener('click', (e) => {
    const target = e.target;
    const tags = target.form.querySelectorAll('input[name="tags"]');
    resetTags(tags);
  });

  document.body.append(createBlog('#blog', {
    date: '2020-09-17T11:37:42.206Z',
    title: 'Why don\'t the monkeys talk.',
    tags: [{id: 1, color: '#F79824'}, {id: 7, color: '#6A7FDB'}],
    views: 428,
    commentsCount: 27,
    text: 'Human apes are the animals closest to us. They have a brain volume close to human, and their behavior is much like human.',
    id: 9,
    photo: {
      desktopPhotoUrl: 'img/post/post-image.jpg',
      desktop2xPhotoUrl: 'img/post/post-image@x2.jpg',
      tabletPhotoUrl: 'img/post/post-image-tablet.jpg',
      tablet2xPhotoUrl: 'img/post/post-image-tablet@x2.jpg',
      mobilePhotoUrl: 'img/post/post-image-mobile.jpg',
      mobile2xPhotoUrl: 'img/post/post-image-mobile@x2.jpg'
    },
  }));
}


