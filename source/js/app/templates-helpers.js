Handlebars.registerHelper('elFormatUnixDate', function(date, format) {
  return moment.unix(date).format(format);
});