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

    this.populateQueue($(e.target));
  },

  /**
   * When 'Publish all selected' active & clicked
   * Launch publish modal and update the list of queued items.
   *
   */
  publishQueued: function() {
    var isMultiple = (_.size(this.queued) > 1) ? true : false;
    this.initModal(isMultiple);
    this.displayQueueList();
  },
  /**
   * When 'Publish now' clicked
   * Launch publish modal and update the list of queued items.
   * @param e
   */
  publish: function(e) {
    this.initModal(false);
    this.populateQueue($(e.target), true);
    this.displayQueueList();
  },
  /**
   * Show modal popup that contains publish status information
   * @param isMultiple
   */
  initModal: function(isMultiple) {
    var btnText = (isMultiple) ? 'Publish All' : 'Publish';
    $('#articles-queue', '#publish-modal').empty();
    $('#publish-action', '#publish-modal').empty().text(btnText);
    $('#publish-close').hide();
  },
  /**
   * Amend queued items.
   * @param target
   * @param publishNow
   */
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
  /**
   * Update the queue list to the items in the queue
   * @param article
   */
  displayQueueList: function(article) {
    _.each(this.queued, function(article) {
      var title = $('[data-article-id=' + article.id + ']').attr('data-article-title');
      var listItem = $('<li>' + title + '</li>');
      listItem.data({id: article.id, version: article.version, run: article.run});
      $('#articles-queue').append(listItem);
    });
  },
  /**
   * Update the queue list status and update global status's
   * @param queuedArticles
   */
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

    if (this.queuePolled === 250 || _.contains(status, queuedItems.length) || status === queuedItems.length) {
      this.isPublishing = false;
      this.isAllPublished = true;
      clearInterval(this.checkingStatus);
      $('#publish-close').show();
    }

  },

  /**
   * refresh page on certain circumstances
   * @param e
   */
  refreshPage: function(e) {
    if (this.isPublishing === true || this.isAllPublished === true || e.which === app.ESCAPE_KEY) {
      location.reload(true);
    }

    this.resetModalButtons();
  },

  /**
   * Reset the modal buttons and publish checkboxes
   */
  resetModalButtons: function() {
    $('#publish-modal #publish-action').prop('disabled', false).removeClass('disabled');
    $('#articles-queue').empty();
    $('.btn-publish-queued').hide();
    $('.toggle-publish-all').each(function(i, e) {
      $(e).prop('checked', false);
    });

    this.queued = [];
  },

  /**
   * queue articles to the publishing service
   * @param e
   */
  performPublish: function(e) {
    $('#publish-cancel').hide();
    $('#publish-action').prop('disabled', true).addClass('disabled');
    this.isPublishing = true;
    this.queueArticles(this.queued);

  },

  /**
   * Queue articles to the service, set timeout to keep polling for the status
   * @param queued
   */
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

  /**
   * Poll service to find out what is happening
   * @param queued
   */
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
