'use strict';
import { FetchCocktails } from './fetch';
import {renderPagination} from './pagination-show';

// import { galleryMarkUp } from './markup';
// import { showCocktailDetails } from './modalcocktails';
// import {localFavorites} from './localfavorites';

function hero(){
    const Refs = {
    tableTd: document.querySelector('.contain__table'),
    selectList: document.querySelector('.select__list'),
    galleryTitle: document.querySelector('.gallery__title'),
    selectDown: document.querySelector('.js-sel-first'),
    selectDrop: document.querySelector('.js-sel-sec'),
    selectTitle: document.querySelector('.js-sel-title'),
    selectMain: document.querySelector('.select__wrapper--first'),
    
    };

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
Refs.selectList.insertAdjacentHTML('beforeend',`<li class="select__item" data-value="${charsItems[j]}">${charsItems[j]}</option>`);
}
catch{
    // console.log("not main page");
}

}
if (Refs.tableTd) {
    Refs.tableTd.innerHTML = sum;
    Refs.tableTd.addEventListener('click',(ev)=>{
        if(ev.target.dataset['value']) {
                if(document.querySelector('.table__item--active')) {
                document.querySelector('.table__item--active').classList.remove('table__item--active')}
                ev.target.classList.add('table__item--active');
                sendRequest(ev.target.dataset['value']);
        }
    });
};

try{
Refs.selectDown.addEventListener('click',(ev)=>{
    Refs.selectDrop.classList.toggle('is-hidden-card')
    Refs.selectMain.classList.toggle('hero__orange');
});
Refs.selectList.addEventListener('click',(ev)=>{
    Refs.selectTitle.textContent = ev.target.dataset['value'];
    Refs.selectDrop.classList.toggle('is-hidden-card');
    Refs.selectMain.classList.toggle('hero__orange');
    sendRequest(ev.target.dataset['value'])}
    );
}
catch{
    // console.log('not main page')
}

function sendRequest(ev){
    const letter = ev.toLowerCase();

    const fetchCocktails = new FetchCocktails();
    // const galleryListEl = document.querySelector('.gallery__list');


    // let drinks = [];
    fetchCocktails.fetchCocktailsByFirstLetter(letter).then(res => {
        // drinks = res.data.drinks;
            Refs.galleryTitle.textContent = `Searching results`;

            renderPagination(res.data);
        }
      )
      .catch(e=>console.log(e));
}
}

export default hero();
