"use strict";
import { localFavorites } from './localfavorites';
import { renderPagination } from './pagination-show'

// import { header } from './header';
// import { modalcocktails } from './modalcocktails';
// import { modalingredients } from './modalingredients';

const searchCocResult = document.querySelector('.favorite-cocktails__text');

 function favoritecocktails(){
    
    const data = {
        drinks:localFavorites.getLocal('favcockt')
    };
    let localCounter = data.drinks.length;

    try{
    if(data.drinks.length){
    searchCocResult.textContent = '';
    renderPagination(data);
    }
    else {
        searchCocResult.textContent = `You haven't added any favorite cocktails yet`;
    }

    }
    catch{
        
    }
// let galList = document.querySelector('.gallery__list')
// galList.addEventListener('change',ev=>{
//     console.log(ev.target)
//     if(ev.target.closest('gallery__figcaption--storage')){
//     ev.target.closest('.gallery__item').classList.add('is-hidden-card');
//     localCounter--
// }
//     if(!localCounter){
//         favCoctNothing.textContent = `You haven't added any favorite cocktails yet`;}
    

// })

}

export default favoritecocktails()
