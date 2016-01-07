'use strict';

Elife.detail = {
  init: function() {
    if ($('.detail-page').length > 0) {
      this.article = [];
      this.renderArticleDetail();
      this.renderArticleVersionMap();
      this.renderArticleVersionHistory();
    }
  },

  bindEvents: function() {

  },

  renderArticleDetail: function() {
    var article = this.article;
    this.articleDetailTemplate = eLife.templates['detail/article-detail'];
    $('.article-detail').html(this.articleDetailTemplate(article));
  },

  renderArticleVersionMap: function() {
    var article = this.article;
    this.articleVersionMapTemplate = eLife.templates['detail/article-version-map'];
    $('.article-version-map').html(this.articleVersionMapTemplate(article));
  },

  renderArticleVersionHistory: function() {
    var article = this.article;
    this.articleVersionHistoryTemplate = eLife.templates['detail/article-version-history'];
    $('.article-version-history').html(this.articleVersionHistoryTemplate(article));
  },

};

Elife.detail.init();