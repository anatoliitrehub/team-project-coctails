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

let drinks = [];
Promise.all(arr).then(result => {
  drinks = result.flatMap(item => item.data.drinks);
  console.log(drinks);
  if (window.innerWidth >= 1280) {
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drinks));
  } else if (window.innerWidth < 768) {
    const mobileDrinks = drinks.slice(0, 3);
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(mobileDrinks));
  } else {
    const tabletDrinks = drinks.slice(0, 6);
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(tabletDrinks));
  }
  addOnLearnMoreClick(drinks);

  const btnAddTo = document.querySelector('.gallery__figcaption--text');
  const btnIcon = document.querySelector('.gallery__figcaption--icon');
  let booleanBtnAddTo = false;

  const handleAddBtnClick = ({ target }) => {
    if (
      !target.classList.contains('gallery__figcaption--storage') &&
      !target.classList.contains('gallery__figcaption--text') &&
      !target.classList.contains('gallery__figcaption--svg')
    ) {
      return;
    } else if (!booleanBtnAddTo) {
      target.textContent = 'Remove';
      btnIcon.style.fill = `#fd5103`;
      booleanBtnAddTo = true;
      return;
    } else {
      btnAddTo.textContent = 'Add to';
      btnIcon.style.fill = `#fcfcfc`;
      booleanBtnAddTo = false;
      return;
    }
  };

  btnAddTo.addEventListener('click', handleAddBtnClick);
});


// export function handleAddToClick(drinks) {
//     document.querySelectorAll('.gallery__figcaption--storage').forEach(elem => {
//       elem.addEventListener('click', e => {
//         const index = Number(e.target.dataset.index);
//         console.log(index, drinks[index]);
//         showCocktailDetails(drinks[index]);
//       });
//     });
// }
