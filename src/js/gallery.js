import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { pixabayAPI } from './pixabay-api';
import createGalleryCards from '../templates/gallery-card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({ position: 'center-center', cssAnimationStyle:'zoom' });

const loadMoreBtn = document.querySelector('.load__more');
const searchQueryEl = document.querySelector('#request');
const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

searchQueryEl.focus();
const pixabay = new pixabayAPI();

let gallery = new SimpleLightbox('.gallery a');

const handleSearchPhotos = async event => {
  event.preventDefault();
  galleryEl.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  const searchQuery = searchQueryEl.value.trim();
  pixabay.q = searchQuery;

  try {
    const { data } = await pixabay.fetchPhotos();

    if (!data.hits.length) {
      Notiflix.Notify.failure('Images not found!');
      return;
    }

    galleryEl.innerHTML = createGalleryCards(data.hits);

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

    gallery.refresh();

    const totalPages = Math.ceil(data.totalHits / pixabay.per_page);
    if (totalPages === pixabay.page) {
      return;
    }

    loadMoreBtn.classList.remove('is-hidden');
  } catch (err) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.failure('Images not found!');
  }
};

const handleLoadMore = async () => {
  pixabay.page += 1;
  gallery.refresh();

  try {
    const { data } = await pixabay.fetchPhotos();

    const totalPages = Math.ceil(data.totalHits / pixabay.per_page);
    if (totalPages === pixabay.page) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', handleSearchPhotos);
loadMoreBtn.addEventListener('click', handleLoadMore);

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });


