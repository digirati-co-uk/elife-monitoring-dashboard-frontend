'use strict';
/**
 * Controls the publishing on the dashboard and details page
 * @type {{init: app.publish.init, bindEvents: app.publish.bindEvents, initModal: app.publish.initModal, populateQueue: app.publish.populateQueue, displayQueueList: app.publish.displayQueueList, refreshPage: app.publish.refreshPage, resetModalButtons: app.publish.resetModalButtons, performPublish: app.publish.performPublish, queueArticles: app.publish.queueArticles, checkArticleStatus: app.publish.checkArticleStatus, updateQueueListStatus: app.publish.updateQueueListStatus, finishPublishing: app.publish.finishPublishing}}
 */
app.publish = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.current-page').length > 0 || $('.detail-page').length > 0) {
      this.errorTemplate = eLife.templates['error-render'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
      this.checkingStatus = '';
      this.queuePolled = 0;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $(document).on('hide.bs.modal', this.refreshPage.bind(this));
    $(document).on('click', '#publish-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#publish-modal #publish-close', this.refreshPage.bind(this));
    $(document).on('click', '#publish-modal #publish-action', this.performPublish.bind(this));
  },

  /**
   * Initialise modal, not actually loading the modal, thats done in bootstrap
   * @param isMultiple
   */
  initModal: function(isMultiple) {
    var btnText = (isMultiple) ? 'Publish All' : 'Publish';
    $('#articles-queue', '#publish-modal').empty();
    $('#publish-action', '#publish-modal').empty().text(btnText);
  },

  /**
   * Amend queued items.
   * @param target
   * @param publishNow
   */
  populateQueue: function(target, publishNow) {
    var articleId = target.attr('data-article-id');
    var articleVer = target.attr('data-article-version');
    var articleRun = target.attr('data-article-run');
    var addToQueue = {id: articleId, version: articleVer, run: articleRun};
    if (publishNow) {
      app.queued = [];
      app.queued = app.utils.addObject(app.queued, addToQueue);
    } else {
      if (_.findWhere(app.queued, addToQueue)) {
        app.queued = app.utils.removeObject(app.queued, addToQueue);
      } else {
        app.queued = app.utils.addObject(app.queued, addToQueue);
      }
    }
  },

  /**
   * Update the queue list to the items in the queue
   * @param article
   */
  displayQueueList: function() {
    _.each(app.queued, function(article) {
      var title = $('[data-article-id=' + article.id + '][data-action=publish]').attr('data-article-title');
      var listItem = $('<li>' + title + '</li>');
      listItem.data({id: article.id, version: article.version, run: article.run});
      $('#articles-queue').append(listItem);
    });
  },

  /**
   * refresh page when
   * user clicks and isPublishing or isAllPublished are true
   * @param e
   */
  refreshPage: function(e) {
    if (app.isPublishing === true || app.isAllPublished === true) {
      location.reload(true);
    }

    this.resetModalButtons();
  },

  /**
   * Reset the modal buttons and publish checkboxes
   */
  resetModalButtons: function() {
    $('#publish-action', '#publish-modal').prop('disabled', false).removeClass('disabled');
    $('#articles-queue', '#publish-modal').empty();

    // Specific to current page
    $('.btn-publish-queued').hide();
    $('.toggle-publish-all').each(function(i, e) {
      $(e).prop('checked', false);
    });

    app.queued = [];
  },

  /**
   * queue articles to the publishing service
   * @param e
   */
  performPublish: function(e) {
    $('#publish-action', '#publish-modal').prop('disabled', true).addClass('disabled');
    app.isPublishing = true;
    this.queueArticles(app.queued);

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
        app.publish.updateQueueListStatus(data.articles);
        setTimeout(app.publish.checkArticleStatus(app.queued), app.publishTimeout);
      },

      error: function(data) {
        console.error(app.errors.en.type.api + ': ' + app.API + 'api/queue_article_publication');
        console.log(data);
        console.log({articles: queued});
        var responseText = JSON.parse(data.responseText);
        var error = {
          type: app.errors.en.type.api,
        };
        $('.modal-body', '#publish-modal').empty().html(app.publish.errorTemplate({response: data, responseText: responseText, error: error}));
        $('.modal-body', '#publish-modal').append(app.publish.errorDetailTemplate({response: data, responseText: responseText, error: error}));
      },
    });
  },

  /**
   * Poll service to find out what is happening
   * @param queued
   */
  checkArticleStatus: function(queued) {
    app.publish.updateQueueListStatus(queued);
    this.checkingStatus = setInterval(function() {
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/article_publication_status',
        data: JSON.stringify({articles: queued}),
        success: function(data) {
          app.publish.updateQueueListStatus(data.articles);
        },

        error: function(data) {
          console.error(app.errors.en.type.api + ': ' + app.API + 'api/article_publication_status');
          console.log(data);
          console.log({articles: queued});
          var responseText = JSON.parse(data.responseText);
          var error = {
            type: app.errors.en.type.api,
          };
          $('.modal-body', '#publish-modal').empty().html(app.publish.errorTemplate({response: data, responseText: responseText, error: error}));
          $('.modal-body', '#publish-modal').append(app.publish.errorDetailTemplate({response: data, responseText: responseText, error: error}));
          this.isPublishing = false;
          clearInterval(app.publish.checkingStatus);
        },
      });
    }, app.checkStatusInterval);
  },

  /**
   * Update the queue with correct status icons and work out when publishing has finished
   * @param queuedArticles
   */
  updateQueueListStatus: function(queuedArticles) {
    this.queuePolled++;
    app.queued = queuedArticles;
    var total = 0;
    var status = {completed: 0, error: 0};
    var articleQueue = $('#articles-queue li');
    var articlePublishStatusTemplate = eLife.templates['publish/article-publish-modal-status'];
    var queuedItems = app.queued;

    _.each(articleQueue, function(articleQueue, i) {
      var articleId = $(articleQueue).data('id');
      var articleVer = $(articleQueue).data('version');
      var articleRun = $(articleQueue).data('run');
      var displayInQueue = {id: articleId, version: articleVer, run: articleRun};
      var queuedItem = _.find(queuedItems, displayInQueue);
      switch (queuedItem['publication-status']) {
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

    // max polls reached
    if (this.queuePolled === app.pollLimit) {
      console.info('max polls reached');
      this.finishPublishing();
    }

    // all status's are complete or errors stop checking
    if (total === queuedItems.length) {
      console.info('all queued items are either complete or errors');
      this.finishPublishing();
    }
  },

  /**
   * We've finished publushing - set some flags and tidy up
   */
  finishPublishing: function() {
    app.isPublishing = false;
    app.isAllPublished = true;
    clearInterval(app.publish.checkingStatus);
    console.info('publishingFinished');
  },

};

app.publish.init();
