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
  },

  /**
   * Extract params from url
   * http://www.thecodeship.com/web-development/javascript-url-object/
   * @param options
   */
  urlObject: function(options) {
    "use strict";
    /*global window, document*/

    var url_search_arr,
        option_key,
        i,
        urlObj,
        get_param,
        key,
        val,
        url_query,
        url_get_params = {},
        a = document.createElement('a'),
        default_options = {
          'url': window.location.href,
          'unescape': true,
          'convert_num': true
        };

    if (typeof options !== "object") {
      options = default_options;
    } else {
      for (option_key in default_options) {
        if (default_options.hasOwnProperty(option_key)) {
          if (options[option_key] === undefined) {
            options[option_key] = default_options[option_key];
          }
        }
      }
    }

    a.href = options.url;
    url_query = a.search.substring(1);
    url_search_arr = url_query.split('&');

    if (url_search_arr[0].length > 1) {
      for (i = 0; i < url_search_arr.length; i += 1) {
        get_param = url_search_arr[i].split("=");

        if (options.unescape) {
          key = decodeURI(get_param[0]);
          val = decodeURI(get_param[1]);
        } else {
          key = get_param[0];
          val = get_param[1];
        }

        if (options.convert_num) {
          if (val.match(/^\d+$/)) {
            val = parseInt(val, 10);
          } else if (val.match(/^\d+\.\d+$/)) {
            val = parseFloat(val);
          }
        }

        if (url_get_params[key] === undefined) {
          url_get_params[key] = val;
        } else if (typeof url_get_params[key] === "string") {
          url_get_params[key] = [url_get_params[key], val];
        } else {
          url_get_params[key].push(val);
        }

        get_param = [];
      }
    }

    urlObj = {
      protocol: a.protocol,
      hostname: a.hostname,
      host: a.host,
      port: a.port,
      hash: a.hash.substr(1),
      pathname: a.pathname,
      search: a.search,
      parameters: url_get_params
    };

    return urlObj;
  }


};
