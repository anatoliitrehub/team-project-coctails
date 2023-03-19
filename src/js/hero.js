'use strict';
import { galleryMarkUp } from './markup';
import { FetchCocktails } from './fetch';
import { showCocktailDetails } from './modalcocktails';
import {renderPagination} from './pagination-show';
import {localFavorites} from './localfavorites';

function hero(){
    const tableTd = document.querySelector('.contain__table');
    const select = document.querySelector('.select__list');
    const galleryTitle = document.querySelector('.gallery__title');
    const selectDown = document.querySelector('.js-sel-first');
    const selectDrop = document.querySelector('.js-sel-sec');
    const selectTitle = document.querySelector('.js-sel-title');
    const selectMain = document.querySelector('.select__wrapper--first');

    const charsItems = [];                  // contsiner all chars
    for (let i=65; i<91; i++){              // letters
    charsItems.push(String.fromCharCode(i))
}

for (let i=49; i<58; i++){                  // numbers 1-9
    charsItems.push(String.fromCharCode(i))
}

charsItems.push(String.fromCharCode(48))    // number 0
// console.log(charsItems)

let sum = '';

for (let j=0;j<charsItems.length;j++){
if (j==0|| j==13 || j==26) sum +=`<tr>`;
if (j==26) {
    sum += `<td class="table__item"></td>`;
}
sum += `<td class="table__item" data-value="${charsItems[j]}">${charsItems[j]}</td>`;
if (j==12 || j==25 || j==38) sum +=`</tr>`;

try{
select.insertAdjacentHTML('beforeend',`<li class="select__item" data-value="${charsItems[j]}">${charsItems[j]}</option>`);
}
catch{
    // console.log("not main page");
}

}
if (tableTd) {
    tableTd.innerHTML = sum;
    tableTd.addEventListener('click',(ev)=>{
        if(ev.target.dataset['value']) {
                if(document.querySelector('.table__item--activ')) {
                document.querySelector('.table__item--activ').classList.remove('table__item--activ')}
                ev.target.classList.add('table__item--activ');
                sendRequest(ev.target.dataset['value']);
        }
    });
};

try{
selectDown.addEventListener('click',(ev)=>{
    selectDrop.classList.toggle('is-hidden-card')
    selectMain.classList.toggle('hero__orange');
});
select.addEventListener('click',(ev)=>{
    selectTitle.textContent = ev.target.dataset['value'];
    selectDrop.classList.toggle('is-hidden-card');
    selectMain.classList.toggle('hero__orange');
    sendRequest(ev.target.dataset['value'])}
    );
}
catch{
    // console.log('not main page')
}

function sendRequest(ev){
    const letter = ev.toLowerCase();

    const fetchCocktails = new FetchCocktails();
    const galleryListEl = document.querySelector('.gallery__list');


    let drinks = [];
    fetchCocktails.fetchCocktailsByFirstLetter(letter).then(res => {
        drinks = res.data.drinks;
            galleryTitle.textContent = `Searching results`;

            renderPagination(res.data);
        }
      )
      .catch(e=>console.log(e));
}
}

export default hero();
