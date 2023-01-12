import {
  URL,
  showPreloader,
  deletePreloader
} from '../forms/utils-form.js';

const SELECTOR_CUSTOM_CHECKBOX = 'custom-checkbox-js';
const SELECTOR_SMALL_STICK = 'custom-checkbox-js--small-stick';
const SELECTOR_BIG_STICK = 'custom-checkbox-js--big-stick';

function createMarker(marker, id, color) {
  const newMarker = marker.cloneNode(true);

  newMarker.setAttribute('data-marker-id', id);
  newMarker.style.backgroundColor = color;

  return newMarker;
}

function createMarkers(marker, objOptionsMarker) {
  let markers = [];

  objOptionsMarker.forEach((optionsMarker) => {
    const newMarker = createMarker(marker, optionsMarker.id, optionsMarker.color);
    markers.push(newMarker);
  });

  return markers;
}

function getTimeForMan(strTime) {
  const data = new Date(strTime);

  return {
    number: data.getDate() < 10 ? `'0${data.getDate()}` : `${data.getDate()}`,
    month: data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : `${data.getMonth()}`,
    year: String(data.getFullYear())
  };
}

function createBlog(selectorTemplate, {id, title, tags, date, views, commentsCount, text, photo}) {
  const blog = document.querySelector(selectorTemplate)
                       .content
                       .cloneNode(true);

  const article = blog.querySelector('.blog');
  const titleBlog = blog.querySelector('.blog__title');
  const markerBlog = blog.querySelector('.blog__marker');
  const wrapMarker = blog.querySelector('.blog__wrap-markers');
  const timeBlog = blog.querySelector('.blog__time');
  const viewsBlog = blog.querySelector('.blog__views');
  const commentsBlog = blog.querySelector('.blog__comments');
  const textBlog = blog.querySelector('.blog__text');
  const imgBlog = blog.querySelector('.blog__img');
  const imgTabletBlog = blog.querySelector('.blog__img-tablet');
  const imgMobileBlog = blog.querySelector('.blog__img-mobile');

  const arrayMarkers = createMarkers(markerBlog, tags);
  const {number, month, year} = getTimeForMan(date);

  article.setAttribute('data-blog-id', id);

  titleBlog.textContent = title;

  wrapMarker.innerHTML = '';
  wrapMarker.append(...arrayMarkers);

  timeBlog.dateTime = `${year}-${month}-${number}`;
  timeBlog.textContent = `${number}.${month}.${year}`;

  viewsBlog.innerHTML = `${views} views`;

  commentsBlog.innerHTML = `${commentsCount} comments`;

  textBlog.innerHTML = text;

  imgBlog.src = 'photo.desktopPhotoUrl';
  imgBlog.srcset = `${photo.desktop2xPhotoUrl} 2x`;
  imgTabletBlog.srcset = `${photo.tabletPhotoUrl}, ${photo.tablet2xPhotoUrl} 2x`;
  imgMobileBlog.srcset = `${photo.mobilePhotoUrl}, ${photo.mobile2xPhotoUrl} 2x`;

  return blog;
}

function createTag({id, color}, arrayCheckedTags) {
  const tag = `
  <div class="filters__wrap-input-tag filters__wrap-input-tag--js">
          <input class="visually-hidden" type="checkbox" value="${id}" name="tags" id="${id}">
          <label class="filters__label-tag filters__label-tag--js" for="${id}">blue</label>
          <span class="${SELECTOR_CUSTOM_CHECKBOX}">
             <span class="${SELECTOR_SMALL_STICK}"></span>
             <span class="${SELECTOR_BIG_STICK}"></span>
          </span>
        </div>`;

  const li = document.createElement('li');
  li.innerHTML = tag;

  const checkbox = li.querySelector('input[type="checkbox"]');
  const customCheckbox = li.querySelector('.custom-checkbox-js');
  const smallStick = li.querySelector('.custom-checkbox-js--small-stick');
  const bigStick = li.querySelector('.custom-checkbox-js--big-stick');

  if (arrayCheckedTags && arrayCheckedTags.indexOf(String(id)) !== -1) {
    checkbox.checked = true;
    smallStick.style.backgroundColor = color;
    bigStick.style.backgroundColor = color;
  }

  customCheckbox.style.color = color;

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      smallStick.style.backgroundColor = color;
      bigStick.style.backgroundColor = color;
      return;
    }

    smallStick.style.backgroundColor = 'transparent';
    bigStick.style.backgroundColor = 'transparent';
  });

  checkbox.addEventListener('focusin', () => {
    customCheckbox.style.outline = `2px solid ${color}`;
  });

  checkbox.addEventListener('focusout', (e) => {
    customCheckbox.style.outline = `2px solid transparent`;
  });

  return li;
}

