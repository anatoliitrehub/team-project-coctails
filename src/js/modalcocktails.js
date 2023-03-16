'use strict';
import { FetchCocktails } from'./fetch';
const fetchCocktails = new FetchCocktails();

const elemRefs = {

  openLearnMoreBtn: document.querySelector('.js-learn-more'),
  closeModalCockBtn: document.querySelector('[data-modal-close-cocktails]'),
  backdrop: document.querySelector('[data-modal-backdrop]'),
  body: document.querySelector('body'),
  title: document.querySelector('.cocktail__title'),
  cocktailImg: document.querySelector('.cocktail__photo'),
  ingridList: document.querySelector('.ingredients-list'),
  instruction: document.querySelector('.instraction__descr'),
};

elemRefs.closeModalCockBtn.addEventListener('click', toggleModalWindow);
elemRefs.backdrop.addEventListener('click', onBackdropClick);

export function toggleModalWindow() {
  elemRefs.backdrop.classList.toggle('is-hidden');
  if (!elemRefs.backdrop.classList.contains('is-hidden')) {
    elemRefs.body.style.overflowY = 'hidden';
  } else {
    elemRefs.body.style.overflowY = 'auto';
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalWindow();
  }
}

export function showCocktailDetails(cocktail) {
  elemRefs.title.textContent = cocktail.strDrink;
  elemRefs.cocktailImg.src = cocktail.strDrinkThumb;
  const ingridients = [];
  const measure = [];

  for (const key in cocktail) {
    if (key.includes('strIngredient') && cocktail[key]) {
      ingridients.push(cocktail[key]);
    }
    if (key.includes('strMeasure') && cocktail[key]) {
      measure.push(cocktail[key]);
    }
  }
  const str = ingridients
    .map((element, index) => {
      if (!measure[index]) {
        return `<li class="ingredients__item"><a href="#" class="ingredients__link">&#10038 <span>${element}</span></a></li>`;
      } else {
        return `<li class="ingredients__item"><a href="#" class="ingredients__link">&#10038 ${measure[index]}<span>${element}</span></a></li>`;
      }
    })
    .join('');
  elemRefs.ingridList.insertAdjacentHTML('beforeend', str);
  elemRefs.instruction.textContent = cocktail.strInstructions;

  toggleModalWindow();
}
elemRefs.ingridList.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'A' && event.target.nodeName !== 'SPAN') {
    return;
  }
  
  const ingridName = event.target.lastChild.textContent
    .toLowerCase()
    .replace(' ', '%20');

    fetchCocktails.fetchIngridientsByName(ingridName).then(res => {
    console.log(res);
  });
});


