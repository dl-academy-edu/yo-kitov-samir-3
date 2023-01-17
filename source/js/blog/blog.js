import {
  convertFormParametersToString,
  createPost,
  getArrayTags,
  getObjParamsFormFilter,
  getObjParamsLocationSearch,
  initializeForm,
  requestPageBlog,
  resetTags,
  showTags,
  setLocationSearch,
  convertObjParametersSearchForRequest,
  getStrSearch,
  showPosts,
  createLinkPagination,
  showLinkPagination,
  onSuccessPost
} from './utils-blog.js';

import {getNumbersFromString} from '../common.js';

if (document.querySelector('.page-blog--js')) {
  const formFilters = document.querySelector('.filters__form');
  const buttonReset = document.querySelector('button[type="reset"]');
  const wrapTags = document.querySelector('.filters__list');
  const wrapPosts = document.querySelector('.blogs__list-posts');
  const wrapLinks = document.querySelector('.controls__list--blog-js');
  const template = document.querySelector('#blog');

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
    requestPageBlog(optionsRequestPosts, onSuccessPosts);

    function onSuccessPosts(arrayData) {

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

  requestPageBlog(optionsRequestTags, onSuccessTags(wrapTags, template, wrapPosts, wrapLinks));

  function onSuccessTags(parentTags, templatePost, parentPosts, parentLinks) {
    return function (arrayTagsData) {
      const paramsSearch = getObjParamsLocationSearch(location.search);
      if (location.search) {
        [...document.forms].forEach((form) => {
          initializeForm(form, paramsSearch);
        });
      }

      const tags = getArrayTags(arrayTagsData, paramsSearch?.tags);
      showTags(parentTags, tags);

      const dataRequest = convertObjParametersSearchForRequest(paramsSearch);
      const strRequest = getStrSearch(dataRequest);

      const optionsRequestPosts = {
        url: `/api/posts?${strRequest}`,
        method: 'GET',
      };
      requestPageBlog(optionsRequestPosts, onSuccessPost(dataRequest.page, parentLinks, templatePost, parentPosts));

    };
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


