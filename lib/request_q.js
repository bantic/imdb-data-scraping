'use strict';

var rsvp = require('rsvp'),
    request = require('request');

var HEADERS = {
  'User-Agent': 'Chrome-like I guess'
};

module.exports = {
  request: function(url_or_options) {
    var options;

    if (url_or_options.url) {
      options = url_or_options;
    } else {
      options = {url: url_or_options};
    }

    options.headers = HEADERS;

    return new rsvp.Promise(function(resolve, reject){
      request(options, function(err, resp, body){
        if (err) { return reject(err); }

        return resolve(body);
      });
    });
  }
};
