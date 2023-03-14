'use strict';

import axios from 'axios';

export class FetchCoctails {
  BASE_URL = 'https://thecocktaildb.com/api/json/v1/1/';

  async fetchCoctailsRandom() {
    const params = 'random.php';

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }

  async fetchCoctailsByFirstLetter(letter) {
    const params = `search.php?f=${letter}`;

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }

  async fetchCoctailsByFirstName(name) {
    const params = `search.php?s=${name}`;

    return await axios.get(`${this.BASE_URL}${params}`).then(response => {
      return response;
    });
  }
}
