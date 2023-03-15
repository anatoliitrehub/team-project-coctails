'use strict';

import { galleryMarkUp } from './markup';
import { FetchCocktails } from './fetch';

const fetchCocktails = new FetchCocktails();

const galleryListEl = document.querySelector('.gallery__list');

const arr = [];

for (let index = 0; index < 9; index++) {
    const fetchResult = fetchCocktails.fetchCocktailsRandom().then(data => {
        if (!data) {
            return new Promise();
        }
        return data;
    })
    if (fetchResult) {
        // console.log(fetchResult);
        arr.push(fetchResult);
    }
};


Promise.all(arr).then((res) => {
    res.map(el => console.log(el))
    galleryListEl.innerHTML = galleryMarkUp(res.data.drinks[0]);
});


// fetchCocktails.fetchCocktailsByFirstName('bellini').then(res => console.log(res));

// fetchCocktails.fetchCocktailsByFirstLetter('a').then(res => console.log(res));