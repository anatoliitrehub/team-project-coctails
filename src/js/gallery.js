'use strict';

import { galleryMarkUp, addOnLearnMoreClick } from './markup';
import { FetchCocktails } from './fetch';
import { showCocktailDetails } from './modalcocktails';

const galleryListEl = document.querySelector('.gallery__list');




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
