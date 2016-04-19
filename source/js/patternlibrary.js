(function() {
  var articles = [
    {
      "backgroundColor": "#f1f1f1",
      "borderColor": "#f1f1f1",
      "length": 0,
      "start": moment(),
      "textColor": "#111",
      "title": "1112 (Adv.)"
    },
    {
      "backgroundColor": "#f1f1f1",
      "borderColor": "#f1f1f1",
      "length": 0,
      "start": moment().add(1, 'day'),
      "textColor": "#111",
      "title": "1112 (Adv.)"
    },
    {
      "backgroundColor": "#cde1f1",
      "borderColor": "#cde1f1",
      "length": 0,
      "start": moment().add(1, 'week'),
      "textColor": "#111",
      "title": "1112 (Adv.)"
    }
  ];
  $('#demo-calendar').fullCalendar({
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

    events: articles,

    timeFormat: 'h:mma',
    firstDay: 1,
    aspectRatio: 2,
    defaultView: 'month',
    fixedWeekCount: false,
    editable: false,

  });

})();