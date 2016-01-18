'use strict';

app.utils = {
  removeObject: function(obj, match) {
    var queued = [];
    _.each(obj, function(queue) {
      if (!_.isEqual(queue, match)) {
        queued.push(queue);
      }
    });

    return queued;
  },

  addObject: function(obj, match) {
    obj.push(match);
    return obj;
  },

  getNthObjectKey: function(obj, n) {
    var nth = [];
    var i = 0;
    _.each(obj, function(item, key) {
      if (i === n) {
        nth = key;
      }
      i++;
    });
    return nth;
  },

  /**
   * Parse query string.
   * https://gist.github.com/ryoppy/5780748
   * ?a=b&c=d to {a: b, c: d}
   * @param {String} (option) queryString
   * @return {Object} query params
   */
  getQueryParams: function(queryString) {
    var query = (queryString || window.location.search).substring(1); // delete ?
    if (!query) {
      return false;
    }

    return _
        .chain(query.split('&'))
        .map(function(params) {
          var p = params.split('=');
          return [p[0], decodeURIComponent(p[1])];
        })
        .object()
        .value();
  },
};