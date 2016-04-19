'use strict';

app.current = {
  /**
   * Initialise the methods for the Current page
   */
  init: function() {
    if ($('.current-page').length > 0) {
      this.articles = [];
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
      this.renderArticles();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {

    $('#articles', '.current-page').on('change', 'input.toggle-publish-all:checkbox', this.toggleAddToQueueBtn.bind(this));

    $('#articles', '.current-page').on('click', '.btn-publish-queued', this.publishQueued.bind(this));
    $('#articles', '.current-page').on('click', '.btn-publish', this.publish.bind(this));

    $(window).on('scroll', this.stickyHeaders.bind(this));

  },

  /**
   * Fetch articles and render on the page.
   * Renders both the 'summary' at the top of the page and the list below
   */
  renderArticles: function() {
    this.loadingTemplate = eLife.templates['loading-template'];
    $('#articles').empty().html(this.loadingTemplate());
    $.ajax({
      url: app.API + 'api/current',
      cache: false,
      dataType: 'json',
      success: function(articles) {
        app.current.articles = articles;
        this.articleTemplate = eLife.templates['current/article'];
        $('#articles').empty().html(this.articleTemplate(app.current.sortArticles(articles)));
        this.articleStatsTemplate = eLife.templates['current/article-stats-template'];
        $('#articleStats').html(this.articleStatsTemplate(app.current.sortArticles(articles)));
        $('.btn-publish-queued').hide();
        if (app.config.ISPP) {
          // to work in PP we need to amend the urls
          _.each($('#articles table a'), function(a) {
            var link = $(a).attr('href');
            if (link.match(/article/)) {
              link = '/patterns/04-pages-01-detail/04-pages-01-detail.html?' + link;
              $(a).attr('href', link);
            }
          });
        }
      },

      error: function(data) {
        this.errorTemplate = eLife.templates['error-render'];
        $('#articles').empty().html(this.errorTemplate(data));
      },

    });
  },

  stickyHeaders: function(e) {
    $('.sticky').each(function() {
      var width = $(this).outerWidth();
      var caption = $('.sticky-header', this);
      var captionHeight = $('.sticky-header', this).outerHeight();
      var scrolled = $(document).scrollTop();
      var fromTop = $(this).offset().top;
      var scrollDuration = $('tbody', this).outerHeight();
      var fromTopHeight = fromTop + scrollDuration;
      if ($('table tr', this).length >= 2) {
        if (scrolled >= fromTop && scrolled <= fromTopHeight) {
          $(this).css('padding-top', captionHeight + 'px');
          $(caption).addClass('sticky').css('width', width + 'px');
        } else {
          $(this).css('padding-top', '0px');
          $(caption).removeClass('sticky').css('width', '');
        }
      }
    });
  },

  /**
   * Because the API returns data in any order and handlebars is limited we will sort here
   * Correct order: Error, In Progress, User input Required, Scheduled
   * @param articles
   * @returns {*}
   */
  sortArticles: function(articles) {
    var sortedArticles = {
      error: articles.error,
      inProgress: articles['in-progress'],
      uir: articles.uir,
      scheduled: articles.scheduled,
    };
    return sortedArticles;
  },

  /**
   * When you check a checkbox under any user input required
   * adds the relevant information for the checked item to the queue
   * @param e
   */
  toggleAddToQueueBtn: function(e) {
    $('.btn-publish-queued').show();
    var isChecked = $(e.target).is(':checked');
    if (isChecked === false) {
      var cnt = 0;
      $('input.toggle-publish-all:checkbox', '#articles').each(function(i, element) {
        var checkedState = $(element).is(':checked');
        if (checkedState === false) cnt++;
      });

      if (cnt === this.articles.uir.length) $('.btn-publish-queued').hide();
    }

    app.publish.populateQueue($(e.target).parents('tr'));
  },

  /**
   * When 'Publish all selected' active & clicked
   * Launch publish modal and update the list of queued items.
   *
   */
  publishQueued: function() {
    var isMultiple = (_.size(app.queued) > 1) ? true : false;
    app.publish.initModal(isMultiple);
    app.publish.displayQueueList();
  },
  /**
   * When 'Publish now' clicked
   * Launch publish modal and update the list of queued items.
   * @param e
   */
  publish: function(e) {
    app.publish.initModal(false);
    app.publish.populateQueue($(e.target).parents('tr'), true);
    app.publish.displayQueueList();
  },

};

app.current.init();
