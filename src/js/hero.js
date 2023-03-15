'use strict';
import { galleryMarkUp } from './markup';
import { FetchCocktails } from './fetch';

function hero(){
    const tableTd = document.querySelector('.contain__table');
    const select = document.querySelector('.contain__select');
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

select.insertAdjacentHTML('beforeend',`<option class="select__item" data-value="${charsItems[j]}">${charsItems[j]}</option>`)

}
if (tableTd) {
    tableTd.innerHTML = sum;
    tableTd.addEventListener('click',(ev)=>sendRequest(ev.target.dataset['value']));
};

select.addEventListener('change',(ev)=>sendRequest(ev.target['value']));


function sendRequest(ev){
    const letter = ev.toLowerCase();

    const fetchCocktails = new FetchCocktails();
    const galleryListEl = document.querySelector('.gallery__list');

    fetchCocktails.fetchCocktailsByFirstLetter(letter).then(res => {
        // console.log(res.data.drinks)
        if (res.data.drinks !== null) {
            galleryListEl.innerHTML = galleryMarkUp(res.data.drinks);
        }
    });
}
}

export default hero();
