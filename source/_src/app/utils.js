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
   * Find last key of object
   * @param list
   * @returns {*}
   */
  findLastKey: function(list) {
    var lastKey = false;
    var cnt = 1;
    var total = _.keys(list).length;
    _.each(list, function(lst, key) {
      if (cnt === total) {
        lastKey = key;
      }

      cnt++;
    });

    return lastKey;
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

  /**
   * inserts the string value (third parameter) before the specified integer index (second parameter) in the string str (first parameter), and then returns the new string without changing str
   * @param str
   * @param index
   * @param value
   * @returns {string}
   */
  insert: function(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  },

};