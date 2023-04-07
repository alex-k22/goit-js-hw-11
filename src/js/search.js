import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { pixabayAPI } from './pixabay-api';
import createGalleryCards from '../templates/gallery-card.hbs';
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"

Notiflix.Notify.init({ position: 'center-top', distance: '50px', });

const loadMoreBtn = document.querySelector('.load__more');
const searchQueryEl = document.querySelector('#request');
const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const pixabay = new pixabayAPI();

const gallery = new simpleLightbox('.gallery a');

const handleSearchPhotos = event => {
  event.preventDefault();
  galleryEl.innerHTML = '';

  const searchQuery = searchQueryEl.value.trim();
  pixabay.q = searchQuery;

  pixabay
    .fetchPhotos()
    .then(({data}) => {
        console.log(data)
      if (!data.hits.length) {
        console.log(data.hits.length);
        throw new Error();
      }
      galleryEl.innerHTML = createGalleryCards(data.hits);
      
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      const totalPages = Math.ceil(data.totalHits / pixabay.per_page);
      if (totalPages === pixabay.page) {
        return;
      }

      loadMoreBtn.classList.remove('is-hidden');
    })
    .catch(() => {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure('Images not found!');
    });
};

const handleLoadMore = () => {
  pixabay.page += 1;

  pixabay.fetchPhotos().then(({data}) => {
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
    const totalPages = Math.ceil(data.totalHits / pixabay.per_page);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (totalPages === pixabay.page) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
    }
  });
};

searchFormEl.addEventListener('submit', handleSearchPhotos);
loadMoreBtn.addEventListener('click', handleLoadMore);

// let gallery = new SimpleLightbox('.gallery a');
