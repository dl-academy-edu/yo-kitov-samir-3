if (location.search) {
  const arrayParam = location.search
                             .slice(1)
                             .split('&');
  let params = {};

  arrayParam.forEach((itemParam) => {
    const [name, value] = itemParam.split('=');

    if (params[name]) {
      params[name].push(value);
    } else {
      params[name] = [value];
    }
  });

  for (const name in params) {
    const inputs = document.forms.filters.querySelectorAll(`input[name=${name}]`);

    for (const input of inputs) {
      switch (input.type) {
        case 'search':
        case 'text':
          if (input.name in params) {
            input.value = params[name][0];
          }
          break;

        default:
          if (params[name].indexOf(input.value) !== -1) {
            input.checked = true;
          }
          break;
      }
    }
  }
}
