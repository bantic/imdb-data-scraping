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

var monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

Object.keys(months).forEach(function(monthIndex){
  var monthData = months[monthIndex];

  monthSummary.push({
    value: monthData.value,
    monthIndex: monthIndex,
    monthName: monthNames[monthIndex],
    titles: monthData.titles
  });
});

jsonfile.writeFileSync(monthSummaryDataFile, monthSummary);


