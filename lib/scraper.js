'use strict';

var liveSearch = false;

var rsvp = require('rsvp'),
    request = require('./request_q').request,
    cheerio = require('cheerio'),
    imdb_html = require('./imdb_html'),
    fs = require('fs');

var movies = require('./movies');

function getHTML(title){
  console.log('getHTML',title);
  if (liveSearch) {
    return imdb_html.search(title);
  }

  return new rsvp.Promise(function(resolve, reject){
    fs.readFile( __dirname + '/../data/rain-man.html', function(err, data){
      if (err) { return reject(err); }

      return resolve(data.toString());
    });
  });
}

function getReleaseDate(year){
  var title = movies[year].title;

  if (title === 'Rain Man') {
    return getHTML(title).then(function(html){
      var $ = cheerio.load(html);
      var results = $('.findSectionHeader:contains(Titles)').
        parent('.findSection').
        find('.findList .result_text');

      var matcher = new RegExp( '\\((' + year + ')\\)' );
      console.log('matcher', matcher);

      var imdbId;

      results.each(function(i, el){
        if (imdbId) { return; }

        var text = $(this).text();
        var match = matcher.exec(text);
        if (match) {
          var href = $(this).find('a').attr('href');
          var matchId = /(tt\d+)\//;
          match = matchId.exec(href);
          console.log('match!',match);
          imdbId = match[1];
        }
      });

      movies[year].imdbId = imdbId;
    }).catch(function(e){
      console.log('error',e,e.stack);
    });
  }

  return rsvp.resolve();
}

var promises = Object.keys(movies).map(getReleaseDate);

rsvp.all(promises).then(function(results){
  console.log(movies);
});


