'use strict';

import { galleryMarkUp } from './markup';
import { FetchCocktails } from './fetch';


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

galleryListEl.innerHTML = '';
Promise.all(arr).then(result => {
  result.forEach(res => {
    const drink = [res.data.drinks[0]];
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drink));
  })
});