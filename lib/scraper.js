'use strict';

var movieDataFile = __dirname + '/../data/movies.json';
var monthDataFile = __dirname + '/../data/months.json';
var monthSummaryDataFile = __dirname + '/../data/months_array.json';

var rsvp = require('rsvp'),
    request = require('./request_q').request,
    cheerio = require('cheerio'),
    imdb_api = require('./imdb_api'),
    jsonfile = require('jsonfile');

var months = jsonfile.readFileSync(monthDataFile);
var monthSummary = [];

Object.keys(months).forEach(function(monthIndex){
  var monthData = months[monthIndex];

  monthSummary.push({
    value: monthData.value,
    monthIndex: monthIndex,
    titles: monthData.titles
  });
});

jsonfile.writeFileSync(monthSummaryDataFile, monthSummary);


