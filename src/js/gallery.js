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
  result.forEach(res => {
    const drink = [res.data.drinks[0]];
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drink));
  })
});



















// const handleToggleBtn = ({ target }) => {
//   // console.log(target.textContent);
//   if (target.classList.contains('gallery__figcaption--storage')) {
//     target.textContent = `Remove`;
//     return;
//   }
//   if (target.textContent === 'Remove') {
//     target.textContent = 'Add to'
//   }
// }

const gallerySectionTitle = gallerySection.firstElementChild;

  // if (localStorage.getItem('theme') === 'dark') {
  //   gallerySectionTitle.classList.add('gallery__thema--dark');
  //   gallerySectionTitle.classList.remove('gallery__thema--light');
  //   // coctailName.classList.add('gallery__thema--dark');
  //   // coctailName.classList.remove('gallery__thema--light');
  // } else {
  //   gallerySectionTitle.classList.remove('gallery__thema--dark');
  //   gallerySectionTitle.classList.add('gallery__thema--light');
  //   // coctailName.classList.remove('gallery__thema--dark');
  //   // coctailName.classList.add('gallery__thema--light');
  // }

// function onThemeSet(themeName) {

//     if (themeName==='dark') {
//         gallerySectionTitle.classList.remove('gallery__thema--light')
//         gallerySectionTitle.classList.add('gallery__thema--dark')
//     } else {
//         gallerySectionTitle.classList.remove('gallery__thema--dark')
//         gallerySectionTitle.classList.add('gallery__thema--light')
//     }
// }
