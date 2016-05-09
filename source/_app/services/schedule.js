'use strict';
/**
 * Controls the publishing on the dashboard and details page
 * @type {{init: app.schedule.init, bindEvents: app.schedule.bindEvents, initDateTimePicker: app.schedule.initDateTimePicker, validateToggleError: app.schedule.validateToggleError, validateForm: app.schedule.validateForm, setTime: app.schedule.setTime, setParameters: app.schedule.setParameters, updateModal: app.schedule.updateModal, setModalTitle: app.schedule.setModalTitle, resetParameters: app.schedule.resetParameters, performSchedule: app.schedule.performSchedule, refreshPage: app.schedule.refreshPage}}
 */
app.schedule = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.current-page').length > 0 || $('.detail-page').length > 0 || $('.scheduled-page').length > 0) {
      this.articleModalBodyTemplate = eLife.templates['schedule/article-schedule-modal-body'];
      this.articleModalFooterTemplate = eLife.templates['schedule/article-schedule-modal-footer'];
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
    $(document).on('click', '#schedule-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#schedule-modal #schedule-close', this.refreshPage.bind(this));
    $(document).on('change blur keyup', '.schedule-field', this.validateForm.bind(this));
  },

  /**
   * When the modal is loaded enable the date and time pickers.
   */
  initDateTimePicker: function() {
    // $('#schedule-action').prop('disabled', true).addClass('disabled');
    var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
    $('.datepicker').pickadate({
      disable: [
        {from: [0, 0, 0], to: yesterday},
      ],
      format: 'mmmm d, yyyy',
      formatSubmit: 'dd/mm/yyyy',
      onSet: function(context) {
        app.schedule.scheduleDate = context.select;
        app.schedule.validateForm();
      },
    });

  },

  /**
   * Toggle the class that indicates an error
   * @param $el
   * @param state
   */
  validateToggleError: function($el, state) {
    if (state) {
      $el.removeClass('validation-error');
    } else {
      $el.addClass('validation-error');
    }
  },

  /**
   * Validate the form
   * @returns {boolean}
   */
  validateForm: function() {
    this.setTime();
    var errors = 0;

    // Check for null fields
    var fields = $('#schedule-modal .schedule-field');
    errors = fields.length;
    _.each(fields, function(field) {
      var $el = $(field);
      var val = $el.val();
      var isValid = (!_.isEmpty(val)) ? true : false;
      if (isValid) {
        errors--;
      }

      app.schedule.validateToggleError($el, isValid);
    });

    // check each numeric field is numeric
    var numericfields = $('[data-validation="numeric"]', '#schedule-modal');
    errors += numericfields.length;
    _.each(numericfields, function(field) {
      var $el = $(field);
      var val = $el.val();
      var isValid = (app.utils.isNumeric(val) && !_.isNull(val)) ? true : false;
      if (isValid) {
        errors--;
      }

      app.schedule.validateToggleError($el, isValid);
    });


    // ensure max and min values are adhered to
    var maxminfields = $('[min][max]', '#schedule-modal');
    errors += maxminfields.length;
    _.each(maxminfields, function(field) {
      var $el = $(field);
      var val = parseInt($el.val());
      var min = parseInt($el.attr('min'));
      var max = parseInt($el.attr('max'));
      var isValid = (val >= min && val <= max) ? true : false;
      if (isValid) {
        errors--;
      }

      app.schedule.validateToggleError($el, isValid);
    });

    // check this time isn't in the past
    var isScheduledTimeValid = false;
    var $timeEl = $('.timepicker', '#schedule-modal');
    // console.log(moment().format('DD-MM-YYYY hh:mm a'));
    // console.log(moment(this.scheduleDateTime).format('DD-MM-YYYY hh:mm a'));
    if (moment().isAfter(this.scheduleDateTime)) {
      isScheduledTimeValid = false;
      errors++;
    } else {
      isScheduledTimeValid = true;
    }

    app.schedule.validateToggleError($timeEl, isScheduledTimeValid);

    return (errors == 0) ? true : false;
  },

  /**
   * set the time when time is entered
   */
  setTime: function() {
    console.log('setTime');
    app.schedule.scheduleTime = $('input[name="schedule_hour_submit"]').val() + ':' + $('input[name="schedule_minute_submit"]').val() + ' ' + $('select[name="schedule_ampm_submit"] option:selected').val();
    app.schedule.scheduleDateTime = moment(moment(app.schedule.scheduleDate).format('DD-MM-YYYY') + ' ' + app.schedule.scheduleTime, 'DD-MM-YYYY hh:mm a');
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
      this.validateForm();
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
    var formValid = this.validateForm();
    if (formValid) {
      app.isScheduling = true;
      if (this.scheduleActionType === 'future-schedule') {
        this.articleId = $('#schedule-id', '#schedule-modal').val();
      }

      var scheduleData = {};
      if (this.scheduleActionType !== 'schedule-cancel') {
        scheduleData = {
          article: {
            'article-identifier': this.articleId,
            scheduled: moment(this.scheduleDateTime).format('X')
          }
        };
      } else {
        scheduleData = {article: {'article-identifier': this.articleId, scheduled: false}};
      }

      // console.log(scheduleData);
      $('#schedule-modal #schedule-action').hide();
      $('#schedule-modal #schedule-cancel').hide();
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/schedule_article_publication',
        data: JSON.stringify(scheduleData),
        success: function(data) {
          this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
          var template = {actionType: app.schedule.scheduleActionType};
          template.success = (data.result == 'success') ? true : false;
          $('#schedule-modal .modal-body').html(this.queueArticleStatusTemplate(template));
          $('#schedule-close', '#schedule-modal').text('Close');
          app.isScheduling = false;
          app.isAllScheduled = true;
          $('#schedule-close', '#schedule-modal').focus();
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
    }
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