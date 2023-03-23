import { localFavorites } from './localfavorites';
const favCoctNothing = document.querySelector('.favorite-cocktails__text');

const FAV_COCKTAIL_KEY = 'favcockt';

export function addLikeClick(drinks) {
  document.querySelectorAll('.gallery__figcaption--storage').forEach(elem => {
    isInFavorites(elem);

    elem.addEventListener('click', ({ target }) => {
      const idBtn = target.closest('.gallery__figcaption--storage').name;
      const objDrink = drinks.find(el => el.idDrink === idBtn);

      if (
        target.closest('.gallery__figcaption--storage').firstElementChild
          .textContent === 'Add to'
      ) {
        target.closest(
          '.gallery__figcaption--storage'
        ).firstElementChild.textContent = 'Remove';
        target.closest(
          '.gallery__figcaption--storage'
        ).lastElementChild.style.fill = '#fd5103';
        localFavorites.addLocal(FAV_COCKTAIL_KEY, objDrink);
      } else {
        target.closest(
          '.gallery__figcaption--storage'
        ).firstElementChild.textContent = 'Add to';
        target.closest(
          '.gallery__figcaption--storage'
        ).lastElementChild.style.fill = 'var(--white-modal-text)';
        localFavorites.removeLocal(FAV_COCKTAIL_KEY, objDrink);
          if (document.querySelector('.gallery__title').textContent === 'Favorite cocktails') {
          target.closest('.gallery__item').classList.add('is-hidden-card');
          (!localFavorites.getLocal(FAV_COCKTAIL_KEY).length)?favCoctNothing.textContent = `You haven't added any favorite cocktails yet`:null;
          };
      };
    });
  });
}

function isInFavorites(id) {
  const local = localFavorites.getLocal(FAV_COCKTAIL_KEY);
  let filteredArray = local.filter(item => item !== null);
  if (filteredArray.length === 0) return;

  filteredArray.find(i => {
    if (i.idDrink === id.name) {
      id.firstElementChild.textContent = 'Remove';
      id.lastElementChild.style.fill = '#fd5103';
    }
  });
}
