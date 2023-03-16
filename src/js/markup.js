'use strict';

import * as icons from '../images/icons.svg';
import { showCocktailDetails } from './modalcocktails';

export function galleryMarkUp(params) {
  const galleryMarkUp = params.map(({strDrinkThumb, strDrink}, index) => {
      return `<li class="gallery__item">
      <div class="gallery__box">
        <img
          class="container gallery__picture"
          src=${strDrinkThumb}
          alt=${strDrink}
        />
        <div class="gallery__figcaption">
          <h3 class="gallery__figcaption--coctail">${strDrink}</h3>
          <div class="gallery__figcaption--buttons">
            <button class="gallery__figcaption--info js-learn-more" data-index="${index}">
              Learn more
            </button>
            <button
              class="gallery__figcaption--storage"
              data-favcoctail="add"
              data-favcoctail="remove"
            >
              Add to
              <svg class="gallery__figcaption--icon">
                <use href="${icons}#icon-heart"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>`;
    }).join('');
  return galleryMarkUp;
}

// клік лістенер для Learn More кнопки на карточці з коктейлем
export function addOnLearnMoreClick(drinks) {
    document.querySelectorAll('.js-learn-more').forEach(elem => {
      elem.addEventListener('click', e => {
        const index = Number(e.target.dataset.index);
        console.log(index, drinks[index]);
        showCocktailDetails(drinks[index]);
      });
    });
}