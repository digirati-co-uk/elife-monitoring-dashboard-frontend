'use strict';

app.current = {
  /**
   * Initialise the methods for the Current page
   */
  init: function() {
    if ($('.current-page').length > 0) {
      this.checkingStatus = '';
      this.queuePolled = 0;
      this.articles = [];
      this.queued = [];
      this.isPublishing = false;
      this.isAllPublished = false;
      this.checkStatusInterval = 8000;
      this.publishTimeout = 5000;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
      this.renderArticles();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {

    $('#articles', '.current-page').on('change', 'input.toggle-publish-all:checkbox', this.toggleAddToQueueBtn.bind(this));

    $('#articles', '.current-page').on('click', '.btn-publish-queued', this.publishQueued.bind(this));
    $('#articles', '.current-page').on('click', '.btn-publish', this.publish.bind(this));

    $('#articles', '.current-page').on('click', '#publish-action', this.performPublish.bind(this));

    $('#articles', '.current-page').on('keyup', '#publish-modal', this.refreshPage.bind(this));
    $('#articles', '.current-page').on('click', '#publish-modal .close', this.refreshPage.bind(this));
    $('#articles', '.current-page').on('click', '#publish-modal #publish-cancel', this.refreshPage.bind(this));
    $('#articles', '.current-page').on('click', '#publish-modal #publish-close', this.refreshPage.bind(this));

  },

  renderArticles: function() {
    this.loadingTemplate = eLife.templates['loading-template'];
    $('#articles').empty().html(this.loadingTemplate());
    $.ajax({
      url: app.API + 'api/current',
      cache: false,
      dataType: 'json',
      success: function(articles) {
        app.current.articles = articles;
        this.articleTemplate = eLife.templates['current/article'];
        $('#articles').empty().html(this.articleTemplate(articles));
        this.articleStatsTemplate = eLife.templates['current/article-stats-template'];
        $('#articleStats').html(this.articleStatsTemplate(articles));
      },

      error: function(data) {
        this.errorTemplate = eLife.templates['error-render'];
        $('#articles').empty().html(this.errorTemplate(data));
      },

    });
  },

  toggleAddToQueueBtn: function(e) {
    $('.btn-publish-queued').show();
    var isChecked = $(e.target).is(':checked');
    if (isChecked === false) {
      var cnt = 0;
      $('input.toggle-publish-all:checkbox', '#articles').each(function(i, element) {
        var checkedState = $(element).is(':checked');
        if (checkedState === false) cnt++;
      });

      if (cnt === this.articles.uir.length) $('.btn-publish-queued').hide();
    }

    this.populateQueue($(e.target));
  },

  publishQueued: function() {
    var isMultiple = (_.size(this.queued) > 1) ? true : false;
    this.initModal(isMultiple);
    this.displayQueueList();
  },

  publish: function(e) {
    this.initModal(false);
    this.populateQueue($(e.target), true);
    this.displayQueueList();
  },

  initModal: function(isMultiple) {
    var btnText = (isMultiple) ? 'Publish All' : 'Publish';
    $('#articles-queue', '#publish-modal').empty();
    $('#publish-action', '#publish-modal').empty().text(btnText);
    $('#publish-close').hide();
  },

  populateQueue: function(target, publishNow) {
    var targetParent = target.parents('tr');
    var articleId = targetParent.attr('data-article-id');
    var articleVer = targetParent.attr('data-article-version');
    var articleRun = targetParent.attr('data-article-run');
    var addToQueue = {id: articleId, version: articleVer, run: articleRun};
    if (publishNow) {
      this.queued = [];
      this.queued = app.utils.addObject(this.queued, addToQueue);
    } else {
      if (_.findWhere(this.queued, addToQueue)) {
        this.queued = app.utils.removeObject(this.queued, addToQueue);
      } else {
        this.queued = app.utils.addObject(this.queued, addToQueue);
      }
    }
  },

  displayQueueList: function(article) {
    _.each(this.queued, function(article) {
      var title = $('[data-article-id=' + article.id + ']').attr('data-article-title');
      var listItem = $('<li>' + title + '</li>');
      listItem.data({id: article.id, version: article.version, run: article.run});
      $('#articles-queue').append(listItem);
    });
  },

  updateQueueListStatus: function(queuedArticles) {
    this.queuePolled++;
    this.queued = queuedArticles;
    var total = 0;
    var status = {completed: 0, error: 0};
    var articleQueue = $('#articles-queue li');
    var articlePublishStatusTemplate = eLife.templates['current/article-publish-modal-status'];
    var queuedItems = this.queued;

    _.each(articleQueue, function(articleQueue, i) {
      var articleId = $(articleQueue).data('id');
      var articleVer = $(articleQueue).data('version');
      var articleRun = $(articleQueue).data('run');
      var displayInQueue = {id: articleId, version: articleVer, run: articleRun};
      var queuedItem = _.find(queuedItems, displayInQueue);
      switch (queuedItem.status) {
        case 'published':
          status.completed++;
        break;
        case 'error':
          status.error++;
        break;
      }
      $('.article-status', articleQueue).remove();
      $(articleQueue).append(articlePublishStatusTemplate(queuedItem));
    });

    _.each(status, function(s) {
      total = total + s;
    });

    if (this.queuePolled === 25 || _.contains(status, queuedItems.length) || status === queuedItems.length) {
      this.isPublishing = false;
      this.isAllPublished = true;
      clearInterval(this.checkingStatus);
      $('#publish-close').show();
    }

  },

  refreshPage: function(e) {
    if (this.isPublishing === true || this.isAllPublished === true || e.which === app.ESCAPE_KEY) {
      location.reload(true);
    }

    this.resetModalButtons();
  },

  resetModalButtons: function() {
    $('#publish-modal #publish-action').prop('disabled', false).removeClass('disabled');
    $('#articles-queue').empty();
    $('.btn-publish-queued').hide();
    $('.toggle-publish-all').each(function(i, e) {
      $(e).prop('checked', false);
    });

    this.queued = [];
  },

  performPublish: function(e) {
    $('#publish-cancel').hide();
    $('#publish-action').prop('disabled', true).addClass('disabled');
    this.isPublishing = true;
    this.queueArticles(this.queued);

  },

  queueArticles: function(queued) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: app.API + 'api/queue_article_publication',
      data: JSON.stringify({articles: queued}),
      success: function(data) {
        app.current.updateQueueListStatus(data.articles);
        setTimeout(app.current.checkArticleStatus(app.current.queued), app.current.publishTimeout);
      },

      error: function(data) {
        this.queueArticleStatusErrorTemplate = eLife.templates['current/error-queue-articles'];
        $('#publish-modal .modal-body').html(this.queueArticleStatusErrorTemplate(articles));
        $('#publish-cancel').show();
      },
    });
  },

  checkArticleStatus: function(queued) {
    app.current.updateQueueListStatus(queued);
    this.checkingStatus = setInterval(function() {
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/article_publication_status',
        data: JSON.stringify({articles: queued}),
        success: function(data) {
          app.current.updateQueueListStatus(data.articles);
        },

        error: function(data) {
          this.checkArticleStatusErrorTemplate = eLife.templates['current/error-check-article-status'];
          $('#publish-modal .modal-body').html(this.checkArticleStatusErrorTemplate(articles));
          $('#publish-cancel').show();
          this.isPublishing = false;
          clearInterval(app.current.checkingStatus);
        },
      });
    }, this.checkStatusInterval);
  },

};

app.current.init();
