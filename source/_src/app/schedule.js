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
      this.scheduleActionType = null;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $(document).on('click', '#schedule-modal #schedule-action', this.performSchedule.bind(this));
    $(document).on('click', '#schedule-modal #schedule-cancel', this.performSchedule.bind(this));
    $(document).on('show.bs.modal', this.setParameters.bind(this));
    $(document).on('show.bs.modal', this.initDateTimePicker.bind(this));
    $(document).on('hide.bs.modal', this.resetParameters.bind(this));
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
    console.log(this.scheduleDate);
    console.log(this.scheduleTime);
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
    var data = {actionType: 'schedule'};
    this.articleId = articleId;
    this.scheduleActionType = $(e.relatedTarget).attr('id');
    this.articleModalBodyTemplate = eLife.templates['schedule/article-schedule-modal-body'];
    if (this.scheduleActionType === 'schedule-cancel') {
      $('#schedule-action', '#schedule-modal').addClass('hidden');
      $('#schedule-cancel', '#schedule-modal').removeClass('hidden');
      data.actionType = 'cancel';
    } else if (this.scheduleActionType === 'schedule-amend' || this.scheduleActionType === 'schedule') {
      $('#schedule-action', '#schedule-modal').removeClass('hidden');
      $('#schedule-cancel', '#schedule-modal').addClass('hidden');
      data.actionType = 'schedule';
    }

    $('#schedule-modal .modal-body').html(this.articleModalBodyTemplate(data));
  },

  /**
   * reset parameters on modal close
   */
  resetParameters: function() {
    console.log('reset')
    this.scheduleDate = null;
    this.scheduleTime = null;
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
      data: JSON.stringify({articleId: this.articleId, date: dateTime}),
      success: function(data) {
        console.log(data.scheduled)
        var template = {success: data.scheduled, actionType: app.schedule.scheduleActionType};
        this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
        console.log(template);
        $('#schedule-modal .modal-body').html(this.queueArticleStatusTemplate(template));
        app.isScheduling = false;
        app.isAllScheduled = true;
      },

      error: function(data) {
        var template = {success: true, actionType: app.schedule.scheduleActionType, message: 'There was an error talking to the API.'};
        this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
        $('#schedule-modal .modal-body').html(this.queueArticleStatusTemplate(template));
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
