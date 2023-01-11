import {
  createBlog,
  showTags,
  getArrayTags,
  requestTags,
  initializeForm,
  getObjParamsLocationSearch,
  resetTags,
  convertParametersToString,
  getObjParamsFormFilter,
  setLocationSearch
} from './utils-blog.js';

if (document.querySelector('.page-blog--js')) {
  const formFilters = document.querySelector('.filters__form');
  const buttonReset = document.querySelector('button[type="reset"]');
  const wrapTags = document.querySelector('.filters__list');

  const arrayParamsSearch = location.search
                                    .slice(1)
                                    .split('&');
  console.log(location.search);
  let paramsSearch = getObjParamsLocationSearch(arrayParamsSearch);
  console.log(paramsSearch);
  [...document.forms].forEach((form) => {
    initializeForm(form, paramsSearch);
  });

  formFilters.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const objParamsForm = getObjParamsFormFilter(form);

    const strParamsForms = convertParametersToString(objParamsForm);
    setLocationSearch(strParamsForms);
    console.log(strParamsForms);
  });


  function onSuccessTags(arrayTagsData) {
    const tags = getArrayTags(arrayTagsData, paramsSearch.tags);
    showTags(wrapTags, tags);
  }

  const optionsRequestTags = {
    url: 'api/tags',
    method: 'GET',
  };
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
