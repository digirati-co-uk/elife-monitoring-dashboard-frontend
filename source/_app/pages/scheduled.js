'use strict';
/**
 * Controls the future Scheduling page
 * Dont forget any changes to the calendar js will need to be copied over to the patternportfolio.js file
 * @type {{init: app.scheduled.init, bindEvents: app.scheduled.bindEvents, renderSwitcher: app.scheduled.renderSwitcher, renderActions: app.scheduled.renderActions, clickSwitchPage: app.scheduled.clickSwitchPage, switchPage: app.scheduled.switchPage, fetchScheduledArticles: app.scheduled.fetchScheduledArticles, renderCalendar: app.scheduled.renderCalendar, updateCalendar: app.scheduled.updateCalendar, convertArticlesToCalendar: app.scheduled.convertArticlesToCalendar}}
 */
app.scheduled = {
  /**
   * Initialise the methods for the scheduled page
   */
  init: function() {
    if ($('.scheduled-page').length > 0) {
      this.errorTemplate = eLife.templates['error-render'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
      this.scheduledContentListTemplate = eLife.templates['scheduled/scheduled-content-list'];
      this.scheduledContentCalendarTemplate = eLife.templates['scheduled/scheduled-content-calendar'];
      this.scheduledActionsTemplate = eLife.templates['scheduled/scheduled-actions'];
      this.scheduledSwitcherTemplate = eLife.templates['scheduled/scheduled-switcher'];
      this.loadingTemplate = eLife.templates['loading-template'];
      this.listDateStart = moment().format('X');
      this.listDateEnd = moment().add(1, 'years').format('X');
      this.$el = $('.scheduled-page');
      this.currentView = (!_.isUndefined($('.scheduled-page').attr('data-page-type'))) ? $('.scheduled-page').attr('data-page-type') : 'list';
      this.scheduled = [];
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
      this.renderSwitcher();
      this.renderActions();
      this.switchPage(this.currentView);
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $(this.$el).on('click', '.schedule-page-switch', this.clickSwitchPage.bind(this));
  },

  /**
   * Render the loading icon
   */
  renderLoader: function() {
    $('.schedule-page__content', this.$el).empty().html(this.loadingTemplate());
  },

  /**
   * Render the list / Calender switcher
   */
  renderSwitcher: function() {
    $('.schedule-page__switcher', this.$el).html(this.scheduledSwitcherTemplate({currentView: this.currentView}));
  },

  /**
   * Render the 'add scheduled articles' button
   */
  renderActions: function() {
    $('.schedule-page__actions', this.$el).html(this.scheduledActionsTemplate());
  },

  /**
   * Click to switch the page
   * @param e
   */
  clickSwitchPage: function(e) {
    this.currentView = $(e.currentTarget).attr('data-switch');
    this.switchPage(this.currentView);
  },

  /**
   * switch page content view
   * @param pageType
   */
  switchPage: function(pageType) {
    this.renderLoader();
    this.renderSwitcher();
    if (pageType === 'list') {
      var fetchScheduledArticles = this.fetchScheduledArticles(this.listDateStart, this.listDateEnd);
      fetchScheduledArticles.done(function(data) {
        $('.schedule-page__content', this.$el).empty().html(app.scheduled.scheduledContentListTemplate({scheduled: app.scheduled.scheduled}));
      });
    }

    if (pageType === 'calendar') {
      $('.schedule-page__content', this.$el).empty().html(app.scheduled.scheduledContentCalendarTemplate({scheduled: app.scheduled.scheduled}));
      this.renderCalendar();
    }

  },

  /**
   * Fetch Scheduled articles from the API - depending on list or calendar the start/end dates will be different
   * @param start
   * @param end
   */
  fetchScheduledArticles: function(start, end) {
    console.log('start ' + moment.unix(start).format('dddd, MMMM Do YYYY, h:mm:ss a'));
    console.log('end ' + moment.unix(end).format('dddd, MMMM Do YYYY, h:mm:ss a'));
    return $.ajax({
      url: app.API + 'api/article_schedule_for_range/from/' + start + '/to/' + end + '/',
      cache: false,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        app.scheduled.scheduled = data;
      },

      error: function(data) {
        console.error('Error retrieving date from ' + app.API + 'api/article_schedule_for_range/from/' + start + '/to/' + end + '/');
        console.log(data);
        var responseText = JSON.parse(data.responseText);
        $('.schedule-page__content', app.scheduled.$el).empty().html(app.scheduled.errorTemplate({
          response: data,
          responseText: responseText
        }));
        $('#error-console').empty().html(app.scheduled.errorDetailTemplate({
          response: data,
          responseText: responseText
        }));
      },
    });
  },

  /**
   * Render the calendar for the calendar view
   */
  renderCalendar: function() {
    $('#schedule-calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
      },
      eventRender: function(event, element) {
        //Show tooltip when hovering over an event title
        var toolTipContent = '<strong>' + event.title + '</strong><br/>' + moment(event.start).format('MMMM d, YYYY') + ' ' + moment(event.start).format('h:mm a');
        element.qtip({
          content: toolTipContent,
          hide: {fixed: true, delay: 200},
          style: 'qtip-light',
          position: {
            my: 'bottom center',
            at: 'top center',
            target: 'mouse',
            viewport: $('#fullcalendar'),
            adjust: {
              x: 0,
              y: -10,
              mouse: false,
              scroll: false,
            },
          },
        });
      },

      viewRender: function(view, element) {
        // this event fires once the calendar has completed loading and when the date is changed - thus calling the new events
        var start = moment(view.start).format('X');
        var end = moment(view.end).format('X');
        app.scheduled.updateCalendar(start, end);
      },

      timeFormat: 'h:mma',
      firstDay: 1,
      aspectRatio: 2,
      defaultView: 'month',
      fixedWeekCount: false,
      editable: false,

    });
  },

  /**
   * Called when the calendar is loaded, or the dates are changed
   * Fetches new articles according to the date requested and updtes the calendar to show them
   * @param start
   * @param end
   */
  updateCalendar: function(start, end) {
    $('#schedule-calendar', this.$el).before(this.loadingTemplate());
    var fetchScheduledArticles = this.fetchScheduledArticles(start, end);
    fetchScheduledArticles.done(function(data) {
      $('.loading-template', this.$el).remove();
      $('#schedule-calendar').fullCalendar('removeEvents');
      $('#schedule-calendar').fullCalendar('addEventSource', app.scheduled.convertArticlesToCalendar(app.scheduled.scheduled.articles));
      $('#schedule-calendar').fullCalendar('rerenderEvents');
    });
  },

  /**
   * Convert the data from the API to a format recognised by the calendar.
   * @param articles
   * @returns {Array}
   */
  convertArticlesToCalendar: function(articles) {
    var calendarArticles = [];
    _.each(articles, function(a) {
      var calendarArticle = [];
      calendarArticle.title = (a['is-advance']) ? a.id + ' (tmp)' : a.id;
      calendarArticle.backgroundColor = (a['is-advance']) ? app.colorAdvanceArticle : app.colorArticle;
      calendarArticle.borderColor = (a['is-advance']) ? app.colorAdvanceArticle : app.colorArticle;
      calendarArticle.textColor = app.colorText;
      calendarArticle.start = moment.unix(a['scheduled-publication-date']);
      if (!(a['is-advance'])) {
        calendarArticle.url = (app.config.ISPP) ? '/patterns/04-pages-01-detail/04-pages-01-detail.html?article/' + a.id : 'article/' + a.id;
      }
      calendarArticles.push(calendarArticle);
    });
    console.log(calendarArticles)
    return calendarArticles;
  },

};

app.scheduled.init();
