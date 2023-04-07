import Notiflix from "notiflix";
import debounce from "lodash.debounce";
import { unsplashAPI } from "./pixabay-api";

Notiflix.Notify.init({ position: 'center-top' });

const loadMoreBtn = document.querySelector('.load__more');
const searchQueryEl = document.querySelector('#request');
const searchFormEl = document.querySelector('#search-form');

const DEBOUNCE_DELAY = 300;

const handleSubmit = (event)=> {
    event.preventDefault();
    console.log(searchQueryEl.value);
    loadMoreBtn.classList.remove("is-hidden");
    const result = new unsplashAPI;
    result.q = searchQueryEl.value;
    console.log(result.fetchPhotos());
}

const handleLoadMore = () => {
    
}

searchFormEl.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);