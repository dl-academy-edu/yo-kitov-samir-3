function formActive(form, classHidden, objEvent) {
  form.parentElement.classList.remove(classHidden);

  const buttonCloseForm = form.querySelector('.close-form');
  buttonCloseForm.addEventListener('click', closePopupButtonClick);

  document.addEventListener('keyup', closePopupKeyup);

  function closePopupButtonClick() {
    this.parentElement.parentElement.classList.add(classHidden);

    this.removeEventListener('click', closePopupButtonClick);
    form.removeEventListener('keyup', closePopupKeyup);

    if (Object.keys(objEvent).length) {
      Object.keys(objEvent).forEach((nameElement)=>{
        objEvent[nameElement].element.removeEventListener(`${objEvent[nameElement].event}`, objEvent[nameElement].callback)
      })
    }
  }

  function closePopupKeyup(e) {
    if (e.code === 'Escape') {
      form.parentElement.classList.add(classHidden);

      document.removeEventListener('keyup', closePopupKeyup);
      buttonCloseForm.removeEventListener('click', closePopupButtonClick);
    }

    if (Object.keys(objEvent).length) {
      Object.keys(objEvent).forEach((nameElement)=>{
        objEvent[nameElement].removeEventListener(`${objEvent[nameElement].event}`, objEvent[nameElement].callback)
      })
    }
  }
}

export {
  formActive
};
