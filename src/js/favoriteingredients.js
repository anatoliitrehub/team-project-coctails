"use strict";
import { localFavorites } from './localfavorites';
import { header } from './header';
import { modalingredients, showIngredientDetails } from './modalingredients';
import { ingredientsMarkup } from "./ingredientmarkup";


const refs = {
    list: document.querySelector('.ingredients__list'),
    notFoundText: document.querySelector('.ingredients__text')
}

const FAV_INGREDIENTS_KEY = 'favingr';
let ingredients = [];


export function showFavoriteIngredients() {
    ingredients = localFavorites.getLocal(FAV_INGREDIENTS_KEY);
    console.log("favorite ingredients", ingredients);
    refs.list.innerHTML = "";

    if (ingredients.length === 0) {
        refs.notFoundText.classList.remove('is-hidden');
    } else {
        refs.notFoundText.classList.add('is-hidden');
        refs.list.insertAdjacentHTML('beforeend', ingredientsMarkup(ingredients));
        addOnClickEvents('button.ingredients__learn-more', ingredients, showIngredientDetails);
        addOnClickEvents('button.ingredients__favorite', ingredients, removeFromFavorites);
    }
}

function addOnClickEvents(selector, elements, callback) {
    console.log("elements", elements);
    document.querySelectorAll(selector).forEach(elem => {
        console.log(elem);
      elem.addEventListener('click', e => {
          const index = Number(e.target.parentNode.dataset.index);
          console.log(e.target, e.target.parentNode, index, elements[index]);
        callback(elements[index]);
      });
    });
}

function removeFromFavorites(ingredient) {
    console.log("ingredient", ingredient);
    localFavorites.removeLocal(FAV_INGREDIENTS_KEY, ingredient);
    showFavoriteIngredients();
}

showFavoriteIngredients();