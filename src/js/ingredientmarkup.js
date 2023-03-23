'use strict';

import * as icons from '../images/icons.svg';

export function ingredientsMarkup(ingredients) {
  return ingredients
    .map(
      ({ strIngredient, strType }, index) =>
        `<li class="ingredients__item">
            <h3 class="ingredients__name">${strIngredient}</h3>
            <p class="ingredients__type">${strType}</p>
            <div class="ingredients__buttons" data-index="${index}">
                <button type="button" class="ingredients__learn-more" >
                    Learn more
                </button>
                <button type="button" class="ingredients__favorite">
                    <span class="ingredients__favorite-text">Remove</span>
                    <svg class="ingredients__favorite-icon" width="18" height="18">
                        <use class="ingredients__favorite-svg" href="${icons}#icon-heart"></use>
                    </svg>
                </button>
            </div>
            </li>`
    ).join('');
}
