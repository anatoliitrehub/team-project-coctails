'use strict'

const elemRefs = {
  openLearnMoreBtn: document.querySelector('.js-learn-more'),
  closeModalCockBtn: document.querySelector('[data-modal-close-ingred]'),
  backdrop: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
};

// elemRefs.openLearnMoreBtn.addEventListener('click', toggleModalWindow);
elemRefs.closeModalCockBtn.addEventListener('click', toggleModalWindow);
elemRefs.backdrop.addEventListener('click', onBackdropClick);
export function toggleModalWindow() {
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