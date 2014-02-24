var imdb_html = require('./imdb_html'),
    cheerio = require('cheerio');

var monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

// rawDate: '25 December 1973'
function parseDate(rawDate){
  var dateMatch = /(\d\d?) (\w+) (\d{4})/;

  var match = dateMatch.exec(rawDate);
  if (!match) { return; }
  var day = match[1], monthName = match[2], year = match[3];
  var month = monthNames.indexOf(monthName);
  if (month === -1) { return; }

  return new Date(year, month, day);
}

module.exports = {
  getReleaseInfo: function(imdbId, options){
    options = options || {};
    var targetCountry = options.country || 'USA';
    var hintYear = options.hintYear;

    var results = {
      country: null,
      date:    null
    };

    console.log('getReleaseInfo');
    return imdb_html.releaseInfo(imdbId).then(function(html){
      var $ = cheerio.load(html);

      var data = [];

      var cells = $('table#release_dates tr');
      cells.each(function(i, el){
        var country = $(this).find('td:nth-of-type(1)').text();
        var rawDate = $(this).find('td:nth-of-type(2)').text();
        var notes = $(this).find('td:nth-of-type(3)').text();

        data.push({country:country,
                   rawDate:rawDate,
                   date:   parseDate(rawDate),
                   notes:notes});
      });

      var dataFound = false;

      data.reverse();

      data.forEach(function(datum){

        var country = datum.country,
            date    = datum.date,
            notes   = datum.notes;

        if (dataFound) { return; }
        if (country !== targetCountry) { return; }
        if (!date) { return; }

        if (hintYear) {
          var year = date.getFullYear();
          if (Math.abs(year-hintYear) > 1) {
            return;
          }
        }

        if (notes.indexOf('re-release') !== -1) {
          return;
        }

        dataFound = true;
        results.date = date;
        results.country = country;

      });
    }).then(function(){

      return results;
    }).catch(function(e){
      console.log('error',e,e.stack);
    });
  },

  getImdbId: function(title, year){
    var imdbId,
        href,
        match;

    var matchYear = new RegExp( '\\((' + year + ')\\)' );
    var matchId = /(tt\d+)\//;

    return imdb_html.search(title).then(function(html){
      var $ = cheerio.load(html);
      var results = $('.findSectionHeader:contains(Titles)').
        parent('.findSection').
        find('.findList .result_text');

      results.each(function(i, el){
        if (imdbId) { return; }

        var text = $(this).text();
        match = matchYear.exec(text);

        if (!match) {
          return;
        }

        var href = $(this).find('a').attr('href');
        match = matchId.exec(href);
        if (!match) { return; }

        imdbId = match[1];
      });
    }).then(function(){
      return imdbId;
    }).catch(function(err){
      console.log('Error',err,err.stack);
    });
  }
};
