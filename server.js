'use strict';

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');

app.use(cors());

// const weather = require('./modules/weather.js');

const PORT = process.env.PORT || 3001;

app.get('/proof-of-life', (request, response) => response.send ('Proof of Life'));

// app.get('/weather', weatherHandler);

// const weatherHandler = (request, response) => {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT}`));
