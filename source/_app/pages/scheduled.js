'use strict';
/**
 * Controls the future Scheduling page
 * Dont forget any changes to the calendar js will need to be copied over to the patternportfolio.js file
 * URL structure
 * view=list|calendar
 * start=dd-mm-yyyy (list only)
 * end=dd-mm-yyyy (list only)
 * date=dd-mm-yyyy (calendar only)
 * type=month|agendaWeek|agendaDay (calendar only)
 *
 * @type {{init: app.scheduled.init, bindEvents: app.scheduled.bindEvents, renderSwitcher: app.scheduled.renderSwitcher, renderActions: app.scheduled.renderActions, clickSwitchPage: app.scheduled.clickSwitchPage, switchPage: app.scheduled.switchPage, fetchScheduledArticles: app.scheduled.fetchScheduledArticles, renderCalendar: app.scheduled.renderCalendar, updateCalendar: app.scheduled.updateCalendar, convertArticlesToCalendar: app.scheduled.convertArticlesToCalendar}}
 */
app.scheduled = {
  /**
   * Initialise the methods for the scheduled page
   */
  init: function() {
    if ($('.scheduled-page').length > 0) {
      this.scheduledContentListTemplate = eLife.templates['scheduled/scheduled-content-list'];
      this.scheduledContentCalendarTemplate = eLife.templates['scheduled/scheduled-content-calendar'];
      this.scheduledActionsTemplate = eLife.templates['scheduled/scheduled-actions'];
      this.scheduledSwitcherTemplate = eLife.templates['scheduled/scheduled-switcher'];
      this.loadingTemplate = eLife.templates['loading-template'];
      this.$el = $('.scheduled-page');
      this.urlSet = false;
      this.scheduled = [];

      this.defaultView = 'list';
      this.defaultViewType = 'month';
      this.defaultlistDateStart = moment().format('DD-MM-YYYY');
      this.defaultlistDateEnd = moment().add(1, 'years').format('DD-MM-YYYY');

      this.currentView = this.defaultView;
      this.currentViewType = this.defaultViewType;

      this.calendarDate = this.defaultlistDateStart;

      this.listDateStart = this.defaultlistDateStart;
      this.listDateEnd = this.defaultlistDateEnd;

      this.urlParams = {};
      Swag.registerHelpers(Handlebars);
      this.setPageUrl();
      this.bindEvents();
      this.renderSwitcher();
      this.renderActions();
      this.switchPage(this.currentView);
    }
  },

  /**
   * Generate the url for history.js
   * @returns {string}
   */
  createUrl: function() {

    // put the URL together
    var url = '?';
    if (this.currentView) {
      url += 'view=' + this.currentView;

      if (this.currentView ==  'list') {
        if (this.listDateStart) {
          url += '&start=' + this.listDateStart;
        }

        if (this.listDateEnd) {
          url += '&end=' + this.listDateEnd;
        }
      }

      if (this.currentView ==  'calendar') {
        if (this.currentViewType) {
          url += '&type=' + this.currentViewType;
        }

        if (this.calendarDate) {
          url += '&date=' + this.calendarDate;
        }
      }
    }

    return url;
  },

  getUrlParams: function () {
    var state = History.getState();
    var hash = state.hash;
    var urlObject = app.utils.urlObject(hash);
    return urlObject.parameters;
  },

  /**
   * Set the page url when first loading the page
   */
  setPageUrl: function() {
    // We're setting the page url here so the priority is to take items from the URL, else we will use the defaults from init
    this.urlParams = this.getUrlParams();


    // set from url
    if (_.has(this.urlParams, 'view')) {
      this.currentView = this.urlParams.view;
    }

    if (_.has(this.urlParams, 'start')) {
      this.listDateStart = this.urlParams.start;
    }

    if (_.has(this.urlParams, 'end')) {
      this.listDateEnd = this.urlParams.end;
    }

    if (_.has(this.urlParams, 'type')) {
      this.currentViewType = this.urlParams.type;
    }

    if (_.has(this.urlParams, 'date')) {
      this.calendarDate = this.urlParams.date;
    }

    var url = this.createUrl();
    History.replaceState(null, null, url);
  },

  /**
   * Update the page url when things happen. Things such as, clicking list/calendar button or changing the view in the calendar
   */
  updatePageUrl: function() {
    // here we have updated the globals so we will take the url data from the history object
    // unless its the list view where we use the default dates
    // (if we were coming from the updated url ones the setPageUrl  method would trigger instead of this one)
    if (this.currentView == 'list') {
      this.listDateStart = this.defaultlistDateStart;
      this.listDateEnd = this.defaultlistDateEnd;
    }

    var url = this.createUrl();
    History.pushState(null, null, url);
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
    app.scheduled.updatePageUrl();
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
    // console.log('fetchScheduledArticles');
    // console.log(start)
    // console.log(end)
    // console.log('/fetchScheduledArticles');

    var startDate = moment(start, 'DD-MM-YYYY').unix();
    var endDate = moment(end, 'DD-MM-YYYY').unix();

    return $.ajax({
      url: app.API + 'api/article_schedule_for_range/from/' + startDate + '/to/' + endDate + '/',
      cache: false,
      dataType: 'json',
      success: function(data) {
        // console.log(data);
        app.scheduled.scheduled = data;
      },

      error: function(data) {
        this.errorTemplate = eLife.templates['error-render'];
        $('.schedule-page__content').empty().html(this.errorTemplate(data));
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
        var toolTipContent = '<strong>' + event.title + '</strong><br/>' + moment(event.start).format('MMMM D, YYYY') + ' ' + moment(event.start).format('h:mm a');
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
        app.scheduled.currentViewType = view.type;
        // this event fires once the calendar has completed loading and when the date is changed - thus calling the new events
        var start = moment(view.start).format('DD-MM-YYYY');
        var end = moment(view.end).format('DD-MM-YYYY');
        app.scheduled.calendarDate = start;
        app.scheduled.updateCalendar(start, end);
      },

      timeFormat: 'h:mma',
      firstDay: 1,
      aspectRatio: 2,
      defaultView: this.currentViewType,
      fixedWeekCount: false,
      editable: false,
      lazyFetch: false,
      defaultDate: moment(app.scheduled.calendarDate, 'DD-MM-YYYY'),
      // events: app.scheduled.convertArticlesToCalendar(app.scheduled.scheduled.articles),
    });

    // console.log('calendar start date ' + moment(app.scheduled.calendarDate, 'DD-MM-YYYY').format('DD-MM-YYYY'))
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
      app.scheduled.updatePageUrl();
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

    return calendarArticles;
  },

};

app.scheduled.init();
