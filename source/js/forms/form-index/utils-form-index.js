function activeButtonSubmit(e) {
  const target = e.target;
  const form = target.form;
  const buttonSubmit = form.querySelector('button[type=submit]');
  buttonSubmit.disabled = !target.checked;
}

export {
  activeButtonSubmit
}
