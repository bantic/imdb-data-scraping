'use strict';

var liveSearch = true;

var rsvp = require('rsvp'),
    request = require('./request_q').request,
    cheerio = require('cheerio'),
    imdb_api = require('./imdb_api'),
    fs = require('fs');

var movies = require('../data/movies');

/*
var promises = Object.keys(movies).map(function(year){
  var movieData = movies[year],
      imdbId    = movieData.imdbId;

  return imdb_api.getReleaseInfo(imdbId).then(function(info){
    console.log('releaes info for ',movieData.title,info);
  });
});
*/

var sting = movies['1973'];
console.log('sting',sting);
imdb_api.getReleaseInfo(sting.imdbId, {hintYear: sting.year}).
  then(function(info){

  console.log('got info',info);
});

