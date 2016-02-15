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
      this.scheduleDate = null;
      this.scheduleTime = null;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $(document).on('click', '#schedule-modal #schedule-action', this.performSchedule.bind(this));
    $(document).on('show.bs.modal', this.setParameters.bind(this));
    $(document).on('show.bs.modal', this.initDateTimePicker.bind(this));
    $(document).on('click', '#schedule-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#schedule-modal #schedule-close', this.refreshPage.bind(this));
  },

  /**
   * When the modal is loaded enable the date and time pickers.
   */
  initDateTimePicker: function() {
    $('#schedule-action').prop('disabled', true).addClass('disabled');
    $('.datepicker').pickadate({
      onSet: function(context) {
        app.schedule.scheduleDate = context.select;
        app.schedule.enableSchedule();
      },
    });
    $('.timepicker').pickatime({
      interval: 1,
      formatSubmit: 'HH:i',
      hiddenPrefix: 'schedule_time',
      onSet: function(context) {
        app.schedule.scheduleTime = $('input[name="schedule_time_submit"]').val();
        app.schedule.enableSchedule();
      },
    });

  },

  /**
   * When both date and time have been set in the modal, allow scheduling
   */
  enableSchedule: function() {
    if (!_.isNull(this.scheduleDate) && !_.isNull(this.scheduleTime)) {
      $('#schedule-action').prop('disabled', false).removeClass('disabled');
    }
  },

  /**
   * Set the parameters for the article scheduling.
   * @param e
   */
  setParameters: function(e) {
    var articleId = $('.article-detail').attr('data-article-id');
    this.articleId = articleId;
  },

  /**
   * Schedule the article using the service
   */
  performSchedule: function() {
    console.log('scheduleArticle');
    app.isScheduling = true;

    //@TODO the datetime format will probably need to be changed
    var dateTime = moment(app.schedule.scheduleDate).format('DD-MM-YYYY') + ' ' + moment(app.schedule.scheduleTime, 'HH:mm').format('hh:mm A');
    console.log(JSON.stringify({articleId: this.articleId, date: dateTime}));
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
