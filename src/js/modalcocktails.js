'use strict';
import { FetchCocktails } from './fetch';
import { localFavorites } from './localfavorites';
import { showIngredientDetails } from './modalingredients';

const fetchCocktails = new FetchCocktails();
const FAV_COCKT_KEY = "favcockt";
const elemRefs = {
  openLearnMoreBtn: document.querySelector('.js-learn-more'),
  closeModalCockBtn: document.querySelector('[data-modal-close-cocktails]'),
  addBtn: document.querySelector('.js-add-btn'),
  removeBtn: document.querySelector('.js-remove-btn'),
  backdrop: document.querySelector('[data-modal-backdrop]'),
  body: document.querySelector('body'),
  title: document.querySelector('.cocktail__title'),
  cocktailImg: document.querySelector('.cocktail__photo'),
  ingridList: document.querySelector('.ingredients-list'),
  instruction: document.querySelector('.instraction__descr'),
  // addBtn: document.querySelector('.js-add-btn'),
};

elemRefs.closeModalCockBtn.addEventListener('click', toggleModalWindow);
elemRefs.backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalWindow();
  }
}
let cocktailId = {};
export function showCocktailDetails(cocktail) {
  cocktailId = {...cocktail};
  elemRefs.title.textContent = cocktail.strDrink;
  elemRefs.cocktailImg.src = cocktail.strDrinkThumb;

  const dataCocktail = localFavorites
    .getLocal(FAV_COCKT_KEY)
    .find(obj => obj.idDrink === cocktail.idDrink);

  if (dataCocktail) {
    elemRefs.addBtn.classList.add('is-hidden-btn');
    elemRefs.removeBtn.classList.remove('is-hidden-btn');
  } else {
    elemRefs.addBtn.classList.remove('is-hidden-btn');
    elemRefs.removeBtn.classList.add('is-hidden-btn');
  }

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

  elemRefs.ingridList.innerHTML = '';
  elemRefs.ingridList.insertAdjacentHTML('beforeend', str);
  elemRefs.instruction.textContent = cocktail.strInstructions;

  toggleModalWindow();
}


elemRefs.addBtn.addEventListener('click', event => {
  localFavorites.addLocal(FAV_COCKT_KEY, cocktailId);
  elemRefs.addBtn.classList.add('is-hidden-btn');
  elemRefs.removeBtn.classList.remove('is-hidden-btn');
});

elemRefs.removeBtn.addEventListener('click', event => {
  localFavorites.removeLocal(FAV_COCKT_KEY, cocktailId);
  elemRefs.removeBtn.classList.add('is-hidden-btn');
  elemRefs.addBtn.classList.remove('is-hidden-btn');
});
 


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
    showIngredientDetails(res.data.ingredients[0]);
  });
});

export function toggleModalWindow() {
  elemRefs.backdrop.classList.toggle('is-hidden');

  if (!elemRefs.backdrop.classList.contains('is-hidden')) {
    elemRefs.body.style.overflowY = 'hidden';
  } else {
    elemRefs.body.style.overflowY = 'auto';
  }
}
// fetchCocktails.fetchIngridientsByName(ingridName).then(res => {
//   console.log(res);

// });
