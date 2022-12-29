function formActive(form, classHidden, isValid = true) {
  form.parentElement.classList.remove(classHidden);

  const buttonCloseForm = form.querySelector('.close-form');
  buttonCloseForm.addEventListener('click', closePopupButtonClick);

  document.addEventListener('keyup', closePopupKeyup);

  function closePopupButtonClick() {
    this.parentElement.parentElement.classList.add(classHidden);

    this.removeEventListener('click', closePopupButtonClick);
    form.removeEventListener('keyup', closePopupKeyup);
  }

  function closePopupKeyup(e) {
    if (e.code === 'Escape') {
      form.parentElement.classList.add(classHidden);

      document.removeEventListener('keyup', closePopupKeyup);
      buttonCloseForm.removeEventListener('click', closePopupButtonClick);
    }
  }
}

export {
  formActive
};
