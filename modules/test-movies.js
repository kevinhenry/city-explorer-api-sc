'use strict';

const cache = require('./cache.js');
const superagent = require ('superagent');

function getMovies(request, response) {
  const key = 'movies-' + request.query.location;
  const url = 'https://api.themoviedb.org/3/search/movie';
  const queryParams = {
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.location,
  };
  
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url).query(queryParams)
    .then(response => parseMovies(response.body));
  }
  
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.data.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
    
  }
}

class Movie {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getMovies;