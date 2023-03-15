'use strict'
import { galleryMarkUp } from './markup';
import { FetchCocktails } from './fetch';

const hero = () =>{
    const tableTd = document.querySelector('.contain__table');
    const charsItems = [];
    for (let i=65; i<91; i++){
    charsItems.push(String.fromCharCode(i))
}

for (let i=49; i<58; i++){
    charsItems.push(String.fromCharCode(i))
}

charsItems.push(String.fromCharCode(48))
// console.log(charsItems)

let sum = '';

for (let j=0;j<charsItems.length;j++){
if (j==0) sum +=`<tr>`;
if (j==26) {
    sum += `<td class="table__item"></td>`;
}
sum += `<td class="table__item" data-value="${charsItems[j]}">${charsItems[j]}</td>`;
if (j==12 || j==25 || j==38) sum +=`</tr>`;

}
if (tableTd) {
    tableTd.innerHTML = sum;
    tableTd.addEventListener('click',sendRequest);
}


function sendRequest(ev){
    const letter = ev.target.dataset['value'].toLowerCase();
    console.log("letter is: ",letter)

    const fetchCocktails = new FetchCocktails();
    const galleryListEl = document.querySelector('.gallery__list');


    fetchCocktails.fetchCocktailsByFirstLetter(letter).then(res => {
        galleryListEl.innerHTML = galleryMarkUp(res.data.drinks);
      })
    // console.log(fetchLetter);
}

}



export default hero();