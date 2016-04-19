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
   * inserts the string value (third parameter) before the specified integer index (second parameter) in the string str (first parameter), and then returns the new string without changing str
   * @param str
   * @param index
   * @param value
   * @returns {string}
   */
  insert: function(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  },

  /**
   * Test if a string is all numeric or not
   * @param string
   * @returns {boolean}
   */
  isNumeric: function(string) {
    var hasNumber = /^\d+$/;
    return hasNumber.test(string);
  }

};
