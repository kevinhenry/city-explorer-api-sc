'use strict';

const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const movie = require('./modules/movies.js');
const app = express();

require('dotenv').config();

app.use(cors());

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
}  

app.get('/movies', movieHandler);

function movieHandler(request, response) {
  const { location } = request.query;
  movie(location)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
}  

app.listen(process.env.PORT, () => console.log(`Server up on PORT ${process.env.PORT}`));
