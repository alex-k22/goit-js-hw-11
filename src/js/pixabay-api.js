
export class pixabayAPI {
   #API_KEY = '35143802-c7b3e6fa9e518d9fa57872857';
   #BASE_URL =  'https://pixabay.com/api';
   #BASE_SEARCH_PARAMS = {
    key: this.#API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
   };

   q = null;
   page = 1;
   per_page = 20;

   async fetchPhotos() {
    const searchParams = new URLSearchParams({
        ...this.#BASE_SEARCH_PARAMS,
        q: this.q,
        page: this.page,
        per_page: this.per_page,
    })

    const res = await fetch(`${this.#BASE_URL}/?${searchParams}`);
       if (!res.ok) {
           throw new Error(res.status);
       }
       return await res.json();
   }
}