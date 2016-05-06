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
      incorrectInformation: 'Incorrect Information',
      noArticleId: 'No Article ID was supplied.',
      scheduleInformationUnavailable: 'Please note, scheduling information is unavailable at this time.',
      refresh: 'Please refresh.',
      noRuns: 'There are no runs with this ID.',
      noVersions: 'There are no versions with this ID.',
      errorQueueing: 'An error has occurred while queueing the article(s) requested. Please cancel and try again.',
      errorStatus: 'An error has occurred while checking the status of the article(s) requested. Please cancel and try again.',
    },
  },
};

