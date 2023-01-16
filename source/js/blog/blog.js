import {
  convertFormParametersToString,
  createBlog,
  getArrayTags,
  getObjParamsFormFilter,
  getObjParamsLocationSearch,
  initializeForm,
  requestTags,
  resetTags,
  showTags,
  setLocationSearch,
  convertObjParametersSearchForRequest
} from './utils-blog.js';

import {getNumbersFromString} from '../common.js';

if (document.querySelector('.page-blog--js')) {
  const formFilters = document.querySelector('.filters__form');
  const buttonReset = document.querySelector('button[type="reset"]');
  const wrapTags = document.querySelector('.filters__list');

  formFilters.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const objParamsForm = getObjParamsFormFilter(form);

    const objDataFormForRequest = convertObjParametersSearchForRequest(objParamsForm);

    const optionsRequestPosts = {
      url: '/api/posts?v=1.0.0',
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

    const strParamsForm = convertFormParametersToString(objParamsForm);
    setLocationSearch(strParamsForm);
  });

  //отправка запроса на сервер при загрузке страницы
  const optionsRequestTags = {
    url: '/api/tags',
    method: 'GET',
    // headers: {name:'Content-Type', value:' application/json; charset=utf-8'}
  };

  requestTags(optionsRequestTags, onSuccessTags);

  function onSuccessTags(arrayTagsData) {
    const paramsSearch = getObjParamsLocationSearch(location.search);
    if (location.search) {
      [...document.forms].forEach((form) => {
        initializeForm(form, paramsSearch);
      });
    }

    const tags = getArrayTags(arrayTagsData, paramsSearch?.tags);
    showTags(wrapTags, tags);

    const paramsLocationSearch = getObjParamsLocationSearch(location.search);
    const dataRequest = convertObjParametersSearchForRequest(paramsLocationSearch);
    const strRequest = getStrSearch(dataRequest);
    console.log(`${strRequest}`);

    function getStrSearch(dataRequest) {
      const searchParams = new URLSearchParams();
      searchParams.set('v', '1.0.0');

      for (const name in dataRequest) {
        if (name === 'sort') {
          searchParams.set(`${name}`, JSON.stringify([dataRequest[name][0], 'DESC']));
        }

        searchParams.set(`${name}`, JSON.stringify(dataRequest[name]));
        console.log(name, dataRequest[name]);
      }

      console.log(`${searchParams}`);
      return searchParams;
    }

    const optionsRequestPosts = {
      url: `/api/posts?${strRequest}`,
      method: 'GET',
    };
    requestTags(optionsRequestPosts, onSuccessPost(dataRequest.page));

    function onSuccessPost(page, formFilter) {
      return function () {
        console.log(page);
      };
    }
  }

  buttonReset.addEventListener('click', (e) => {
    const target = e.target;
    const tags = target.form.querySelectorAll('input[name="tags"]');
    resetTags(tags);
  });

  // document.body.append(createBlog('#blog', {
  //   date: '2020-09-17T11:37:42.206Z',
  //   title: 'Why don\'t the monkeys talk.',
  //   tags: [{id: 1, color: '#F79824'}, {id: 7, color: '#6A7FDB'}],
  //   views: 428,
  //   commentsCount: 27,
  //   text: 'Human apes are the animals closest to us. They have a brain volume close to human, and their behavior is much like human.',
  //   id: 9,
  //   photo: {
  //     desktopPhotoUrl: 'img/post/post-image.jpg',
  //     desktop2xPhotoUrl: 'img/post/post-image@x2.jpg',
  //     tabletPhotoUrl: 'img/post/post-image-tablet.jpg',
  //     tablet2xPhotoUrl: 'img/post/post-image-tablet@x2.jpg',
  //     mobilePhotoUrl: 'img/post/post-image-mobile.jpg',
  //     mobile2xPhotoUrl: 'img/post/post-image-mobile@x2.jpg'
  //   },
  // }));
}


