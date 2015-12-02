(function($) {
  'use strict';

  var ESCAPE_KEY = 27;
  var API = 'http://127.0.0.1:8008/';

  var utils = {
    removeObject: function(obj, match) {
      var queued = [];
      _.each(obj, function(queue) {
        if (!_.isEqual(queue, match)) {
          queued.push(queue);
        }
      });

      return queued;
    },

    addObject: function(obj, match) {
      obj.push(match);
      return obj;
    },
  };
  var App = {
    init: function() {
      this.checkingStatus = '';
      this.queuePolled = 0;
      this.queued = [];
      this.isPublishing = false;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
      this.renderArticles();

      $('[data-toggle="tooltip"]', document).tooltip();
    },

    bindEvents: function() {
      // @TODO This needs to look for .toggle-add-to-queue checkboxes but its not working atm
      $('#articles').on('change', 'input:checkbox', this.toggleAddToQueueBtn.bind(this));

      $('#articles').on('click', '.btn-publish-queued', this.publishQueued.bind(this));
      $('#articles').on('click', '.btn-publish', this.publish.bind(this));

      $('#articles').on('click', '#publish-action', this.performPublish.bind(this));

      $('#articles').on('keyup', '#publish-modal', this.refreshPage.bind(this));
      $('#articles').on('click', '#publish-modal .close', this.refreshPage.bind(this));
      $('#articles').on('click', '#publish-modal #publish-cancel', this.refreshPage.bind(this));

    },

    renderArticles: function() {
      $.ajax({
        url: API + 'current',
        cache: false,
        dataType: 'json',
        success: function(articles) {
          this.articleTemplate = eLife.templates['article-template'];
          $('#articles').html(this.articleTemplate(articles));
        },

        error: function(data) {
          this.errorTemplate = eLife.templates['error-template'];
          $('#articles').html(this.errorTemplate(data));
        },

      });

    },

    toggleAddToQueueBtn: function(e) {
      $('.btn-publish-queued').show(); //@TODO not working
      this.populateQueue($(e.target));
    },

    publishQueued: function() {
      var isMultiple = (_.size(this.queued) > 1) ? true : false;
      this.initModal(isMultiple);
      this.displayQueueList();
    },

    publish: function(e) {
      this.initModal(false);
      this.populateQueue($(e.target));
      this.displayQueueList();
    },

    initModal: function(isMultiple) {
      var btnText = (isMultiple) ? 'Publish All' : 'Publish';
      $('#articles-queue', '#publish-modal').empty();
      $('#publish-action', '#publish-modal').empty().text(btnText);
    },

    populateQueue: function(target) {
      var targetParent = target.parents('tr'); //@TODO remove the need for this
      var articleId = targetParent.attr('data-article-id');
      var articleVer = targetParent.attr('data-article-version');
      var articleRun = targetParent.attr('data-article-run');
      var addToQueue = {id: articleId, version: articleVer, run: articleRun};

      if (_.findWhere(this.queued, addToQueue)) {
        this.queued = utils.removeObject(this.queued, addToQueue);
      } else {
        this.queued = utils.addObject(this.queued, addToQueue);
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
      var articlePublishStatusTemplate = eLife.templates['article-publish-status'];
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
        clearInterval(this.checkingStatus);
      }


    },

    refreshPage: function(e) {
      if (this.isPublishing === true || e.which === ESCAPE_KEY) {
        location.reload(true);
      }

      this.resetModalButtons();
    },

    resetModalButtons: function() {
      $('#publish-modal #publish-action').prop('disabled', false).removeClass('disabled');
    },

    performPublish: function(e) {
      $('#publish-action').prop('disabled', true).addClass('disabled');
      this.isPublishing = true;
      this.queueArticles(this.queued);
      this.checkArticleStatus(this.queued);
    },

    queueArticles: function(queued) {
      //@TODO error handling
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: API + 'queue_article_publication',
        data: JSON.stringify({articles: queued}),
        success: function(data) {
          App.updateQueueListStatus(data.articles);
        },
      });
    },

    checkArticleStatus: function(queued) {
      App.updateQueueListStatus(queued);
      this.checkingStatus = setInterval(function() {
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: API + 'check_article_status',
          data: JSON.stringify({articles: queued}),
          success: function(data) {
            App.updateQueueListStatus(data.articles);
          },

          error: function(data) {
            //@TODO better error handling here
            this.isPublishing = false;
            clearInterval(App.checkingStatus);
          },
        });
      }, 1000);
    },



  };

  App.init();
})(jQuery);
