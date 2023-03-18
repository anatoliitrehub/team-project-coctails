'use strict';
import { FetchCocktails } from './fetch';
import { localFavorites } from './localfavorites';
import { showIngredientDetails } from './modalingredients';


const elemRefs = {
  openLearnMoreBtn: document.querySelector('.js-learn-more'),
  closeModalCockBtn: document.querySelector('[data-modal-close-cocktails]'),
  addBtn: document.querySelector('.js-add-btn'),
  backdrop: document.querySelector('[data-modal-backdrop]'),
  title: document.querySelector('.cocktail__title'),
  cocktailImg: document.querySelector('.cocktail__photo'),
  ingridList: document.querySelector('.ingredients-list'),
  instruction: document.querySelector('.instraction__descr'),
};

const fetchCocktails = new FetchCocktails();
const FAV_COCKT_KEY = "favcockt";
let cocktailDetail = {};

// лисенер на модалку 
elemRefs.closeModalCockBtn.addEventListener('click', toggleModalWindow);
elemRefs.backdrop.addEventListener('click', onBackdropClick);

// лисенер
elemRefs.addBtn.addEventListener('click', event => {
  if (elemRefs.addBtn.textContent === 'Add to favorites'){
    localFavorites.addLocal(FAV_COCKT_KEY, cocktailDetail);
    elemRefs.addBtn.textContent ='Remove from favorites';
    let cocktailIdBtn = `[name='${cocktailDetail.idDrink}']`
    let cardBtn = document.querySelector(cocktailIdBtn);
    cardBtn.firstElementChild.textContent = 'Remove';
    cardBtn.lastElementChild.style.fill = '#fd5103';
    return;
  }else {
    localFavorites.removeLocal(FAV_COCKT_KEY, cocktailDetail);
    elemRefs.addBtn.textContent ='Add to favorites';
    let cocktailIdBtn = `[name='${cocktailDetail.idDrink}']`
    let cardBtn = document.querySelector(cocktailIdBtn);
    cardBtn.firstElementChild.textContent = 'Add to';
    cardBtn.lastElementChild.style.fill = 'var(--white-modal-text)';
  }
});
// лісенер на інгрідієнтах 
elemRefs.ingridList.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName !== 'A' && event.target.nodeName !== 'SPAN') {
    return;
  }

  const ingridName = event.target.lastChild.textContent
    .toLowerCase()
    .replace(' ', '%20');

  fetchCocktails.fetchIngridientsByName(ingridName).then(res => {
  
    showIngredientDetails(res.data.ingredients[0]);
  });
});


export function toggleModalWindow() {
  elemRefs.backdrop.classList.toggle('is-hidden');

  if (!elemRefs.backdrop.classList.contains('is-hidden')) {
    document.body.style.overflowY = 'hidden';
    
  } else {
    document.body.style.overflowY = 'auto';
  }
}
export function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalWindow();
  }
}

export function showCocktailDetails(cocktail) {
  cocktailDetail = {...cocktail};
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

  elemRefs.ingridList.innerHTML = '';
  elemRefs.ingridList.insertAdjacentHTML('beforeend', str);
  elemRefs.instruction.textContent = cocktail.strInstructions;

  const dataCocktail = localFavorites
    .getLocal(FAV_COCKT_KEY)
    .find(obj => obj.idDrink === cocktail.idDrink);

  if (dataCocktail) {
    elemRefs.addBtn.textContent ='Remove from favorites';
  } else {
    elemRefs.addBtn.textContent ='Add to favorites';
  }

  toggleModalWindow();
}