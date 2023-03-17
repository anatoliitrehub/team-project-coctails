'use strict';

import { galleryMarkUp, addOnLearnMoreClick } from './markup';
import { FetchCocktails } from './fetch';
import { showCocktailDetails } from './modalcocktails';
import { localFavorites } from './localfavorites';
import { showCocktailDetails } from './modalcocktails';


const galleryListEl = document.querySelector('.gallery__list');
const galleryTitle = document.querySelector('.gallerry__title-main-wrepper');

const FAV_COCKTAIL_KEY = "favcockt";

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
  const drinks = result.flatMap(item => item.data.drinks);
  console.log("Promise.all  drinks:", drinks)
  const idDrink = drinks.map(drink => drink.idDrink);
  console.log(idDrink);


  




  if (window.innerWidth >= 1280) {
    galleryTitle.innerHTML =  `<h2 class="gallery__title">Cocktails</h2> `;
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(drinks));
  } else if (window.innerWidth < 768) {
    const mobileDrinks = drinks.slice(0, 3);
    galleryTitle.innerHTML =  `<h2 class="gallery__title">Cocktails</h2> `;
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(mobileDrinks));
  } else {
    const tabletDrinks = drinks.slice(0, 6);
    galleryTitle.innerHTML =  `<h2 class="gallery__title">Cocktails</h2> `;
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkUp(tabletDrinks));
  }
  addOnLearnMoreClick(drinks);

  
  const btnAddTo = document.querySelectorAll('.gallery__figcaption--storage');
  const btnIcon = document.querySelectorAll('.gallery__figcaption--icon');
  console.log(btnIcon)
  let booleanBtnAddTo = false;

  isInFavorites(idDrink);

  const toggleAdd = ({ target }) => {
    if (
      !target.classList.contains('gallery__figcaption--storage') &&
      !target.classList.contains('gallery__figcaption--text') &&
      !target.classList.contains('gallery__figcaption--svg')
    ) {
      return;
    };

    const idBtn = target.closest('.gallery__figcaption--storage').name;
    const objDrink = drinks.find(el => el.idDrink === idBtn);


    if (target.closest('.gallery__figcaption--storage').firstElementChild.textContent === 'Add to') {
       target.closest('.gallery__figcaption--storage').firstElementChild.textContent = 'Remove';
      target.closest('.gallery__figcaption--storage').lastElementChild.style.fill = '#fd5103';
      localFavorites.addLocal(FAV_COCKTAIL_KEY, objDrink)
    } else {
      target.closest('.gallery__figcaption--storage').firstElementChild.textContent = 'Add to';
      target.closest('.gallery__figcaption--storage').lastElementChild.style.fill = '#fff';
      localFavorites.removeLocal(FAV_COCKTAIL_KEY, objDrink);
    };
  }
    



  //     let currentCocktail = {};

  //     function showCocktail(cocktail) {
  
  // const dataCocktail = localFavorites.getLocal('favcock').find(obj => obj.idDrink === cocktail.idDrink);
  // if(dataCocktail){
  //   elemRefs.addBtn.classList.add('is-hidden-btn')
  //     elemRefs.removeBtn.classList.remove('is-hidden-btn')
  // }else{
  //   elemRefs.addBtn.classList.remove('is-hidden-btn')
  //     elemRefs.removeBtn.classList.add('is-hidden-btn')
  // }

  //     const isInFav = isInFavorites(currentIngredient.idIngredient);
  //     elemRefs.favoriteBtn.textContent = favoriteText(!isInFav);

    //   if (isInFav) {
    //     localFavorites.removeLocal(FAV_INGREDIENTS_KEY, currentIngredient);
    //   } else {
    //     localFavorites.addLocal(FAV_INGREDIENTS_KEY, currentIngredient);
    //   }

    //   btnAddTo.textContent = 'Remove';
    //   btnIcon.style.fill = `#fd5103`;
    //   booleanBtnAddTo = true;
    //   return;
    // } else {
    //   btnAddTo.textContent = 'Add to';
    //   btnIcon.style.fill = `#fcfcfc`;
    //   booleanBtnAddTo = false;
    //   return;
    // }




  function isInFavorites(id) {
  const local = localFavorites.getLocal(FAV_COCKTAIL_KEY);
  console.log(local);
  const found = local.find(obj => obj.idDrink === id);

  for (const loc of local) {
    for (const id of idDrink) {
      if (loc.idDrink === id) {
        
        btnIcon.forEach(el => {
          if (el.parentElement.name === id) {
            el.style.fill = `#fd5103`;
            el.previousElementSibling.textContent = 'Remove';
            console.log('кнопка закрасилась');
          }
        })
      }
    }
  }

  return found !== undefined;
}



  galleryListEl.addEventListener('click', toggleAdd);
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
