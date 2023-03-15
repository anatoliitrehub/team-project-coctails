'use strict';

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
                <use href="./icons.svg#icon-heart"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>`;
    }).join('');
  return galleryMarkUp;
}
