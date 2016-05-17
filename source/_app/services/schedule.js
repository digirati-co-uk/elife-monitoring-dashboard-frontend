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
      this.queueArticleStatusTemplate = eLife.templates['schedule/article-schedule-modal-status'];
      this.errorTemplate = eLife.templates['error-render'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
      this.articleId = null;
      this.articleScheduled = null;
      this.scheduled = null;
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
    $(document).on('show.bs.modal', this.initDateTime.bind(this));
    $(document).on('show.bs.modal', this.updateModal.bind(this));
    $(document).on('hide.bs.modal', this.resetParameters.bind(this));
    $(document).on('click', '#schedule-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#schedule-modal #schedule-close', this.refreshPage.bind(this));
    $(document).on('change blur keyup', '.schedule-field', this.validateForm.bind(this));
  },

  /**
   * When the modal is loaded enable the date and time pickers.
   */
  initDateTime: function() {
    // $('#schedule-action').prop('disabled', true).addClass('disabled');
    var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
    var $datePicker = $('.datepicker').pickadate({
      disable: [
        {from: [0, 0, 0], to: yesterday},
      ],
      format: 'mmmm d, yyyy',
      formatSubmit: 'dd/mm/yyyy',
      onStart: function() {
        var day = moment.unix(app.schedule.articleScheduled).format('DD');
        var month = moment.unix(app.schedule.articleScheduled).format('MM');
        var year = moment.unix(app.schedule.articleScheduled).format('YYYY');
        month--; //only month for dates are zero indexed
        if (app.schedule.articleScheduled) {
          this.set('select', new Date(year, month, day));
        }
      },

      onSet: function(context) {
        var selectedDate = context.select;
        if (!app.utils.isNumeric(context.select)) {
          selectedDate = moment(selectedDate).format('x');
        }

        selectedDate = parseInt(selectedDate);
        app.schedule.scheduleDate = selectedDate;
        app.schedule.validateForm();
      },
    });

    // if we're rescheduling we will have an existing time date
    if (this.articleScheduled) {
      var hour = moment.unix(this.articleScheduled).format('hh');
      var minute = moment.unix(this.articleScheduled).format('mm');
      var ampm = moment.unix(this.articleScheduled).format('a');
      $('#schedule_hour_submit', '#schedule-modal').val(hour);
      $('#schedule_minute_submit', '#schedule-modal').val(minute);
      $('#schedule_ampm_submit', '#schedule-modal').val(ampm);
    }

  },

  /**
   * Toggle the class that indicates an error
   * @param $el
   * @param state
   */
  validateToggleError: function($el, state) {
    if (state === true) {
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
    if (!_.isNull(this.scheduleDate) && !_.isNull(this.scheduleTime)) {
      // console.log('current time is after the selected date ' + moment().isAfter(this.scheduleDateTime));
      if (moment().isAfter(this.scheduleDateTime)) {
        isScheduledTimeValid = false;
        errors++;
      } else {
        isScheduledTimeValid = true;
      }
    } else {
      isScheduledTimeValid = false;
      errors++;
    }

    app.schedule.validateToggleError($timeEl, isScheduledTimeValid);


    if (errors == 0) {
      $('#schedule-action', '#schedule-modal').prop('disabled', false).removeClass('disabled');
      return true;
    } else {
      $('#schedule-action', '#schedule-modal').prop('disabled', true).addClass('disabled');
      return false;
    }

  },

  /**
   * set the time when time is entered
   */
  setTime: function() {

    var hours = $('input[name="schedule_hour_submit"]').val();
    var minutes = $('input[name="schedule_minute_submit"]').val();
    if (!_.isEmpty(hours) && !_.isEmpty(minutes)) {
      this.scheduleTime = $('input[name="schedule_hour_submit"]').val() + ':' + $('input[name="schedule_minute_submit"]').val() + ' ' + $('select[name="schedule_ampm_submit"] option:selected').val();
    }

    if (!_.isNull(this.scheduleDate) && !_.isNull(this.scheduleTime)) {
      var date = moment(this.scheduleDate).format('DD-MM-YYYY');
      var datetime = date + ' ' + this.scheduleTime;
      this.scheduleDateTime = moment(datetime, 'DD-MM-YYYY hh:mm a');
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

  },

  /**
   * Display additional information in the modal
   * @param e
   */
  updateModal: function(e) {
    var articleDoi = $('#article-' + this.articleId + ' .article-doi').text();
    $('.article-cancel-info', '#schedule-modal').html(articleDoi);
    this.validateForm();
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
    var scheduleData = {};
    if (this.scheduleActionType !== 'schedule-cancel') {
      var formValid = this.validateForm();
    } else {
      var formValid = true;
    }
    
    if (formValid) {
      app.isScheduling = true;
      if (this.scheduleActionType === 'future-schedule') {
        this.articleId = $('#schedule-id', '#schedule-modal').val();
      }

      if (this.scheduleActionType !== 'schedule-cancel') {
        scheduleData = {
          article: {
            'article-identifier': this.articleId,
            scheduled: moment(this.scheduleDateTime).format('X')
          },
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
          console.info('Success: ' + app.API + 'api/schedule_article_publication');
          console.log(data);
          console.log(scheduleData);
          $('#schedule-modal .modal-body').html(app.schedule.queueArticleStatusTemplate({response: data, actionType: app.schedule.scheduleActionType}));
          $('#schedule-close', '#schedule-modal').text('Close');
          app.isScheduling = false;
          app.isAllScheduled = true;
        },

        error: function(data) {
          console.error(app.errors.en.type.api + ': ' + app.API + 'api/schedule_article_publication');
          console.log(scheduleData);
          console.log(data);
          var responseText = (_.has(data, 'responseText')) ? JSON.parse(data.responseText) : null;
          var error = {
            type: app.errors.en.type.api,
          };
          $('.modal-body', '#schedule-modal').empty().html(app.schedule.errorTemplate({response: data, responseText: responseText, error: error}));
          $('.modal-body', '#schedule-modal').append(app.schedule.errorDetailTemplate({response: data, responseText: responseText, error: error}));
          $('#schedule-close', '#schedule-modal').text('Close');
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
    // we're on the scheduled page and there is a scheduled date (ie not cancellation)
    if ($('.scheduled-page').length > 0 && this.scheduled) {
      $('#schedule-calendar').fullCalendar('gotoDate', this.scheduled);
    } else {
      if (app.isScheduling === false && app.isAllScheduled === true) {
        location.reload(true);
      }
    }
  },
};

app.schedule.init();