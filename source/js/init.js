/*! eLife - v0.0.1 - 2015-11-26
* https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend
* Copyright (c) 2015 eLife; Licensed  */
(function($) {
  'use strict';

  //Datepicker - https://eonasdan.github.io/bootstrap-datetimepicker/#linked-pickers
  $('#datetimepicker-start').datetimepicker({
    format: 'DD-MM-YY',
  });
  $('#datetimepicker-end').datetimepicker({
    format: 'DD-MM-YY',
    useCurrent: false, //Important! See issue #1075
  });
  $('#datetimepicker-start').on('dp.change', function(e) {
    $('#datetimepicker-end').data('DateTimePicker').minDate(e.date);
  });

  $('#datetimepicker-end').on('dp.change', function(e) {
    $('#datetimepicker-start').data('DateTimePicker').maxDate(e.date);
  });

})(jQuery);

(function($) {
  'use strict';

  //Filter Box
  $('.filter .dropdown-menu').on({
    click: function(e) {
      //Stop modal from closing if clicked anywhere inside
      e.stopPropagation();
    },
  });

})(jQuery);

(function($) {
  'use strict';

  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  var App = {
    init: function() {
      this.queued = {};
      this.bindEvents();
    },

    bindEvents: function() {
      $('.toggle-publish-all').on('change', this.togglePublishAllBtn.bind(this));
      $('#btn-publish-selected').on('click', this.publishSelected.bind(this));
      $('.btn-publish').on('click', this.publish.bind(this));
    },

    togglePublishAllBtn: function(e) {
      console.log('togglePublishAll');
      $('#btn-publish-selected').show(); //@TODO not working
      var article = this.getArticleData($(e.target));
      this.populateQueue(article);
    },

    publishSelected: function() {
      console.log('publishSelected');
      var isMultiple = (_.size(this.queued) > 1) ? true : false;
      this.initModal(isMultiple);
      this.displayQueue();
    },

    publish: function(e) {
      console.log('publish');
      var article = this.getArticleData($(e.target));
      this.initModal(false);
      this.populateQueue(article);
      this.displayQueue();
    },

    initModal: function(isMultiple) {
      console.log('initPublishModal');
      var btnText = (isMultiple) ? 'Publish All' : 'Publish';
      $('#articles-queue', '#publish-modal').empty();
      $('#publish-action', '#publish-modal').empty().text(btnText);
    },

    getArticleData: function(target) {
      console.log('getArticleData');
      var targetParent = target.parents('tr');
      var articleId = targetParent.attr('data-article-id');
      var articleVer = targetParent.attr('data-article-version');
      return articleId + '-v' + articleVer;
    },

    populateQueue: function(article) {
      console.log('populateQueue');
      if (_.isUndefined(this.queued[article])) {
        this.queued[article] = '';
      } else {
        delete this.queued[article];
      }
    },

    displayQueue: function(article) {
      console.log('displayQueue');
      $.each(this.queued, function(key) {
        $('#articles-queue').append('<li>' + key + '</li>');
      });
    },

  };

  App.init();

  /// Code still to be refactored

  //Global variables
  var dataStructure = []; //Data structure for the ajax request
  var articlesQueue = {}; //JS Object that holds the article-ids to be queued/published
  var articleId;
  var articleVer;
  var queueDress; //Variables to prepare the article-id(s) for use


  //Poll
  function queueArticlePublication() {

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8008/queue_article_publication',
      data: {articles: dataStructure.join(',')},
      error: function(xhr, textStatus, errorThrown) {
        var err = textStatus + ', ' + errorThrown;
        console.log('Request Failed: ' + err);
      },
    }).done(function(data, textStatus) {

      //Loop through all the key, value pairs in returned JS Object from server
      $.each(data, function(key, value) {

        //Check if key exists in JS Object and the same key from server's response has the value 'queued'
        if (articlesQueue.hasOwnProperty(key) && value === 'queued') {

          //If not showing the spinner
          if ($('#publish-action *:not(div)')) {
            //Show the publish (all) spinner in progress
            $('#publish-action').empty().append('<div class="throbber-loader">Loading…</div>');
          }

          //Edit the JS Object with the value from server's response
          articlesQueue[key] = value;
        } else if (articlesQueue.hasOwnProperty(key) && value === 'error') {

          var keyCheck = "#articles-queue li:contains('" + key + "')";

          //Show error(s) to the user next to article(s) & Remove article-id(s) from JS Object
          $(keyCheck).append('<span class="glyphicon glyphicon-remove glyphicon-remove--stat" data-toggle="tooltip" data-placement="top" title=" + value + "></span>');
          delete articlesQueue[key];
        }

        //If the JS Object is empty then
        if (jQuery.isEmptyObject(articlesQueue)) {
          //Feedback to the user
          $('#publish-action').unbind().text('Close').attr('disabled', false);

          //Bind a reload to the click
          $('#publish-action').click(function() {
            location.reload(true);
          });
        }

        //Initialise Tooltips
        $('[data-toggle="tooltip"]').tooltip();

      });

      //Prepare the data structure
      dataStructure = [];
      $.each(articlesQueue, function(key) {
        dataStructure.push(key);
      });
    });
  }

  //Responses
  function getArticleStatus() {

    $.ajax({
      type: 'GET',
      url: 'http://localhost:8008/check_article_status',
      data: {articles: dataStructure.join(',')},
      error: function(xhr, textStatus, errorThrown) {
        var err = textStatus + ', ' + errorThrown;
        console.log('Request Failed: ' + err);
      },
    }).done(function(data, textStatus) {

      //Loop through all the key, value pairs in returned JS Object from server
      $.each(data, function(key, value) {

        var keyCheck = "#articles-queue li:contains('" + key + "')";

        //Check if key exists in JS Object and the same key from server's response has the value 'published'
        if (articlesQueue.hasOwnProperty(key) && value === 'published') {

          //Show published status to the user next to article(s) & Remove article-id(s) from JS Object
          $(keyCheck).append('<span class="glyphicon glyphicon-ok glyphicon-ok--stat" data-toggle="tooltip" data-placement="top" title="' + value + '"></span>');
          delete articlesQueue[key];
        } else if (articlesQueue.hasOwnProperty(key) && value === 'error') {

          //Show error status to the user next to article(s) & Remove article-id(s) from JS Object
          $(keyCheck).append('<span class="glyphicon glyphicon-remove glyphicon-remove--stat" data-toggle="tooltip" data-placement="top" title="' + value + '"></span>');
          delete articlesQueue[key];
        }

      });

      //Initialise Tooltips
      $('[data-toggle="tooltip"]').tooltip();

      //If the JS Object is still not empty then
      if (!jQuery.isEmptyObject(articlesQueue)) {

        //Prepare the data structure
        dataStructure = [];
        $.each(articlesQueue, function(key) {
          dataStructure.push(key);
        });

        //Loop this function every 10 seconds
        setTimeout(function() {
          getArticleStatus();
        }, 10000);
      } else {

        //Feedback to the user
        $('#publish-action').unbind().text('Close').attr('disabled', false);

        //Bind a reload to the click
        $('#publish-action').click(function() {
          location.reload(true);
        });
      }
    });
  }





  //Publish all (all) button in the popup
  $('#publish-action').click(function() {

    //Disable Publish (all) button to stop sending multiple requests
    $('#publish-cancel').hide();
    $(this).empty().attr('disabled', true).css({width: '100%'});

    //Prepare the data structure
    $.each(articlesQueue, function(key) {
      dataStructure.push(key);
    });

    //Poll endpoint if articles can be queued
    queueArticlePublication();

    //Wait 5 seconds for the first response
    setTimeout(function() {
      //If the JS Object is not empty then
      if (!jQuery.isEmptyObject(articlesQueue)) {
        getArticleStatus();
      }
    }, 5000);

    //Click Close icon to close modal & force reload
    $('#publish-modal button.close').click(function() {
      location.reload(true);
    });

    //Or press ESC & force a reload
    $(document).keyup(function(e) {
      if (e.keyCode === ESCAPE_KEY) {
        location.reload(true);
      }
    });
  });

})(jQuery);

(function(w) {
  var sw = document.body.clientWidth;
  var sh = document.body.clientHeight;

  $(w).resize(function() { //Update dimensions on resize
    sw = document.body.clientWidth;
    sh = document.body.clientHeight;

    //updateAds();

  });

  //Navigation toggle
  $('.nav-toggle-menu').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
  });

  //Navigation toggle
  $('.nav-toggle-search').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header .search-form').toggleClass('active');
  });
})(this);
