'use strict';

import axios from 'axios';

export class FetchCocktails {
  BASE_URL = 'https://thecocktaildb.com/api/json/v1/1/';

  async fetchCocktailsRandom() {
    const params = 'random.php';

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }

  async fetchCocktailsByFirstLetter(letter) {
    const params = `search.php?f=${letter}`;

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }

  async fetchCocktailsByFirstName(name) {
    const params = `search.php?s=${name}`;

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }

  async fetchIngridientsByName(name) {
    const params = `search.php?i=${name}`;

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }
}

// В класі FetchCocktails є 3 методи (fetchCocktailsRandom, fetchCocktailsByFirstLetter, fetchCocktailsByFirstName)
// Імпортуємо собі в свій файл даний класс import { FetchCocktails } from './fetch';
// Створюємо від нього інстанс const fetchCocktails = new FetchCocktails();
// Вже в змінній fetchCocktails є ці 3 функції.

// метод/функція fetchCocktailsByFirstName(name) використовується в середині колбєк функції на подію submit,
// приймає ім'я яке ми вносимо в інпут (event.target.value). Далі функція робить запит і повертає проміс,
// на який ми потім підписуємось then(). I далі в середині цього then
// ми прописуємо совою логіку, наприклад створюємо розмітку:
//
//                        ПРИКЛАД ВИКОРИСТАННЯ:
// fetchCocktails.fetchCocktailsByFirstLetter(name).then(res => {
//   galleryListEl.innerHTML = galleryMarkUp(res.data.drinks);
// })

// З методом/функцією fetchCocktailsByFirstLetter така ж історія.
// Імпортуємо клас, робимо від нього собі інстанс. Тепер в Вашому файлі є об'єкт fetchCocktails з функцією fetchCocktailsByFirstLetter.
// Використовуємо її в середині колбек функції на подію клік