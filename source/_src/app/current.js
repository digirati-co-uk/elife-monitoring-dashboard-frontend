'use strict';

app.current = {
  /**
   * Initialise the methods for the Current page
   */
  init: function() {
    if ($('.current-page').length > 0) {
      this.articles = [];
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

    //$('#articles', '.current-page').on('click', '#publish-action', this.performPublish.bind(this));

  },
  /**
   * Fetch articles and render on the page.
   * Renders both the 'summary' at the top of the page and the list below
   */
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
        $('#articles').empty().html(this.articleTemplate(app.current.sortArticles(articles)));
        this.articleStatsTemplate = eLife.templates['current/article-stats-template'];
        $('#articleStats').html(this.articleStatsTemplate(app.current.sortArticles(articles)));
      },

      error: function(data) {
        this.errorTemplate = eLife.templates['error-render'];
        $('#articles').empty().html(this.errorTemplate(data));
      },

    });
  },
  /**
   * Because the API returns data in any order and handlebars is limited we will sort here
   * Correct order: Error, In Progress, User input Required, Scheduled
   * @param articles
   * @returns {*}
   */
  sortArticles: function(articles) {
    var sortedArticles = {
      error: articles.error,
      inProgress: articles['in-progress'],
      uir: articles.uir,
      scheduled: articles.scheduled,
    };
    return sortedArticles;
  },

  /**
   * When you check a checkbox under any user input required
   * adds the relevant information for the checked item to the queue
   * @param e
   */
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

    app.publish.populateQueue($(e.target).parents('tr'));
  },

  /**
   * When 'Publish all selected' active & clicked
   * Launch publish modal and update the list of queued items.
   *
   */
  publishQueued: function() {
    var isMultiple = (_.size(app.queued) > 1) ? true : false;
    app.publish.initModal(isMultiple);
    app.publish.displayQueueList();
  },
  /**
   * When 'Publish now' clicked
   * Launch publish modal and update the list of queued items.
   * @param e
   */
  publish: function(e) {
    app.publish.initModal(false);
    app.publish.populateQueue($(e.target).parents('tr'), true);
    app.publish.displayQueueList();
  },

  //updateQueueListStatus: function(queuedArticles) {
  //  this.queuePolled++;
  //  app.queued = queuedArticles;
  //  var total = 0;
  //  var status = {completed: 0, error: 0};
  //  var articleQueue = $('#articles-queue li');
  //  var articlePublishStatusTemplate = eLife.templates['publish/article-publish-modal-status'];
  //  var queuedItems = app.queued;
  //
  //  _.each(articleQueue, function(articleQueue, i) {
  //    var articleId = $(articleQueue).data('id');
  //    var articleVer = $(articleQueue).data('version');
  //    var articleRun = $(articleQueue).data('run');
  //    var displayInQueue = {id: articleId, version: articleVer, run: articleRun};
  //    var queuedItem = _.find(queuedItems, displayInQueue);
  //    switch (queuedItem.status) {
  //      case 'published':
  //        status.completed++;
  //      break;
  //      case 'error':
  //        status.error++;
  //      break;
  //    }
  //    $('.article-status', articleQueue).remove();
  //    $(articleQueue).append(articlePublishStatusTemplate(queuedItem));
  //  });
  //
  //  _.each(status, function(s) {
  //    total = total + s;
  //  });
  //
  //  if (this.queuePolled === 250 || _.contains(status, queuedItems.length) || status === queuedItems.length) {
  //    app.isPublishing = false;
  //    app.isAllPublished = true;
  //    clearInterval(this.checkingStatus);
  //    $('#publish-close').show();
  //  }
  //
  //},



  /**
   * queue articles to the publishing service
   * @param e
   */
  //performPublish: function(e) {
  //  $('#publish-cancel').hide();
  //  $('#publish-action').prop('disabled', true).addClass('disabled');
  //  this.isPublishing = true;
  //  this.queueArticles(app.queued);
  //
  //},

  /**
   * Queue articles to the service, set timeout to keep polling for the status
   * @param queued
   */
  //queueArticles: function(queued) {
  //  $.ajax({
  //    type: 'POST',
  //    contentType: 'application/json',
  //    url: app.API + 'api/queue_article_publication',
  //    data: JSON.stringify({articles: queued}),
  //    success: function(data) {
  //      app.current.updateQueueListStatus(data.articles);
  //      setTimeout(app.current.checkArticleStatus(app.queued), app.publishTimeout);
  //    },
  //
  //    error: function(data) {
  //      this.queueArticleStatusErrorTemplate = eLife.templates['current/error-queue-articles'];
  //      $('#publish-modal .modal-body').html(this.queueArticleStatusErrorTemplate(articles));
  //      $('#publish-cancel').show();
  //    },
  //  });
  //},

  /**
   * Poll service to find out what is happening
   * @param queued
   */
  //checkArticleStatus: function(queued) {
  //  app.current.updateQueueListStatus(queued);
  //  this.checkingStatus = setInterval(function() {
  //    $.ajax({
  //      type: 'POST',
  //      contentType: 'application/json',
  //      url: app.API + 'api/article_publication_status',
  //      data: JSON.stringify({articles: queued}),
  //      success: function(data) {
  //        app.current.updateQueueListStatus(data.articles);
  //      },
  //
  //      error: function(data) {
  //        this.checkArticleStatusErrorTemplate = eLife.templates['current/error-check-article-status'];
  //        $('#publish-modal .modal-body').html(this.checkArticleStatusErrorTemplate(articles));
  //        $('#publish-cancel').show();
  //        this.isPublishing = false;
  //        clearInterval(app.current.checkingStatus);
  //      },
  //    });
  //  }, app.checkStatusInterval);
  //},

};

app.current.init();
