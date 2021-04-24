'use strict';

const cache = require('./cache.js');
const superagent = require('superagent');

const getMovies = async (request, response) => {
  const key = 'movies-' + request.query.location;
  const url = 'https://api.themoviedb.org/3/search/movie';
  const queryParams = {
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.location,
  };
  // Cache results
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let movieResponse = await superagent.get(url).query(queryParams)
    let movies = await parseMovies(movieResponse);
    cache[key].data = movies;
  }
  
  return cache[key].data;
}

function parseMovies(movieData) {
  try {
    const movieSummaries = movieData.body.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);  
  }
}

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  // this.image_url = `${process.env.MOVIE_IMG_PREFIX_URL}${movie.poster_path}`;
  // this.image_url = movie.poster_path;
  this.image_url = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
  this.description = ` Overview ${movie.overview} | Average Votes = ${movie.votes_average} | Total Votes = ${movie.vote_count} | Poster ${movie.poster_path} | Popularity of ${movie.popularity} | Released on ${movie.release_date}.`; 
}

// node syntax for what we are exporting
module.exports = getMovies;