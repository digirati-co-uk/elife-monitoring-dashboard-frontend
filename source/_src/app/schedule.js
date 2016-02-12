'use strict';
/**
 * Controls the publishing on the dashboard and details page
 * @type {{init: app.publish.init, bindEvents: app.publish.bindEvents, initModal: app.publish.initModal, populateQueue: app.publish.populateQueue, displayQueueList: app.publish.displayQueueList, refreshPage: app.publish.refreshPage, resetModalButtons: app.publish.resetModalButtons, performPublish: app.publish.performPublish, queueArticles: app.publish.queueArticles, checkArticleStatus: app.publish.checkArticleStatus, updateQueueListStatus: app.publish.updateQueueListStatus, finishPublishing: app.publish.finishPublishing}}
 */
app.schedule = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.current-page').length > 0 || $('.detail-page').length > 0) {
      this.articleId = null;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
      this.initDateTimePicker();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $(document).on('click', '#schedule-modal #schedule-action', this.performSchedule.bind(this));
    $(document).on('show.bs.modal', this.setParameters.bind(this));
    $(document).on('click', '#schedule-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#schedule-modal #schedule-close', this.refreshPage.bind(this));
  },

  initDateTimePicker: function() {
    console.log('initDateTimePicker');
    $('#schedule-date-time').datetimepicker({inline: true, sideBySide: true});
  },

  setParameters: function(e) {
    var articleId = $('.article-detail').attr('data-article-id');
    this.articleId = articleId;
  },

  performSchedule: function() {
    app.isScheduling = true;
    console.log('scheduleArticle');
    console.log(JSON.stringify({articleId: this.articleId, date: '12/12/12 11.12am'}));
    $('#schedule-modal #schedule-action').hide();
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: app.API + 'api/schedule_article_publication',
      data: JSON.stringify({articleId: this.articleId, date: '12/12/12 11.12am'}),
      success: function(data) {
        this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
        $('#schedule-modal .modal-body').html(this.queueArticleStatusTemplate(data));
        app.isScheduling = false;
        app.isAllScheduled = true;
      },

      error: function(data) {
        var status = {scheduled: false, message: 'There was an error talking to the API.'};
        this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
        $('#schedule-modal .modal-body').html(this.queueArticleStatusTemplate(status));
        app.isScheduling = false;
        app.isAllScheduled = true;
      },
    });
  },
  /**
   * refresh page when
   * user closes modal and scheduling is not takign place.
   */
  refreshPage: function() {
    if (app.isScheduling === false && app.isAllScheduled === true) {
      location.reload(true);
    }
  },
};

app.schedule.init();
