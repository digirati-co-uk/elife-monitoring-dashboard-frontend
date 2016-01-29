'use strict';

app.detail = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.detail-page').length > 0) {
      this.article = [];
      this.currentEvents = [];
      this.currentArticle = [];
      this.queryParams = {};
      Swag.registerHelpers(Handlebars);
      this.setArticleParams();
      this.setPageUrl();
      this.getArticle();
      this.bindEvents();
    }
  },

  setPageUrl: function() {
    //@TODO redirect to latest url if no params
    history.pushState(this.queryParams, '', this.formUrl());
  },
  /**
   * Bind events
   */
  bindEvents: function() {
    $('#article', '.detail-page').on('click', '.article-version-map-list .run-container .run a', this.updateRun.bind(this));
    $('#article', '.detail-page').on('click', '.btn-publish', this.publish.bind(this));
  },

  /**
   * Bind navigation events
   */
  bindNavigationEvents: function() {
    $('.run-container li a').on('click', function(e) {
      e.preventDefault();
      var link = this.href;
      if (app.config.ISPP) {
        var extraUrl = 'patterns/04-pages-01-detail/04-pages-01-detail.html?/';
        link = app.utils.insert(this.href, this.href.indexOf('article'), extraUrl);
      }

      // Create a new history item.
      history.replaceState(app.detail.queryParams, '', link);
    });
  },

  /**
   * Get article from param in url
   */
  getArticle: function() {
    var url;
    var message;
    if (!_.isUndefined(this.queryParams.articleId)) {
      $.ajax({
        url: app.API + 'api/article/' + this.queryParams.articleId,
        cache: false,
        dataType: 'json',
        success: function(article) {
          app.detail.article = article;
          app.detail.currentArticle = app.detail.getCurrentArticle();
          app.detail.currentEvents = app.detail.getCurrentRun();
          app.detail.renderArticle();
        },

        error: function(data) {
          this.errorTemplate = eLife.templates['error-render'];
          $('#article').empty().html(this.errorTemplate(data));
        },

      });
    } else {
      this.errorTemplate = eLife.templates['error-render'];
      message = 'No ArticleId was supplied. <br /><br />';
      $('#article').empty().html(this.errorTemplate({message: message}));
    }
  },
  /**
   * Render article to template
   */
  renderArticle: function() {
    if (this.article) {
      this.articleTemplate = eLife.templates['detail/article'];
      $('#article').empty().html(this.articleTemplate(
          {
            article: this.article,
            currentArticle: this.currentArticle,
            currentEvents: this.currentEvents,
            currentVersion: this.queryParams.versionNumber,
            currentRun: this.queryParams.runNumber,
          }));

      this.bindNavigationEvents();
    }
  },

  /**
   * Find the current article from stored data
   * @returns {*}
   */
  getCurrentArticle: function() {
    if (!this.queryParams.versionNumber && !this.queryParams.runNumber) {
      this.queryParams.versionNumber = app.utils.getNthObjectKey(this.article.versions, 0);
      this.queryParams.runNumber = app.utils.getNthObjectKey(this.article.versions[this.queryParams.versionNumber].runs, 0);
    }

    return this.article.versions[this.queryParams.versionNumber].details;
  },

  /**
   * Find the current list of events from stored data
   * @returns {*}
   */
  getCurrentRun: function() {
    if (!this.queryParams.versionNumber && !this.queryParams.runNumber) {
      this.queryParams.versionNumber = app.utils.getNthObjectKey(this.article.versions, 0);
      this.queryParams.runNumber = app.utils.getNthObjectKey(this.article.versions[this.queryParams.versionNumber].runs, 0);
    }

    return this.article.versions[this.queryParams.versionNumber].runs[this.queryParams.runNumber];
  },

  /**
   * Update page details when a new run is selected
   * @param e
   */
  updateRun: function(e) {
    this.queryParams.versionNumber = $(e.currentTarget).attr('data-version');
    this.queryParams.runNumber = $(e.currentTarget).attr('data-run');
    this.setCurrentArticle(this.article.versions[this.queryParams.versionNumber].details);
    this.setCurrentRun(this.article.versions[this.queryParams.versionNumber].runs[this.queryParams.runNumber]);
    this.renderArticle();
  },

  /**
   *
   * @param details
   */
  setCurrentArticle: function(details) {
    this.currentArticle = details;
  },

  /**
   *
   * @param details
   */
  setCurrentRun: function(run) {
    this.currentEvents = run;
  },

  /**
   * Get information from the url for the article ID
   * expected format
   * article/articleId/version/run
   * if there is nothing specified - ie no run/version, load the last version and the last run
   */
  setArticleParams: function() {
    var articleId;
    var versionNumber;
    var runNumber;
    var url = window.location.pathname;
    if (app.config.ISPP) {
      // for use in the PP
      url = window.location.search;
      url = url.replace('?', '/');
    }

    url = url.split('/');
    url = _.compact(url);
    articleId = (!_.isEmpty(url[1])) ? url[1] : null;
    versionNumber = (!_.isEmpty(url[2])) ? url[2] : null;
    runNumber = (!_.isEmpty(url[3])) ? url[3] : null;
    this.queryParams = {
      articleId: articleId,
      versionNumber: versionNumber,
      runNumber: runNumber,
    };
  },

  /**
   * When 'Publish now' clicked
   * Launch publish modal and update the list of queued items.
   * @param e
   */
  publish: function(e) {
    app.publish.initModal(false);
    app.publish.populateQueue($(e.target), true);
    app.publish.displayQueueList();
  },

  /**
   * return the url as a string.
   * @returns {string}
   */
  formUrl: function() {
    var url = '';
    url += '/patterns/04-pages-01-detail/04-pages-01-detail.html?/article/';
    url += this.queryParams.articleId;
    url = (!_.isNull(this.queryParams.versionNumber)) ? url + '/' + this.queryParams.versionNumber : url;
    url = (!_.isNull(this.queryParams.runNumber)) ? url + '/' + this.queryParams.runNumber : url;
    return url;
  },
};

app.detail.init();
