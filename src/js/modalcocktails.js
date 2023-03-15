'use strict'

const elemRefs = {
    // цікаво, як витягнути усі кнопки з цим класом . Чи це не треба робити?
  openLearnMoreBtn: document.querySelector('.js-learn-more'),
  closeModalCockBtn: document.querySelector('[data-modal-close-cocktails]'),
  backdrop: document.querySelector('[data-modal-backdrop]'),
  body: document.querySelector('body'),
};

elemRefs.openLearnMoreBtn.addEventListener('click', toggleModalWindow);
elemRefs.closeModalCockBtn.addEventListener('click', toggleModalWindow);
elemRefs.backdrop.addEventListener('click', onBackdropClick);
// Зробити функцію toggleModal експорт
function toggleModalWindow() {
    elemRefs.backdrop.classList.toggle('is-hidden');
    if (!elemRefs.backdrop.classList.contains('is-hidden')){
            elemRefs.body.style.overflowY = 'hidden';
     }else {
            elemRefs.body.style.overflowY = 'auto';
        }
    }
  
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalWindow();
  }
}
