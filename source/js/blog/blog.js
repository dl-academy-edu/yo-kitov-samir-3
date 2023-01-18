import {
  convertFormParametersToString,
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
  onSuccessPost
} from './utils-blog.js';

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
}


