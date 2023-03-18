'use strict';

import { galleryMarkUp, addOnLearnMoreClick } from './markup';
import { FetchCocktails } from './fetch';
import { showCocktailDetails } from './modalcocktails';
import { localFavorites } from './localfavorites';
import { showCocktailDetails } from './modalcocktails';
import { addLikeClick } from './like-add-remove';

const galleryListEl = document.querySelector('.gallery__list');
const galleryTitle = document.querySelector('.gallerry__title-main-wrepper');

const FAV_COCKTAIL_KEY = 'favcockt';

const fetchCocktails = new FetchCocktails();
const arr = [];

for (let index = 0; index < 9; index++) {
  const fetchResult = fetchCocktails.fetchCocktailsRandom().then(data => {
    if (!data) {
      return new Promise();
    }
    return data;
  });
  if (fetchResult) {
    arr.push(fetchResult);
  }
}

Promise.all(arr).then(result => {
  const drinks = result.flatMap(item => item.data.drinks);

  if (window.innerWidth >= 1280) {
    galleryTitle.innerHTML = `<h2 class="gallery__title">Cocktails</h2> `;
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drinks));
  } else if (window.innerWidth < 768) {
    const mobileDrinks = drinks.slice(0, 3);
    galleryTitle.innerHTML = `<h2 class="gallery__title">Cocktails</h2> `;
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(mobileDrinks));
  } else {
    const tabletDrinks = drinks.slice(0, 6);
    galleryTitle.innerHTML = `<h2 class="gallery__title">Cocktails</h2> `;
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(tabletDrinks));
  }
  addOnLearnMoreClick(drinks);
  addLikeClick(drinks);
});
