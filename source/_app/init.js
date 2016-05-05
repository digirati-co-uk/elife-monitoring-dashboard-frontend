'use strict';
var app = {
  ESCAPE_KEY: 27,
  API: config.API,
  config: config,
  queued: [],
  publishTimeout: 500,
  checkStatusInterval: 800,
  pollLimit: 250,
  isScheduling: false,
  isAllScheduled: false,
  isPublishing: false,
  isAllPublished: false,
  colorAdvanceArticle: '#f1f1f1',
  colorArticle: '#cde1f1',
  colorText: '#111',
  errors: {
    en: {
      apiError: 'API Error',
      missingInformation: 'Missing Information',
      noArticleId: 'No ArticleId was supplied, please go back and try again.',
      scheduleInformationUnavailable: 'Please note, scheduling information is unavailable at this time.',
      refresh: 'Please refresh.',
    },
  },
};

