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
      var queryString = window.location.search;
      var queryParams = app.utils.getQueryParams(queryString);
      Swag.registerHelpers(Handlebars);
      this.getArticle(queryParams);
      this.bindEvents();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $('#article', '.detail-page').on('click', '.article-version-map-list .run-container .run a', this.updateRun.bind(this));
  },

  /**
   * Get article from param in url
   * @param queryParams
   */
  getArticle: function(queryParams) {
    if (_.has(queryParams, 'articleId')) {
      var articleId = queryParams.articleId;
      $.ajax({
        url: app.API + 'api/article/' + articleId,
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
      $('#article').empty().html(this.errorTemplate());
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
            currentVersion: this.version,
            currentRun: this.run,
          }));
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

};

app.detail.init();
