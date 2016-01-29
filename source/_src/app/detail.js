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
      this.version = '';
      this.run = '';
      this.queryParams = {};
      Swag.registerHelpers(Handlebars);
      this.setArticleParams();
      this.getArticle();
      this.bindEvents();

      // Update this history event so that the state object contains the data
      // for the homepage.
      history.pushState(this.queryParams, '', this.formUrl());
    }
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

      // Create a new history item.
      history.replaceState(app.detail.queryParams, '', this.href);
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
          app.detail.currentEvents = app.detail.getCurrentEvents();
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
      if (_.isNull(this.queryParams.versionNumber) &&  _.isNull(this.queryParams.runNumber)) {
        this.version = app.utils.findLastKey(this.article.versions);
        if (this.version) {
          this.run = app.utils.findLastKey(this.article.versions[this.version].runs);
          this.article.versions[this.version].runs[this.run].isActive = true;
        }
      }

      this.articleTemplate = eLife.templates['detail/article'];
      $('#article').empty().html(this.articleTemplate(
          {
            article: this.article,
            currentArticle: this.currentArticle,
            currentEvents: this.currentEvents,
            currentVersion: this.version,
            currentRun: this.run,
          }));

      this.bindNavigationEvents();
    }
  },

  /**
   * Find the current article from stored data
   * @returns {*}
   */
  getCurrentArticle: function() {
    if (!this.version && !this.run) {
      this.version = app.utils.getNthObjectKey(this.article.versions, 0);
      this.run = app.utils.getNthObjectKey(this.article.versions[this.version].runs, 0);
    }

    return this.article.versions[this.version].details;
  },

  /**
   * Find the current list of events from stored data
   * @returns {*}
   */
  getCurrentEvents: function() {
    if (!this.version && !this.run) {
      this.version = app.utils.getNthObjectKey(this.article.versions, 0);
      this.run = app.utils.getNthObjectKey(this.article.versions[this.version].runs, 0);
    }

    return this.article.versions[this.version].runs[this.run];
  },

  /**
   * Update page details when a new run is selected
   * @param e
   */
  updateRun: function(e) {
    this.run = $(e.target).parents('[data-run]:first').attr('data-run');
    this.version = $(e.target).parents('[data-version]:first').attr('data-version');
    this.currentArticle = this.article.versions[this.version].details;
    this.currentEvents = this.article.versions[this.version].runs[this.run];
    this.renderArticle();
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
    var url = window.location.pathname.split('/');
    url = _.compact(url);
    articleId = (!_.isEmpty(url[1])) ? url[1] : null;
    versionNumber = (!_.isEmpty(url[2])) ? url[2] : null;
    runNumber = (!_.isEmpty(url[3])) ? url[3] : null;

    // for use in the PP
    if (app.config.ISPP) {
      articleId = '00387';
      versionNumber = '1';
      runNumber = '1';
    }

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
    url += 'article/';
    url += this.queryParams.articleId;
    url = (!_.isNull(this.queryParams.versionNumber)) ? url + '/' + this.queryParams.versionNumber : url;
    url = (!_.isNull(this.queryParams.runNumber)) ? url + '/' + this.queryParams.runNumber : url;
    return url;
  },
};

app.detail.init();
