function openPopupButtonClick(form, classHidden) {
  form.parentElement.classList.remove(classHidden);

  const buttonCloseForm = form.querySelector('.close-form');

  buttonCloseForm.addEventListener('click', closePopupButtonClick(classHidden));
}

function closePopupButtonClick(classHidden) {
  return function closePopup() {
    this.parentElement.parentElement.classList.add(classHidden);

    this.removeEventListener('click', closePopup);
  };
}

function closePopupKeyup(classHidden) {
  return function closePopup(e) {
    console.log(e.code);
    if (e.code === 'Escape') {
      const forms = document.querySelectorAll('.form');

      if (forms.length) {
        forms.forEach((form) => {
          if (!form.parentElement.classList.contains(classHidden))
            form.parentElement.classList.add(classHidden);
          this.removeEventListener('keyup', closePopup);
        });
      }
    }
  };
}

export {
  openPopupButtonClick,
  closePopupKeyup
};
