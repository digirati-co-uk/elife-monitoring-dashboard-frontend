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
    if ($('.current-page').length > 0 || $('.detail-page').length > 0 || $('.scheduled-page').length > 0) {
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
    $(document).on('keyup', '#schedule-modal #schedule-id', this.checkScheduleId.bind(this));
    $(document).on('keyup', '#schedule-modal #schedule-id', this.validateScheduleForm.bind(this));
  },

  /**
   * When the modal is loaded enable the date and time pickers.
   */
  initDateTimePicker: function() {
    $('#schedule-action').prop('disabled', true).addClass('disabled');
    var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
    $('.datepicker').pickadate({
      disable: [
        {from: [0, 0, 0], to: yesterday},
      ],
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
        app.schedule.scheduleTime = $('#schedule-time', '#schedule-modal').val();
        app.schedule.enableSchedule();
      },
    });

  },

  /**
   * When both date and time have been set in the modal, allow scheduling
   */
  enableSchedule: function() {
    this.validateScheduleForm();
  },

  validateScheduleForm: function() {
    var errors = 0;

    if (this.scheduleActionType === 'future-schedule' && !app.utils.isNumeric($('#schedule-id', '#schedule-modal').val())) {
      errors++;
    }

    if (_.isNull(this.scheduleDate)) {
      errors++;
    }

    if (_.isNull(this.scheduleTime)) {
      errors++;
    }

    if (errors === 0) {
      $('#schedule-action').prop('disabled', false).removeClass('disabled');
    } else {
      $('#schedule-action').prop('disabled', true).addClass('disabled');
    }
  },

  /**
   * Ensure schedule-id is numeric
   * @param e
   */
  checkScheduleId: function(e) {
    var val = $(e.currentTarget).val();
    var $parent = $(e.currentTarget).parents('.form-group');
    if (!app.utils.isNumeric(val)) {
      $parent.addClass('has-error');
    } else {
      $parent.removeClass('has-error');
    }
  },

  /**
   * Set the parameters for the article scheduling.
   * @param e
   */
  setParameters: function(e) {
    var articleId = $(e.relatedTarget).attr('data-article-id');
    var data = {actionType: 'schedule', includeArticleId: false};
    this.articleId = articleId;
    this.scheduleActionType = $(e.relatedTarget).attr('id');
    this.articleModalBodyTemplate = eLife.templates['schedule/article-schedule-modal-body'];
    if (this.scheduleActionType === 'schedule-cancel') {
      $('#schedule-action', '#schedule-modal').addClass('hidden');
      $('#schedule-cancel', '#schedule-modal').removeClass('hidden');
      data.actionType = 'cancel';
    } else if (this.scheduleActionType === 'schedule-amend' || this.scheduleActionType === 'schedule' || this.scheduleActionType === 'future-schedule') {
      $('#schedule-action', '#schedule-modal').removeClass('hidden');
      $('#schedule-cancel', '#schedule-modal').addClass('hidden');
      data.actionType = 'schedule';
    }

    if (this.scheduleActionType === 'future-schedule') {
      data.showArticleField = true;
    }

    $('#schedule-modal .modal-body').html(this.articleModalBodyTemplate(data));
  },

  /**
   * reset parameters on modal close
   */
  resetParameters: function() {
    this.scheduleDate = null;
    this.scheduleTime = null;
  },
  /**
   * Schedule the article using the service
   */
  performSchedule: function() {
    app.isScheduling = true;
    if (this.scheduleActionType === 'future-schedule') {
      this.articleId = $('#schedule-id', '#schedule-modal').val();
    }

    var dateTime = moment(app.schedule.scheduleDate).format('DD-MM-YYYY') + ' ' + moment(app.schedule.scheduleTime, 'HH:mm').format('hh:mm A');
    $('#schedule-modal #schedule-action').hide();
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: app.API + 'api/schedule_article_publication',
      data: JSON.stringify({articleId: this.articleId, date: moment(dateTime, 'DD-MM-YYYY HH:mm A').format('X')}),
      success: function(data) {
        console.log(data.scheduled);
        var template = {success: data.scheduled, actionType: app.schedule.scheduleActionType};
        this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
        console.log(template);
        $('#schedule-modal .modal-body').html(this.queueArticleStatusTemplate(template));
        app.isScheduling = false;
        app.isAllScheduled = true;
      },

      error: function(data) {
        var template = {
          success: true,
          actionType: app.schedule.scheduleActionType,
          message: 'There was an error talking to the API.',
        };
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
