'use strict';

import axios from 'axios';

export class fetchCocktails {
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
}