function getArrayTags(arrayDataTags, arrayCheckedTags) {
  const arrayTags = [];

  arrayDataTags.forEach(({id, color}) => {
    const tag = createTag({id, color}, arrayCheckedTags);
    arrayTags.push(tag);
  });

  return arrayTags;
}

function resetTags(arrayInputsTagsElements) {
  arrayInputsTagsElements.forEach((inputTag) => {
    if (inputTag.checked) {
      inputTag.checked = false;

      const inputParent = inputTag.parentElement;

      const smallStick = inputParent.querySelector(`.${SELECTOR_SMALL_STICK}`);
      const bigStick = inputParent.querySelector(`.${SELECTOR_BIG_STICK}`);

      smallStick.style.backgroundColor = 'transparent';
      bigStick.style.backgroundColor = 'transparent';
    }
  });
}

function showTags(elemTarget, arrayTags) {
  elemTarget.append(...arrayTags);
}

function requestTags(objOptionsRequest, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open(objOptionsRequest.method, `${URL}${objOptionsRequest.url}`);
  if (objOptionsRequest.headers) {
    xhr.setRequestHeader(objOptionsRequest.headers.name, objOptionsRequest.headers.value);
  }
  xhr.responseType = 'json';
  showPreloader();
  xhr.send(JSON.stringify(objOptionsRequest?.body));
  xhr.onload = () => {
    if (xhr.response.success || xhr.status === 200) {
      console.log(xhr.response.data);
      if (onSuccess) {
        onSuccess(xhr.response.data);
      }
    }
    deletePreloader();
  };

  xhr.onerror = () => {

  };
}

function initializeForm(form, objParams) {
  for (const name in objParams) {
    if (objParams.hasOwnProperty(name)) {
      const inputs = form.querySelectorAll(`input[name=${name}]`);

      for (const input of inputs) {
        switch (input.type) {
          case 'search':
          case 'text':
            if (input.name in objParams) {
              input.value = objParams[name][0];
            }
            break;

          default:
            if (objParams[name].indexOf(input.value) !== -1) {
              input.checked = true;
              break;
            }

            input.checked = false;
            break;
        }
      }
    }
  }
}

function getObjParamsLocationSearch(arrayParamsLocation) {
  let params = {};

  arrayParamsLocation.forEach((itemParam) => {
    const [name, value] = itemParam.split('=');

    if (params[name]) {
      params[name].push(value);
    } else {
      params[name] = [value];
    }
  });

  return params;
}

function getObjParamsFormFilter(form) {
  const inputs = form.querySelectorAll('input');
  const objParamsForm = {};

  [...inputs].forEach((input) => {
    switch (input.type) {
      case 'search':
      case 'text':
        objParamsForm[input.name] = [input.value];
        break;

      default:
        if (input.checked) {
          if (objParamsForm[input.name]) {
            objParamsForm[input.name].push(input.value);
            break;
          }

          objParamsForm[input.name] = [input.value];
        }
        break;
    }
  });

  return objParamsForm;
}

function convertFormParametersToString(objFormParamsFilter) {
  let ifTheFirstElement = true;
  let strSearch = '';

  for (const name in objFormParamsFilter) {
    if (objFormParamsFilter.hasOwnProperty(name)) {
      objFormParamsFilter[name].forEach((value) => {
        if (ifTheFirstElement) {
          strSearch += `${name}=${value}`;
          ifTheFirstElement = false;
          return;
        }

        strSearch += `&${name}=${value}`;
      });
    }
  }

  return strSearch;
}

function setLocationSearch(formParameterString) {
  location = `${location.origin}${location.pathname}?${formParameterString}`;
}

export {
  createBlog,
  showTags,
  getArrayTags,
  requestTags,
  initializeForm,
  getObjParamsLocationSearch,
  resetTags,
  convertFormParametersToString,
  getObjParamsFormFilter,
  setLocationSearch
};
