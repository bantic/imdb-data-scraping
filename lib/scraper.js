'use strict';

var movieDataFile = __dirname + '/../data/movies.json';

var rsvp = require('rsvp'),
    request = require('./request_q').request,
    cheerio = require('cheerio'),
    imdb_api = require('./imdb_api'),
    jsonfile = require('jsonfile');

var movies = jsonfile.readFileSync(movieDataFile);

Object.keys(movies).forEach(function(year){
  var movieData = movies[year];

  var date = new Date(movieData.releaseDate);

  movieData.releaseYear  = date.getFullYear();
  movieData.releaseMonth = date.getMonth();
  movieData.releaseDay   = date.getDate();
});

jsonfile.writeFileSync(movieDataFile, movies);


