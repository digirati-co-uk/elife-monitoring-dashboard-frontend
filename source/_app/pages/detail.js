'use strict';
/**
 * Article Details page
 * @type {{init: app.detail.init, updatePageUrl: app.detail.updatePageUrl, bindEvents: app.detail.bindEvents, bindNavigationEvents: app.detail.bindNavigationEvents, getArticle: app.detail.getArticle, renderArticle: app.detail.renderArticle, setLatestArticle: app.detail.setLatestArticle, getCurrentArticle: app.detail.getCurrentArticle, getCurrentRun: app.detail.getCurrentRun, updateRun: app.detail.updateRun, setCurrentArticle: app.detail.setCurrentArticle, setCurrentRun: app.detail.setCurrentRun, setArticleParams: app.detail.setArticleParams, publish: app.detail.publish}}
 */
app.detail = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.detail-page').length > 0) {
      this.extraUrl = 'patterns/04-pages-01-detail/04-pages-01-detail.html?/';
      this.article = [];
      this.errors = [];
      this.currentEvents = [];
      this.currentArticle = [];
      this.scheduleStatus = [];
      this.queryParams = {};
      Swag.registerHelpers(Handlebars);
      this.renderLoader();
      this.setArticleParams();
      this.getArticle();
      this.getDetailActions();
      this.bindEvents();
    }
  },

  renderLoader: function() {
    this.loadingTemplate = eLife.templates['loading-template'];
    $('#article').empty().html(this.loadingTemplate());
  },

  /**
   * Generate page url
   * if url is /articleid/version/run do nothing
   * if url is /articleid/version find latest run and update the url
   * if url is /articleid find latest version and then the latest run and update the url
   * @returns {string}
   */
  updatePageUrl: function() {
    this.setLatestArticle();

    var articleId;
    var versionNumber;
    var runId;
    var url;
    var state = History.getState();
    var hash = state.hash;
    if (app.config.ISPP) {
      hash = hash.replace(this.extraUrl, '');
    }

    url = hash;
    hash = hash.split('/');
    hash = _.compact(hash);
    articleId = (!_.isEmpty(hash[1])) ? hash[1] : null;
    versionNumber = (!_.isEmpty(hash[2])) ? hash[2] : null;
    runId = (!_.isEmpty(hash[3])) ? hash[3] : null;

    url = (url.slice(-1) === '/') ? url.slice(0, -1) : url;

    if (_.isNull(versionNumber) && _.isNull(runId)) {
      url += '/' + this.queryParams.versionNumber + '/' + this.queryParams.runId;
    }

    if (!_.isNull(versionNumber) && _.isNull(runId)) {
      url += '/' + this.queryParams.runId;
    }

    if (app.config.ISPP) {
      url = '/' + this.extraUrl.slice(0, -1) + url;
    }

    History.replaceState(null, null, url);
    // History.pushState(null, null, url);
  },
  /**
   * Bind events
   */
  bindEvents: function() {
    $('#article', '.detail-page').on('click', '.version-run-nav-list .run-container .run a', this.updateRun.bind(this));
    $('#article', '.detail-page').on('click', '.btn-publish', this.publish.bind(this));
    $('#article').on('click', '.run-container li a', this.bindNavigationEvents.bind(this));
    $(window).on('statechange', this.stateChange.bind(this));
  },

  /**
   * On back/forwards update the article
   * @param e
   */
  stateChange: function(e) {
    this.setArticleParams();
    this.getArticle();
  },

  /**
   * Bind navigation events
   */
  bindNavigationEvents: function(e) {
    e.preventDefault();
    var version = $(e.currentTarget).attr('data-version');
    var run = $(e.currentTarget).attr('data-run');
    var url = '/article/' + this.queryParams.articleId + '/' + version + '/' + run;

    if (app.config.ISPP) {
      url = '/' + this.extraUrl.slice(0, -1) + url;
    }

    // Create a new history item.
    history.pushState(null, null, url);
  },

  /**
   * Determine which action buttons to show for this page
   */
  getDetailActions: function() {
    if (!_.isNull(this.queryParams.articleId)) {
      this.buttonsScheduleTemplate = eLife.templates['detail/buttons-schedule'];
      this.buttonsReScheduleTemplate = eLife.templates['detail/buttons-reschedule'];
      this.articlesScheduledForTemplate = eLife.templates['detail/article-scheduled-for'];
      var articleIds = [];
      articleIds.push(this.queryParams.articleId);
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/article_scheduled_status',
        data: JSON.stringify({articles: articleIds}),
        success: function(data) {
          if (data.articles.length === 1) {
            var scheduleStatus = data.articles[0];
            app.detail.scheduleStatus = scheduleStatus;
            app.detail.renderDetailActions();
          }
        },

        error: function(data) {
          console.log('Error retrieving article scheduled status');
        },

      });
    }
  },
  /**
   * Determine which action buttons to show for this page
   */
  renderDetailActions: function() {
    if (this.scheduleStatus) {
      if (this.scheduleStatus.scheduled > 0) {
        $('.article-detail-actions', '#article').empty().html(app.detail.buttonsReScheduleTemplate({article: app.detail.article}));
        $('.article-detail-scheduled', '#article').empty().html(app.detail.articlesScheduledForTemplate({scheduleStatus: this.scheduleStatus}));
      } else {
        $('.article-detail-actions', '#article').empty().html(app.detail.buttonsScheduleTemplate({article: app.detail.article}));
      }
    }
  },
  /**
   * Get article from param in url
   */
  getArticle: function() {
    var message;
    if (!_.isNull(this.queryParams.articleId)) {
      $.ajax({
        url: app.API + 'api/article/' + this.queryParams.articleId,
        cache: false,
        dataType: 'json',
        success: function(article) {
          app.detail.article = article;
          app.detail.setLatestArticle();
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
    if (this.article && _.isEmpty(this.errors)) {
      this.articleTemplate = eLife.templates['detail/article'];
      $('#article').empty().html(this.articleTemplate(
          {
            article: this.article,
            currentArticle: this.currentArticle,
            currentEvents: this.currentEvents,
            currentVersion: this.queryParams.versionNumber,
            currentRun: this.queryParams.runId,
            scheduleStatus: this.scheduleStatus,
          }));

      this.renderDetailActions();
    } else {
      this.errorTemplate = eLife.templates['error-render'];
      $('#article').empty().html(this.errorTemplate(this.errors));
    }

    this.updatePageUrl();
  },

  /**
   * Set latest article
   */
  setLatestArticle: function() {
    if (!this.queryParams.versionNumber) {
      this.queryParams.versionNumber = app.utils.findLastKey(this.article.versions);
    }

    if (!this.queryParams.runId) {
      if(_.has(this.article.versions, this.queryParams.versionNumber)) {
        var lastKey = app.utils.findLastKey(this.article.versions[this.queryParams.versionNumber].runs);
        var runId = this.article.versions[this.queryParams.versionNumber].runs[lastKey]['run-id'];
        this.queryParams.runId = runId;
      } else {
        this.queryParams.runId = null;
      }
    }

  },
  /**
   * Find the current article from stored data
   * @returns {*}
   */
  getCurrentArticle: function() {
    if (_.has(this.article.versions, this.queryParams.versionNumber)) {
      return this.article.versions[this.queryParams.versionNumber].details;
    } else {
      this.errors = {message: 'There are no versions with this ID.<br /><br />'};
      return false;
    }
  },

  /**
   * Find the current list of events from stored data
   * @returns {*}
   */
  getCurrentRun: function() {
    if (_.has(this.article.versions, this.queryParams.versionNumber)) {
      if (_.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId})) {
        return _.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId});
      } else {
        this.errors = {message: 'There are no runs with this ID.<br /><br />'};
        return false;
      }
    }
  },

  /**
   * Update page details when a new run is selected
   * @param e
   */
  updateRun: function(e) {
    this.queryParams.versionNumber = $(e.currentTarget).attr('data-version');
    this.queryParams.runId = $(e.currentTarget).attr('data-run');
    this.setCurrentArticle(this.article.versions[this.queryParams.versionNumber].details);
    if (_.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId})) {
      this.setCurrentRun(_.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId}));
    }
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
    var runId;
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
    runId = (!_.isEmpty(url[3])) ? url[3] : null;

    /* If you have come through the PP nav we need to force some id's */
    if (app.config.ISPP && url[0] !== 'article') {
      articleId = '00353';
      versionNumber = '1';
      runId = 'c03211f7-6e1e-492d-9312-e0a80857873c';
    }

    this.queryParams = {
      articleId: articleId,
      versionNumber: versionNumber,
      runId: runId,
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
};

app.detail.init();
