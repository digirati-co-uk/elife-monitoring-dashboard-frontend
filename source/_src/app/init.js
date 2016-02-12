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
};

