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


Promise.all(arr).then(result => {
    console.log(result);

    result.map(res => {
        console.log(res);
    //   const randomResCocktails = res.data.drinks;
    galleryListEl.innerHTML = galleryMarkUp(randomResCocktails);
  });
});

