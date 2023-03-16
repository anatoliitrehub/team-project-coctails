'use strict';

import { galleryMarkUp } from './markup';
import { FetchCocktails } from './fetch';
import { showCocktailDetails } from './modalcocktails';

const gallerySection = document.querySelector('.gallery');
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

let drinks = [];
Promise.all(arr).then(result => {
  // result.forEach(res => {
  //   const drink = [res.data.drinks[0]];
  //   galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drink));
  // })

  drinks = result.flatMap(item => item.data.drinks);
  console.log(drinks)
  galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drinks));
});


  

  
// document.querySelectorAll(".js-learn-more").forEach(elem => {
//     elem.addEventListener('click', (e) => {
//       const index = Number(e.target.dataset.index);
//       console.log(index, drinks[index]);
//       showCocktailDetails(drinks[index]);
//     });
//   });