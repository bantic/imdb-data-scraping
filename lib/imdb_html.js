var request_q = require('./request_q');

var BASE_URL = 'http://www.imdb.com';
var SEARCH_URL = BASE_URL + '/find';
var RELEASE_INFO_URL = BASE_URL + '/title/IMDB_ID/releaseinfo';

module.exports = {
  releaseInfo: function(imdbId){
    console.log('getReleaseInfo',imdbId);
    var fs = require('fs');
    var rsvp = require('rsvp');
    return new rsvp.Promise(function(resolve, reject){
      fs.readFile(__dirname + '/../data/sting-release.html', function(err, data){
        if (err) { return reject(err); }

        return resolve(data.toString());
      });
    });

    //var url = RELEASE_INFO_URL.replace('IMDB_ID',imdbId);
    //return request_q.request(url);
  },
  search: function(title){
    var options = {
      url: SEARCH_URL,
      qs: {q: title}
    };
    return request_q.request(options);
  }
};
