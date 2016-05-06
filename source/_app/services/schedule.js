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
      this.articleModalBodyTemplate = eLife.templates['schedule/article-schedule-modal-body'];
      this.articleModalFooterTemplate = eLife.templates['schedule/article-schedule-modal-footer'];
      this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
      this.articleId = null;
      this.articleScheduled = null;
      this.scheduleDate = null;
      this.scheduleTime = null;
      this.scheduleDateTime = null;
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
    $(document).on('show.bs.modal', this.updateModal.bind(this));
    $(document).on('hide.bs.modal', this.resetParameters.bind(this));
    $(document).on('keyup', '.timepicker', this.setTime.bind(this));
    $(document).on('keyup', '.ampmpicker', this.setTime.bind(this));
    $(document).on('click', '#schedule-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#schedule-modal #schedule-close', this.refreshPage.bind(this));
    $(document).on('keyup', '#schedule-modal #schedule-id', this.checkScheduleId.bind(this));
    $(document).on('keyup', '#schedule-modal #schedule-id', this.validateScheduleForm.bind(this));
  },

  /**
   * set the time when time is entered
   */
  setTime: function() {
    app.schedule.scheduleTime = $('input[name="schedule_hour_submit"]').val() + ':' + $('input[name="schedule_minute_submit"]').val() + ' ' + $('select[name="schedule_ampm_submit"] option:selected').val();
    app.schedule.enableSchedule();
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
      format: 'mmmm d, yyyy',
      formatSubmit: 'dd/mm/yyyy',
      onSet: function(context) {
        app.schedule.scheduleDate = context.select;
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

  /**
   * Validate the scheduler form
   */
  validateScheduleForm: function() {
    var errors = 0;

    // is it for the future - if so we need an id to add
    if (this.scheduleActionType === 'future-schedule' && !app.utils.isNumeric($('#schedule-id', '#schedule-modal').val())) {
      errors++;
    }

    // do we have a date?
    if (_.isNull(this.scheduleDate)) {
      errors++;
    }

    // check for hours
    var hours = parseInt($('#schedule_hour_submit', '#schedule-modal').val());
    var hasHours = app.utils.isNumeric(hours);
    if (!hasHours) {
      errors++;
    } else {
      if (hours < 0)
      {
        errors++;
      }

      if (hours > 12)
      {
        errors++;
      }
    }

    // check for minutes
    var minutes = parseInt($('#schedule_minute_submit', '#schedule-modal').val());
    var hasMinutes = app.utils.isNumeric(minutes);
    if (!hasMinutes) {
      errors++;
    } else {
      if (minutes < 0)
      {
        errors++;
      }

      if (minutes > 60)
      {
        errors++;
      }
    }

    // check this time isn't in the past
    if (!_.isNull(this.scheduleDate) && hasHours && hasMinutes) {
      this.scheduleDateTime = moment(moment(app.schedule.scheduleDate).format('DD-MM-YYYY') + ' ' + app.schedule.scheduleTime, 'DD-MM-YYYY hh:mm a');
      var scheduledTime = moment(this.scheduleDateTime).format('x');
      var now = moment().format('x');
      if (scheduledTime <= now) {
        errors++;
      }
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
    this.setModalTitle($(e.relatedTarget));
    var articleId = $(e.relatedTarget).attr('data-article-id');
    var articleScheduled = ($(e.relatedTarget).attr('data-scheduled')) ? $(e.relatedTarget).attr('data-scheduled') : false;
    var data = {actionType: 'schedule', includeArticleId: false};
    this.articleId = articleId;
    this.articleScheduled = articleScheduled;
    this.scheduleActionType = $(e.relatedTarget).attr('id');
    if (this.scheduleActionType === 'schedule-cancel') {
      data.actionType = 'cancel';
    } else if (this.scheduleActionType === 'schedule-amend' || this.scheduleActionType === 'schedule' || this.scheduleActionType === 'future-schedule') {
      data.actionType = 'schedule';
    }

    if (this.scheduleActionType === 'future-schedule') {
      data.showArticleIdField = true;
    }

    $('#schedule-modal .modal-body').html(this.articleModalBodyTemplate(data));
    $('#schedule-modal .modal-footer').html(this.articleModalFooterTemplate(data));

    if (this.articleScheduled) {
      $('.datepicker').attr('data-value', '').attr('data-value', this.articleScheduled);
      this.scheduleDate = this.articleScheduled;
      this.enableSchedule();
    }

  },

  /**
   * Display additional information in the modal
   * @param e
   */
  updateModal: function(e) {
    var articleDoi = $('#article-' + this.articleId + ' .article-doi').text();
    $('.article-cancel-info', '#schedule-modal').html(articleDoi);
  },

  /**
   * if custom data provided amend title
   */
  setModalTitle: function($target) {
    var title = $target.attr('data-title');
    if (!_.isUndefined(title)) {
      $('.modal-title', '#schedule-modal').html(title);
    }
  },

  /**
   * reset parameters on modal close
   */
  resetParameters: function() {
    this.scheduleDate = null;
    this.scheduleTime = null;
    this.scheduleDateTime = null;
  },
  /**
   * Schedule the article using the service
   */
  performSchedule: function() {
    app.isScheduling = true;
    if (this.scheduleActionType === 'future-schedule') {
      this.articleId = $('#schedule-id', '#schedule-modal').val();
    }

    var scheduleData = {};
    if (this.scheduleActionType !== 'schedule-cancel') {
      scheduleData = {article: {'article-identifier': this.articleId, scheduled: moment(this.scheduleDateTime).format('X')}};
    } else {
      scheduleData = {article: {'article-identifier': this.articleId, scheduled: false}};
    }

    console.log(scheduleData);
    $('#schedule-modal #schedule-action').hide();
    $('#schedule-modal #schedule-cancel').hide();
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: app.API + 'api/schedule_article_publication',
      data: JSON.stringify(scheduleData),
      success: function(data) {
        console.log(data)
        var template = {actionType: app.schedule.scheduleActionType};
        template.success = (data.result == 'success') ? true : false;
        $('#schedule-modal .modal-body').html(app.schedule.queueArticleStatusTemplate(template));
        $('#schedule-close', '#schedule-modal').text('Close');
        app.isScheduling = false;
        app.isAllScheduled = true;
      },

      error: function(data) {
        console.error('API Error: ' + app.API + 'api/schedule_article_publication');
        console.log(scheduleData);
        console.log(data);
        var template = {
          result: 'Failed',
          actionType: app.schedule.scheduleActionType,
          message: 'There was an error talking to the API, Your article, "' + app.schedule.articleId + '" has not been scheduled.',
        };
        $('#schedule-modal .modal-body').html(app.schedule.queueArticleStatusTemplate(template));
        var responseText = JSON.parse(data.responseText);
        $('#schedule-modal .modal-body').append(app.detail.errorDetailTemplate({response: data, responseText: responseText}));
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