var request_q = require('./request_q');

var BASE_URL = 'http://www.imdb.com';
var SEARCH_URL = BASE_URL + '/find';
var RELEASE_INFO_URL = BASE_URL + '/title/TITLE_ID/releaseinfo';

module.exports = {
  search: function(title){
    var options = {
      url: SEARCH_URL,
      qs: {q: title}
    };

    return request_q.request(options);
  }
};
