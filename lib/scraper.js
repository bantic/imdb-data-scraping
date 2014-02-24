'use strict';

var movieDataFile = __dirname + '/../data/movies.json';
var monthDataFile = __dirname + '/../data/months.json';

var rsvp = require('rsvp'),
    request = require('./request_q').request,
    cheerio = require('cheerio'),
    imdb_api = require('./imdb_api'),
    jsonfile = require('jsonfile');

var movies = jsonfile.readFileSync(movieDataFile);
var months = {};

Object.keys(movies).forEach(function(year){
  var movieData = movies[year];

  var month = movieData.releaseMonth;
  var monthData = months[month] || {value: 0};

  monthData.value  = monthData.value + 1;
  monthData.titles = monthData.titles || [];
  monthData.titles.push(movieData.title);

  months[month] = monthData;
});

jsonfile.writeFileSync(monthDataFile, months);


