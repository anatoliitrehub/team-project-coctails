'use strict';
import { localFavorites } from './localfavorites';

const elemRefs = {
  backdrop: document.querySelector('[data-modal]'),
  closeModalCockBtn: document.querySelector('[data-modal-close-ingred]'),
  body: document.querySelector('body'),
  content: document.querySelector('.modal__ingred'),
  name: document.querySelector('.ingred__name'),
  type: document.querySelector('.ingred__type'),
  info: document.querySelector('.ingred__info'),
  list: document.querySelector('.ingred__list'),
  favoriteBtn: document.querySelector('.favorite__btn'),
};

elemRefs.closeModalCockBtn.addEventListener('click', toggleModalWindow);
elemRefs.backdrop.addEventListener('click', onBackdropClick);
elemRefs.favoriteBtn.addEventListener('click', toggleFavorite);

function toggleModalWindow() {
  elemRefs.backdrop.classList.toggle('is-hidden');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalWindow();
  }
}

const listItem = (name, value) =>
  `<li class="ingred__item">${name}: ${value}</li>`;

let currentIngredient = {};

export function showIngredientDetails(ingredient) {
  console.log('ingredient', ingredient);
  currentIngredient = ingredient;

  elemRefs.name.textContent = ingredient.strIngredient;
  elemRefs.type.textContent = ingredient.strType;
  elemRefs.info.textContent = ingredient.strDescription;
  elemRefs.list.innerHTML = '';
  if (ingredient.strAlcohol) {
    elemRefs.list.insertAdjacentHTML(
      'beforeend',
      listItem('Alcohol', ingredient.strAlcohol)
    );
  }
  if (ingredient.strABV) {
    elemRefs.list.insertAdjacentHTML(
      'beforeend',
      listItem('Alcohol by volume', ingredient.strABV + '%')
    );
  }
  elemRefs.content.scrollTop = 0;
  elemRefs.favoriteBtn.textContent = favoriteText(
    isInFavorites(ingredient.idIngredient)
  );

  toggleModalWindow();
}

const FAV_INGREDIENTS_KEY = 'favingr';
const favoriteText = isInFav =>
  isInFav ? 'Remove from favorite' : 'Add to favorite';

function isInFavorites(id) {
  const local = localFavorites.getLocal(FAV_INGREDIENTS_KEY);
  const found = local.find(obj => obj.idIngredient === id);
  return found !== undefined;
}

function toggleFavorite() {
  const isInFav = isInFavorites(currentIngredient.idIngredient);
  elemRefs.favoriteBtn.textContent = favoriteText(!isInFav);

  if (isInFav) {
    localFavorites.removeLocal(FAV_INGREDIENTS_KEY, currentIngredient);
  } else {
    localFavorites.addLocal(FAV_INGREDIENTS_KEY, currentIngredient);
  }
}

// const ingredientText = document.querySelector('.ingred__info');
// ingredientText.classList.remove('.is hidden')
// if (ingredientText === null) {
//   ingredientText.textContent.add('.is-hidden');
// }