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
            }
            break;
        }
      }
    }
  }
}

function createParamsSearch(arrayParams) {
  let params = {};

  arrayParams.forEach((itemParam) => {
    const [name, value] = itemParam.split('=');

    if (params[name]) {
      params[name].push(value);
    } else {
      params[name] = [value];
    }
  });

  return params;
}

export {
  initializeForm,
  createParamsSearch
};
