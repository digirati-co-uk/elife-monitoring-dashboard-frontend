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
  colorAdvanceArticle: '#cde1f1',
  colorArticle: '#f1f1f1',
  colorText: '#111',
};

