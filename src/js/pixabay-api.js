import axios from 'axios';
export class pixabayAPI {
  #API_KEY = '35143802-c7b3e6fa9e518d9fa57872857';
  #BASE_URL = 'https://pixabay.com/api/';
  #BASE_SEARCH_PARAMS = {
    key: this.#API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  q = null;
  page = 1;
  per_page = 40;

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        ...this.#BASE_SEARCH_PARAMS,
        q: this.q,
        page: this.page,
        per_page: this.per_page,
      },
    });
  }
}
