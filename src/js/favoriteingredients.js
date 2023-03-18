'use strict';
import { localFavorites } from './localfavorites';
import { header } from './header';
import { modalingredients, showIngredientDetails } from './modalingredients';
import { ingredientsMarkup } from './ingredientmarkup';

const refs = {
  list: document.querySelector('.ingredients__list'),
  notFoundText: document.querySelector('.ingredients__text'),
};

const FAV_INGREDIENTS_KEY = 'favingr';
let favIngredients = [];

export function getFavoriteIngredients() {
  return localFavorites.getLocal(FAV_INGREDIENTS_KEY);
}

export function showFavoriteIngredients(ingredients) {
  favIngredients = ingredients;
  refs.list.innerHTML = '';

  if (ingredients.length === 0) {
    refs.notFoundText.classList.remove('is-hidden');
  } else {
    refs.notFoundText.classList.add('is-hidden');
    refs.list.insertAdjacentHTML('beforeend', ingredientsMarkup(ingredients));
    addOnClickEvents(
      'button.ingredients__learn-more',
      ingredients,
      showIngredientDetails
    );
    addOnClickEvents(
      'button.ingredients__favorite',
      ingredients,
      removeFromFavorites
    );
  }
}

function addOnClickEvents(selector, elements, callback) {
  document.querySelectorAll(selector).forEach(elem => {
    elem.addEventListener('click', e => {
      const index = Number(e.target.parentNode.dataset.index);
      callback(elements[index]);
    });
  });
}

function removeFromFavorites(ingredient) {
    localFavorites.removeLocal(FAV_INGREDIENTS_KEY, ingredient);
    const index = favIngredients.findIndex(elem => elem.idIngredient === ingredient.idIngredient);
    if (index !== -1) {
        favIngredients.splice(index, 1);
        showFavoriteIngredients(favIngredients);
    }
}

showFavoriteIngredients(getFavoriteIngredients());
