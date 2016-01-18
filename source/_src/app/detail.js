'use strict';

app.detail = {
  init: function() {
    if ($('.detail-page').length > 0) {
      this.article = [];
      this.currentEvents = [];
      this.currentArticle = [];
      this.version = '';
      this.run = '';
      Swag.registerHelpers(Handlebars);
      this.getArticle();
      this.bindEvents();
    }
  },

  bindEvents: function() {
    $('#article', '.detail-page').on('click', '.article-version-map-list .run li', this.updateRun.bind(this));
  },

  getArticle: function() {
    var queryString = window.location.search;
    var queryParams = app.utils.getQueryParams(queryString);
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
          console.log(app.detail.currentEvents);
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

  renderArticle: function() {
    if (this.article) {
      this.articleTemplate = eLife.templates['detail/article'];
      $('#article').empty().html(this.articleTemplate(
          {
            article: this.article,
            currentArticle: this.currentArticle,
            currentEvents: this.currentEvents,
            version: this.version,
            run: this.run,
          }));
    }
  },

  getCurrentArticle: function() {
    if (!this.version && !this.run) {
      this.version = app.utils.getNthObjectKey(this.article.versions, 0);
      this.run = app.utils.getNthObjectKey(this.article.versions[this.version].runs, 0);
    }

    return this.article.versions[this.version].details;
  },

  getCurrentEvents: function() {
    if (!this.version && !this.run) {
      this.version = app.utils.getNthObjectKey(this.article.versions, 0);
      this.run = app.utils.getNthObjectKey(this.article.versions[this.version].runs, 0);
    }

    return this.article.versions[this.version].runs[this.run];
  },

  updateRun: function(e, i) {
    this.run = $(e.target).parents('[data-run]:first').attr('data-run');
    this.version = $(e.target).parents('[data-version]:first').attr('data-version');
    this.currentArticle = this.article.versions[this.version].details;
    this.currentEvents = this.article.versions[this.version].runs[this.run];
    this.renderArticle();
  },

};

app.detail.init();
