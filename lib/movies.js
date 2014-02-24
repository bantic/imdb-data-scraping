'use strict';

var cheerio = require('cheerio'),
    fs = require('fs');

var dataFile = __dirname + '/../data/best-pictures.html';

var data = fs.readFileSync(dataFile);
var $ = cheerio.load(data);

var movies = {
  // 2012: {title:'Argo'}, e.g.
};

$('a').each(function(i, el){
  var text = $(this).text(),
      match,
      title,
      year;

  match = text.match(/([12][09]\d\d).*"([^\"]+)"?/);

  if (match){
    year = parseInt(match[1], 10);
    title = match[2];

    movies[year] = {title:title};
  }
});

module.exports = movies;
