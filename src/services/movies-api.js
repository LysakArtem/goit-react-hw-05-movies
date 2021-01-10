const API_KEY = 'b7722827b6d8f9667f6fee6631cb782a';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchTrending() {
  return fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Не удалось загрузить популярные фильмы`)
      );
    }
  );
}

function fetchMovies(query) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти фильм по запросу "${query}"`)
    );
  });
}

function fetchMovieDetails(id) {
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Не удалось найти фильм с идентификатором "${id}"`)
      );
    }
  );
}

function fetchCredits(id) {
  return fetch(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        `Не удалось найти информации о актёрском составе фильма с идентификатором "${id}"`
      )
    );
  });
}

function fetchReviews(id, page = 1) {
  return fetch(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти обзоры фильма с идентификатором "${id}"`)
    );
  });
}

const api = {
  fetchTrending,
  fetchMovies,
  fetchMovieDetails,
  fetchCredits,
  fetchReviews,
};

export default api;
