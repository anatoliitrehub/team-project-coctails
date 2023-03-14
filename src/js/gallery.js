'use strict';

import { galleryMarkUp } from './markup';
import { FetchCoctails } from './fetch';

const fetchCoctails = new FetchCoctails();

const galleryListEl = document.querySelector('.gallery__list');

const arr = [];

for (let index = 0; index < 9; index++) {
    const fetchResult = fetchCoctails.fetchCoctailsRandom().then(data => {
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


fetchCoctails.fetchCoctailsByFirstName('bellini').then(res => console.log(res));

fetchCoctails.fetchCoctailsByFirstLetter('a').then(res => console.log(res));