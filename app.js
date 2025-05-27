const API_URL = 'https://mcuapp.42web.io/wp-json/marvel-movies/v1/random';
const LOADING_TEXT = 'Loading...';
const BUTTON_TEXT = '🔄 Get Random Movie';

const elements = {
  btn: document.getElementById('randomBtn'),
  card: document.getElementById('movieCard'),
  poster: document.getElementById('moviePoster'),
  title: document.getElementById('movieTitle'),
  year: document.getElementById('movieYear'),
  cast: document.getElementById('movieCast'),
  imdb: document.getElementById('movieImdb'),
  synopsis: document.getElementById('movieSynopsis')
};

let isFlipped = false;

const updateElement = (element, label, content) => {
  element.innerHTML = label ? `<span class="font-bold">${label}:</span> ${content}` : content;
};

const toggleButtonState = (isLoading) => {
  elements.btn.disabled = isLoading;
  elements.btn.textContent = isLoading ? LOADING_TEXT : BUTTON_TEXT;
};

const updateMovieCard = (data) => {
  elements.poster.src = data.featured_image;
  updateElement(elements.title, '', data.title);
  updateElement(elements.year, 'Year', data.year);
  updateElement(elements.cast, 'Cast', data.cast);
  updateElement(elements.imdb, 'IMDB', `⭐ ${data.imdb_rating}`);
  updateElement(elements.synopsis, 'Synopsis', data.synopsis);
};

const handleError = (error) => {
  console.error('Error fetching movie:', error);
  alert('Failed to fetch movie.');
};

const resetCard = () => {
  elements.card.classList.remove('hidden', 'flipped');
  isFlipped = false;
};

async function fetchRandomMovie() {
  toggleButtonState(true);
  elements.card.classList.add('hidden');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    updateMovieCard(data);
    resetCard();
  } catch (error) {
    handleError(error);
  } finally {
    toggleButtonState(false);
  }
}

elements.btn.addEventListener('click', fetchRandomMovie);
elements.card.addEventListener('click', () => {
  isFlipped = !isFlipped;
  elements.card.classList.toggle('flipped', isFlipped);
});
