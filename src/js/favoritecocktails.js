// comment
'use strict';
import { localFavorites } from "./localfavorites";
import {renderPagination} from './pagination-show';


 function favoritecocktails(){
    const data = {
        drinks:localFavorites.getLocal('favcockt')
    };

    if(data){
    // console.log (data)
        // document.querySelector('.favorite-cocktails__text').innerHTML = '';
        document.querySelector('.favorite-cocktails__text').classList.add('is-hidden-card')
    renderPagination(data);
    }
    else document.querySelector('.favorite-cocktails__text').classList.remove('is-hidden-card')

    // document.querySelector('.gallery__list').innerHTML = data
}

export default favoritecocktails()