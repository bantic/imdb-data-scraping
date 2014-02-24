var imdb_html = require('./imdb_html'),
    cheerio = require('cheerio');

module.exports = {
  getReleaseInfo: function(imdbId){
    console.log('getReleaseInfo',imdbId);
    var fs = require('fs');
    var rsvp = require('rsvp');
    return new rsvp.Promise(function(resolve, reject){
      fs.readFile(__dirname + '/../data/sting-release.html');
    });
    /*
    return imdb_html.releaseInfo(imdbId).then(function(html){
      console.log('got htlm',html);
    }).catch(function(e){
      console.log('error',e,e.stack);
    });
   */
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
