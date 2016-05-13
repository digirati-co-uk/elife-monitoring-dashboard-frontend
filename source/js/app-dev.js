/* eLife - v0.0.1 */
/* https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend */
/* Copyright (c) 2016 eLife; */

'use strict';

var config = {
  API: 'http://127.0.0.1:8008/',
  // API: 'http://127.0.0.1:5000/',
  ISPP: true,
};


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
      type: {
        api: 'API Error',
        application: 'Application Error',
      },
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
      errorScheduling: 'There was an error talking to the API, The article has not been scheduled.',
    },
  },
};


this["eLife"] = this["eLife"] || {};
this["eLife"]["templates"] = this["eLife"]["templates"] || {};

Handlebars.registerPartial("article-item", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.status : depth0),{"name":"lowercase","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"doi","hash":{},"data":data}) : helper)));
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Not yet available ("
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + ")";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <p>\n                <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n            </p>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <dt>\n                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\"><i>Version:</i></a>\n                    </dt>\n                    <dd>\n                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n                    </dd>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\"><i>Article type:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"article-type","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\"><i>Publication date:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\"><i>Corresponding authors:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["corresponding-authors"] || (depth0 != null ? depth0["corresponding-authors"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"corresponding-authors","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "        <td class=\"column-3\">\n            <p>\n                <b>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["event-type"] : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </b>\n            </p>\n        </td>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-type"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <br/>\n                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <a href=\""
    + alias4(((helper = (helper = helpers["preview-link"] || (depth0 != null ? depth0["preview-link"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preview-link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"btn btn-default preview\">\n                <span class=\"fa fa-eye\"></span>\n                Preview\n            </a>\n            <button class=\"btn btn-default schedule\" id=\"schedule\" data-toggle=\"modal\" data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                <span class=\"fa fa-calendar\"></span>\n                Schedule\n            </button>\n            <button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\"\n                    type=\"button\">\n                <span class=\"fa fa-globe\"></span>\n                Publish Now\n            </button>\n            <div class=\"checkbox\">\n                <label>\n                    <input type=\"checkbox\" class=\"toggle-publish-all\"> Batch Publishing\n                </label>\n            </div>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),{"name":"if","hash":{},"fn":container.noop,"inverse":container.program(30, data, 0),"data":data})) != null ? stack1 : "");
},"28":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "                <p><strong><span\n                        class=\"text-uppercase\">Scheduled</span><br/>"
    + alias3((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),"DD/MM/YYYY h:mma",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "\n                </strong></p><br/>\n                <button class=\"btn btn-default schedule\" id=\"schedule-amend\" data-toggle=\"modal\"\n                        data-target=\"#schedule-modal\"\n                        data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                        data-title=\"Re-schedule Article\"\n                        data-scheduled=\""
    + alias3((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),"DD/MM/YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "\">\n                    <span class=\"fa fa-calendar\"></span>\n                    Re-Schedule\n                </button>\n                <button class=\"btn btn-default schedule\" id=\"schedule-cancel\" data-toggle=\"modal\"\n                        data-target=\"#schedule-modal\"\n                        data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                        data-title=\"Cancel Schedule\">\n                    <span class=\"fa fa-calendar-minus-o\"></span>\n                    Cancel\n                </button>\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "            <!--<p><strong><span\n                    class=\"text-uppercase\"></span>\n            </strong></p>-->\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr data-article-title=\""
    + alias4(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-version=\""
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-run=\""
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\"\n    data-action=\"publish\">\n    <td class=\"column-1\">\n        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden-xs\">\n            <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n        </a>\n        <h6>\n            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</a>\n        </h6>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"column-2\">\n        <dl>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.version : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["article-type"] : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["corresponding-authors"] : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </dl>\n    </td>\n"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"isnt","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <td class=\"column-3\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"is","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"scheduled",{"name":"is","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n\n\n</tr>";
},"useData":true}));

Handlebars.registerPartial("article-detail-actions", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <a href=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["preview-link"] : stack1), depth0))
    + "\" target=\"_blank\" class=\"btn btn-default\">\n                <span class=\"fa fa-eye\"></span>\n                Preview\n            </a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"row\">\n    <div class=\"col-md-6\">\n        <span class=\"article-detail-scheduled\"></span>\n    </div>\n    <div class=\"col-md-6 text-right\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["preview-link"] : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <span class=\"article-detail-actions btn-group\"></span>\n    </div>\n</div>\n";
},"useData":true}));

Handlebars.registerPartial("article-detail", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <dt><i>Run id:</i></dt>\n                        <dd>"
    + container.escapeExpression(((helper = (helper = helpers.currentRun || (depth0 != null ? depth0.currentRun : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentRun","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Article type:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1), depth0))
    + "</dd>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Publication date:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1), depth0))
    + "</dd>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Corresponding authors:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1), depth0))
    + "</dd>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Authors:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.authors : stack1), depth0))
    + "</dd>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials["article-publish-modal"],depth0,{"name":"article-publish-modal","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-schedule-modal"],depth0,{"name":"article-schedule-modal","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<section class=\"article-detail\"  id=\"article-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n    <table class=\"snapshot\">\n        <tr>\n            <td class=\"column-1\">\n                <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n                <h6 class=\"article-doi\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "</h6>\n                <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.title : stack1), depth0))
    + "</p>\n            </td>\n            <td class=\"column-2\">\n                <dl>\n                    <dt><i>Version:</i></dt>\n                    <dd><strong>"
    + alias2(((helper = (helper = helpers.currentVersion || (depth0 != null ? depth0.currentVersion : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"currentVersion","hash":{},"data":data}) : helper)))
    + "</strong></dd>\n                    <dt><i>Run:</i></dt>\n                    <dd><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1["run-number"] : stack1), depth0))
    + "</strong></dd>\n                </dl>\n            </td>\n        </tr>\n    </table>\n    <table class=\"detail\">\n        <tr>\n            <td class=\"column-1\">\n                <dl>\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.currentRun : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.authors : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </dl>\n            </td>\n        </tr>\n    </table>\n</section>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("article-version-history", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li>\n                <div class=\"column-1 "
    + alias4(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),"start",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),"end",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),"error",{"name":"is","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <span>"
    + alias4(((helper = (helper = helpers["event-type"] || (depth0 != null ? depth0["event-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-type","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div class=\"column-2\">\n                    <dl>\n                        <dt><i>Timestamp:</i></dt>\n                        <dd class=\"divide\"><strong>"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"DD/MM/YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</strong></dd>\n                        <dd class=\"divide\"><strong>"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</strong></dd>\n                    </dl>\n                    <dl>\n                        <dt><i>Message:</i></dt>\n                        <dd>"
    + alias4(((helper = (helper = helpers["event-message"] || (depth0 != null ? depth0["event-message"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-message","hash":{},"data":data}) : helper)))
    + "</dd>\n                    </dl>\n                </div>\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"fa e-icon lg warning fa-exclamation-triangle  pull-left\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"fa e-icon lg success fa-check  pull-left\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"fa e-icon lg danger fa-times  pull-left\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"article-version-history\">\n    <ol class=\"article-version-history-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1.events : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"useData":true}));

Handlebars.registerPartial("article-version-list", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <li class=\""
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.details : depth0)) != null ? stack1["version-number"] : stack1),(depths[1] != null ? depths[1].currentVersion : depths[1]),{"name":"is","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\">\n                <span class=\"version-container\">\n                    <span class=\"version\">Version "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.details : depth0)) != null ? stack1["version-number"] : stack1), depth0))
    + "\n                    </span>\n                    <span class=\"status\"><span\n                            class=\"glyphicon reset-article-status-type "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.details : stack1)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + " \"></span></span>\n                </span>\n                <ol class=\"run-container\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = blockParams[0][0]) != null ? stack1.runs : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </ol>\n\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1.details : stack1)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data,"blockParams":blockParams}));
},"6":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression, alias5="function";

  return "                        <li class=\"run "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1),(depths[2] != null ? depths[2].currentVersion : depths[2]),{"name":"is","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                            <a href=\"/article/"
    + alias4(alias3(((stack1 = (depths[2] != null ? depths[2].article : depths[2])) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias4(alias3(((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1), depth0))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\" data-version=\""
    + alias4(alias3(((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1), depth0))
    + "\" data-run=\""
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">\n                                <span class=\"title\">Run "
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "</span>\n                                <span class=\"date\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["first-event-timestamp"] : depth0),"DD/MM/YYYY HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</span>\n                                <span class=\"icon\"><span class=\"fa fa-chevron-right\"></span></span>\n                            </a>\n                        </li>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["run-id"] : depth0),(depths[2] != null ? depths[2].currentRun : depths[2]),{"name":"is","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<section class=\"version-run-nav\">\n    <ol class=\"version-run-nav-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.versions : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"useData":true,"useDepths":true,"useBlockParams":true}));

Handlebars.registerPartial("article-publish-modal", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"btn btn-default pattern-helper\" data-toggle=\"modal\" data-target=\"#publish-modal\">\n    Modal\n</a>\n<div class=\"modal fade\" id=\"publish-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" aria-labelledby=\"publish-modal\">\n    <div class=\"modal-dialog modal-md\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Publish article(s)</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you sure you want to publish the following article(s)?\n                <ol id=\"articles-queue\"></ol>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"publish-close\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner publish-action\" id=\"publish-action\"></button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("article-schedule-modal", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"btn btn-default pattern-helper\">\n    Modal\n</a>\n<div class=\"modal fade\" id=\"schedule-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\"\n     aria-labelledby=\"schedule-modal\">\n    <div class=\"modal-dialog modal-md\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                        aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Schedule article</h4>\n            </div>\n            <div class=\"modal-body\"></div>\n            <div class=\"modal-footer\"></div>\n        </div>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("scheduled-article-item", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.status : depth0),{"name":"lowercase","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"doi","hash":{},"data":data}) : helper)));
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Not yet available ("
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + ")";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <p>\n                <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n            </p>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <dt>\n                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\"><i>Version:</i></a>\n                    </dt>\n                    <dd>\n                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n                    </dd>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\"><i>Article type:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"article-type","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\"><i>Publication date:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\"><i>Corresponding authors:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["corresponding-authors"] || (depth0 != null ? depth0["corresponding-authors"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"corresponding-authors","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "        <td class=\"column-3\">\n            <p><strong><span class=\"text-uppercase\">Scheduled</span><br/>"
    + alias3((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),"DD/MM/YYYY h:mma",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</strong></p><br/>\n            <button class=\"btn btn-default schedule\" id=\"schedule-amend\" data-toggle=\"modal\"\n                    data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                    data-title=\"Re-schedule Article\"\n                    data-scheduled=\""
    + alias3((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),"DD/MM/YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "\">\n                <span class=\"fa fa-calendar\"></span>\n                Re-Schedule\n            </button>\n            <button class=\"btn btn-default schedule\" id=\"schedule-cancel\" data-toggle=\"modal\"\n                    data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                    data-title=\"Cancel Schedule\">\n                <span class=\"fa fa-calendar-minus-o\"></span>\n                Cancel\n            </button>\n        </td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr id=\"article-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <td class=\"column-1\">\n        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden-xs\">\n            <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n        </a>\n        <h6>\n            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\" class=\"article-doi\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</a>\n        </h6>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"column-2\">\n        <dl>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.version : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["article-type"] : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["corresponding-authors"] : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </dl>\n    </td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</tr>";
},"useData":true}));

this["eLife"]["templates"]["current/article-stats-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[0][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"error",{"name":"is","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"inProgress",{"name":"is","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(7, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(9, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#error-list\">\n                        <span class=\"fa e-icon lg danger fa-exclamation-triangle\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#error-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles with Errors</span>\n                        </a>\n                    </div>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#in-progress-list\">\n                        <span class=\"fa e-icon lg info fa-cog\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#inProgress-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles are in Progress</span>\n                        </a>\n                    </div>\n                </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#uir-list\">\n                        <span class=\"fa e-icon lg muted fa-hand-o-down \"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#uir-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles require User Input<br>(Ready to Publish)</span>\n                        </a>\n                    </div>\n                </div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#scheduled-list\">\n                        <span class=\"fa e-icon lg warning fa-clock-o\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#scheduled-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles are Scheduled</span>\n                        </a>\n                    </div>\n                </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div class=\"section-map\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</div>\n\n\n";
},"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["current/article"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[0][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "        <section class=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "-list sticky\" id=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "-list\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "            <table class=\"article-snapshot-list\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"error",{"name":"is","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"inProgress",{"name":"is","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                <tbody>\n"
    + ((stack1 = helpers.each.call(alias3,blockParams[1][0],{"name":"each","hash":{},"fn":container.program(14, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </section>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <button href=\"#\" class=\"btn btn-default btn-publish-all-selected btn-publish-queued\" data-toggle=\"modal\"\n                        data-target=\"#publish-modal\" type=\"button\">\n                    <span class=\"fa fa-globe\"></span>\n                    Publish All Selected\n                </button>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption class=\"sticky-header\">\n                        <span class=\"fa e-icon md danger fa-warning  pull-left\"></span>\n                        <h4>Errors\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                                <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[3][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption class=\"sticky-header\">\n                        <span class=\"fa e-icon md info fa-cog  pull-left\"></span>\n                        <h4>In Progress\n                            <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n                        </h4>\n                    </caption>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption class=\"sticky-header\">\n                        <span class=\"fa e-icon md muted fa-hand-o-down  pull-left\"></span>\n                        <h4>\n                            User Input Required\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                            <br>(Ready to Publish)\n                        </h4>\n                    </caption>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption class=\"sticky-header\">\n                        <span class=\"fa e-icon md warning fa-clock-o  pull-left\"></span>\n                        <h4>Scheduled\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["article-item"],depth0,{"name":"article-item","hash":{"section":blockParams[2][1]},"data":data,"blockParams":blockParams,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["article-publish-modal"],depth0,{"name":"article-publish-modal","data":data,"blockParams":blockParams,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-schedule-modal"],depth0,{"name":"article-schedule-modal","data":data,"blockParams":blockParams,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["detail/article-detail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"row\">\n    <div class=\"col-md-3\">\n"
    + ((stack1 = container.invokePartial(partials["article-version-list"],depth0,{"name":"article-version-list","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"col-md-9\">\n"
    + ((stack1 = container.invokePartial(partials["article-info"],depth0,{"name":"article-info","hash":{"section":(depth0 != null ? depth0.articleDetail : depth0)},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-version-history"],depth0,{"name":"article-version-history","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["detail/article-scheduled-for"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <p><span class=\"text-muted\">Scheduled for <em><strong>"
    + container.escapeExpression((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduleStatus : depth0)) != null ? stack1.scheduled : stack1),"MMMM D, YYYY h:mma",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</strong></em></span></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduleStatus : depth0)) != null ? stack1.scheduled : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["detail/article"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"detail-errors\"></div>\n"
    + ((stack1 = container.invokePartial(partials["article-detail-actions"],depth0,{"name":"article-detail-actions","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row\">\n    <div class=\"col-md-3\">\n"
    + ((stack1 = container.invokePartial(partials["article-version-list"],depth0,{"name":"article-version-list","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"col-md-9\">\n"
    + ((stack1 = container.invokePartial(partials["article-detail"],depth0,{"name":"article-detail","hash":{"section":(depth0 != null ? depth0.articleDetail : depth0)},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-version-history"],depth0,{"name":"article-version-history","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["detail/buttons-publish"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\"\n            type=\"button\"\n            data-action=\"publish\"\n            data-article-title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "\"\n            data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n            data-article-version=\""
    + alias2(((helper = (helper = helpers.currentVersion || (depth0 != null ? depth0.currentVersion : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentVersion","hash":{},"data":data}) : helper)))
    + "\"\n            data-article-run=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1["run-id"] : stack1), depth0))
    + "\">\n        <span class=\"fa fa-globe\"></span>\n        Publish Now\n    </button>";
},"useData":true});

this["eLife"]["templates"]["detail/buttons-reschedule"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<button class=\"btn btn-default schedule\" id=\"schedule-amend\" data-toggle=\"modal\"\n        data-target=\"#schedule-modal\"\n        data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n        data-title=\"Re-schedule Article\">\n    <span class=\"fa fa-calendar\"></span>\n    Re-Schedule\n</button>\n<button class=\"btn btn-default schedule\" id=\"schedule-cancel\" data-toggle=\"modal\"\n        data-target=\"#schedule-modal\"\n        data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n        data-title=\"Cancel Schedule\">\n    <span class=\"fa fa-calendar-minus-o\"></span>\n    Cancel Schedule\n</button>";
},"useData":true});

this["eLife"]["templates"]["detail/buttons-schedule"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<button class=\"btn btn-default schedule\" id=\"schedule\" data-toggle=\"modal\" data-target=\"#schedule-modal\"\n        data-article-id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n    <span class=\"fa fa-calendar\"></span>\n    Schedule\n</button>";
},"useData":true});

this["eLife"]["templates"]["error-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"alert alert-muted\">\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n            <p class=\"h5 text-uppercase\">\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.response : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.error : depth0)) != null ? stack1.type : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            </p>\n        </div>\n        <div class=\"col-sm-6 text-right\">\n            <button class=\"btn btn-default\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseExample\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n                Show Details\n            </button>\n        </div>\n    </div>\n    <div class=\"collapse\" id=\"collapseExample\">\n        <hr />\n        "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.message : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.detail : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return alias2(alias1(((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.status : stack1), depth0))
    + ": "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.statusText : stack1), depth0));
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.error : depth0)) != null ? stack1.type : stack1), depth0))
    + ")";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.message : stack1), depth0))
    + "</p>";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"well\"><p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.detail : stack1), depth0))
    + "</p></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.detail : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["error-render"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "alert-"
    + container.escapeExpression(((helper = (helper = helpers.errorType || (depth0 != null ? depth0.errorType : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"errorType","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "alert-danger";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.statusText : stack1), depth0));
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.status : stack1), depth0))
    + ":";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.error : depth0)) != null ? stack1.type : stack1), depth0))
    + ")";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.message : stack1), depth0))
    + "</p>";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"14":function(container,depth0,helpers,partials,data) {
    return "</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"alert elf-alert "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.errorType : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n<p class=\"h5 text-uppercase\">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.response : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.error : depth0)) != null ? stack1.type : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</p>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.responseText : depth0)) != null ? stack1.message : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.status : stack1),500,{"name":"is","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["loading-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"loading-template text-center\"><div class=\"throbber-loader throbber-loader--small \"></div></div>";
},"useData":true});

this["eLife"]["templates"]["publish/article-publish-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"fa e-icon sm danger fa-times\"></span>\n        <br />\n        <span class=\"text-muted\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return ":";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <div class=\"throbber-loader throbber-loader--small \"></div>\n        <br />\n        <span class=\"text-muted\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"fa e-icon sm success fa-check\"></span>\n        <br />\n        <span class=\"text-muted\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"article-status "
    + alias4(((helper = (helper = helpers["publication-status"] || (depth0 != null ? depth0["publication-status"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publication-status","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"error",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"queued",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"ready to publish",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"published",{"name":"is","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n\n";
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal-body"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.showArticleIdField : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <p>When do you want to schedule this article?</p>\n    <p class=\"article-cancel-info\"></p>\n    <br/>\n    <div class=\"form-group\">\n        <div class=\"col-sm-12\">\n            <input id=\"schedule-date\" name=\"date\" class=\"form-control datepicker\" type=\"text\" placeholder=\"Date\">\n        </div>\n    </div>\n    <br/>\n    <br/>\n    <div class=\"form-group\">\n        <div class=\"col-sm-12\">\n            <div class=\"timepicker\">\n                <div class=\"timepicker-hour\">\n                    <input id=\"schedule_hour_submit\" name=\"schedule_hour_submit\"\n                           class=\"form-control timepicker hourpicker\"\n                           type=\"number\" placeholder=\"Hour\">\n                </div>\n                <div class=\"timepicker-divider\">:</div>\n                <div class=\"timepicker-minute\">\n                    <input id=\"schedule_minute_submit\" name=\"schedule_minute_submit\"\n                           class=\"form-control timepicker minutepicker\" type=\"number\" placeholder=\"Minute\">\n                </div>\n                <div class=\"timepicker-ampm\">\n                    <select class=\"form-control timepicker ampmpicker\" name=\"schedule_ampm_submit\">\n                        <option value=\"am\">am</option>\n                        <option value=\"pm\" selected=\"selected\">pm</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br/>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "        <p>Please enter the ID of the article you wish to publish:</p>\n        <br/>\n        <div class=\"form-group\">\n            <div class=\"col-sm-12\">\n                <input id=\"schedule-id\" name=\"id\" class=\"form-control\" type=\"text\" placeholder=\"Article ID\">\n            </div>\n        </div>\n        <br/>\n        <hr/>\n        <br/>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"alert alert-warning\">\n        <p>Are you sure you want to cancel the publication of this article?</p>\n        <p class=\"article-cancel-info\"></p>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"cancel",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal-footer"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"schedule-close\">No</button>\n    <button type=\"button\" class=\"btn btn-primary has-spinner\" id=\"schedule-cancel\">Yes</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"schedule-close\">Close</button>\n    <button type=\"button\" class=\"btn btn-primary has-spinner\" id=\"schedule-action\">Schedule</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.actionType : depth0),"cancel",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "    <div class=\"alert alert-success\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule-cancel",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule-cancel",{"name":"isnt","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <p>This article has been unscheduled.</p>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <p>Your article has been successfully scheduled.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return container.escapeExpression((helpers.debug || (depth0 && depth0.debug) || alias2).call(alias1,(depth0 != null ? depth0.response : depth0),{"name":"debug","hash":{},"data":data}))
    + "\n\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.result : stack1),"success",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-actions"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["article-schedule-modal"],depth0,{"name":"article-schedule-modal","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<p class=\"text-right\">\n    <button class=\"btn btn-default schedule\" id=\"future-schedule\" data-toggle=\"modal\" data-target=\"#schedule-modal\" data-title=\"Add Scheduled Article\">\n        <span class=\"fa fa-clock-o\"></span>\n        Add Scheduled Article\n    </button>\n</p>";
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-content-calendar"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"schedule-calendar\" class=\"calendar\"></div>\n<br/>\n<p>\n    <span class=\"fc-event\" style=\"background-color:#cde1f1;border-color:#cde1f1;color:#111;display:inline-block;\"><strong>3:40pm</strong> 09672 (tmp)</span> <br>\n    <strong>Advance Article</strong> <br> Articles which have been scheduled but which are not yet in eLife Continuum system.\n</p>\n<br>\n<p>\n    <span class=\"fc-event\" style=\"background-color:#f1f1f1;border-color:#f1f1f1;color:#111;display:inline-block;\"><strong>4:17pm</strong> 09672</span> <br>\n    <strong>Article</strong> <br> Scheduled Articles which are in the eLife Continuum system.\n</p>";
},"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-content-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <section class=\"scheduled-list sticky\" id=\"scheduled-list\">\n        <table class=\"article-snapshot-list\">\n            <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduled : depth0)) != null ? stack1.articles : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </tbody>\n        </table>\n    </section>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["scheduled-article-item"],depth0,{"name":"scheduled-article-item","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "    <p class=\"text-center\">There are currently no articles scheduled.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduled : depth0)) != null ? stack1.articles : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-switcher"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "btn-primary";
},"3":function(container,depth0,helpers,partials,data) {
    return "btn-default";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.currentView : depth0),"list",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " schedule-page-switch\" data-switch=\"list\"><span\n            class=\"fa fa-list-ul\" aria-hidden=\"true\"></span> List\n    </button>\n    <button type=\"button\" class=\"btn "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.currentView : depth0),"calendar",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " schedule-page-switch\" data-switch=\"calendar\"><span\n            class=\"fa fa-calendar\" aria-hidden=\"true\"></span> Calendar\n    </button>\n</div>";
},"useData":true});
Handlebars.registerHelper('elFormatUnixDate', function(date, format) {
  return moment.unix(date).format(format);
});
'use strict';

app.utils = {
  removeObject: function(obj, match) {
    var queued = [];
    _.each(obj, function(queue) {
      if (!_.isEqual(queue, match)) {
        queued.push(queue);
      }
    });

    return queued;
  },

  addObject: function(obj, match) {
    obj.push(match);
    return obj;
  },

  getNthObjectKey: function(obj, n) {
    var nth = [];
    var i = 0;
    _.each(obj, function(item, key) {
      if (i === n) {
        nth = key;
      }

      i++;
    });

    return nth;
  },

  /**
   * Find last key of object
   * @param list
   * @returns {*}
   */
  findLastKey: function(list) {
    var lastKey = false;
    var cnt = 1;
    var total = _.keys(list).length;
    _.each(list, function(lst, key) {
      if (cnt === total) {
        lastKey = key;
      }

      cnt++;
    });

    return lastKey;
  },

  /**
   * inserts the string value (third parameter) before the specified integer index (second parameter) in the string str (first parameter), and then returns the new string without changing str
   * @param str
   * @param index
   * @param value
   * @returns {string}
   */
  insert: function(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  },

  /**
   * Test if a string is all numeric or not
   * @param string
   * @returns {boolean}
   */
  isNumeric: function(string) {
    var hasNumber = /^\d+$/;
    return hasNumber.test(string);
  }

};

'use strict';
/**
 * Controls the publishing on the dashboard and details page
 * @type {{init: app.publish.init, bindEvents: app.publish.bindEvents, initModal: app.publish.initModal, populateQueue: app.publish.populateQueue, displayQueueList: app.publish.displayQueueList, refreshPage: app.publish.refreshPage, resetModalButtons: app.publish.resetModalButtons, performPublish: app.publish.performPublish, queueArticles: app.publish.queueArticles, checkArticleStatus: app.publish.checkArticleStatus, updateQueueListStatus: app.publish.updateQueueListStatus, finishPublishing: app.publish.finishPublishing}}
 */
app.publish = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.current-page').length > 0 || $('.detail-page').length > 0) {
      this.errorTemplate = eLife.templates['error-render'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
      this.checkingStatus = '';
      this.queuePolled = 0;
      Swag.registerHelpers(Handlebars);
      this.bindEvents();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $(document).on('hide.bs.modal', this.refreshPage.bind(this));
    $(document).on('click', '#publish-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#publish-modal #publish-close', this.refreshPage.bind(this));
    $(document).on('click', '#publish-modal #publish-action', this.performPublish.bind(this));
  },

  /**
   * Initialise modal, not actually loading the modal, thats done in bootstrap
   * @param isMultiple
   */
  initModal: function(isMultiple) {
    var btnText = (isMultiple) ? 'Publish All' : 'Publish';
    $('#articles-queue', '#publish-modal').empty();
    $('#publish-action', '#publish-modal').empty().text(btnText);
  },

  /**
   * Amend queued items.
   * @param target
   * @param publishNow
   */
  populateQueue: function(target, publishNow) {
    var articleId = target.attr('data-article-id');
    var articleVer = target.attr('data-article-version');
    var articleRun = target.attr('data-article-run');
    var addToQueue = {id: articleId, version: articleVer, run: articleRun};
    if (publishNow) {
      app.queued = [];
      app.queued = app.utils.addObject(app.queued, addToQueue);
    } else {
      if (_.findWhere(app.queued, addToQueue)) {
        app.queued = app.utils.removeObject(app.queued, addToQueue);
      } else {
        app.queued = app.utils.addObject(app.queued, addToQueue);
      }
    }
  },

  /**
   * Update the queue list to the items in the queue
   * @param article
   */
  displayQueueList: function() {
    _.each(app.queued, function(article) {
      var title = $('[data-article-id=' + article.id + '][data-action=publish]').attr('data-article-title');
      var listItem = $('<li>' + title + '</li>');
      listItem.data({id: article.id, version: article.version, run: article.run});
      $('#articles-queue').append(listItem);
    });
  },

  /**
   * refresh page when
   * user clicks and isPublishing or isAllPublished are true
   * @param e
   */
  refreshPage: function(e) {
    if (app.isPublishing === true || app.isAllPublished === true) {
      location.reload(true);
    }

    this.resetModalButtons();
  },

  /**
   * Reset the modal buttons and publish checkboxes
   */
  resetModalButtons: function() {
    $('#publish-action', '#publish-modal').prop('disabled', false).removeClass('disabled');
    $('#articles-queue', '#publish-modal').empty();

    // Specific to current page
    $('.btn-publish-queued').hide();
    $('.toggle-publish-all').each(function(i, e) {
      $(e).prop('checked', false);
    });

    app.queued = [];
  },

  /**
   * queue articles to the publishing service
   * @param e
   */
  performPublish: function(e) {
    $('#publish-action', '#publish-modal').prop('disabled', true).addClass('disabled');
    app.isPublishing = true;
    this.queueArticles(app.queued);

  },

  /**
   * Queue articles to the service, set timeout to keep polling for the status
   * @param queued
   */
  queueArticles: function(queued) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: app.API + 'api/queue_article_publication',
      data: JSON.stringify({articles: queued}),
      success: function(data) {
        app.publish.updateQueueListStatus(data.articles);
        setTimeout(app.publish.checkArticleStatus(app.queued), app.publishTimeout);
      },

      error: function(data) {
        console.error(app.errors.en.type.api + ': ' + app.API + 'api/queue_article_publication');
        console.log(data);
        console.log({articles: queued});
        var responseText = JSON.parse(data.responseText);
        var error = {
          type: app.errors.en.type.api,
        };
        $('.modal-body', '#publish-modal').empty().html(app.publish.errorTemplate({response: data, responseText: responseText, error: error}));
        $('.modal-body', '#publish-modal').append(app.publish.errorDetailTemplate({response: data, responseText: responseText, error: error}));
      },
    });
  },

  /**
   * Poll service to find out what is happening
   * @param queued
   */
  checkArticleStatus: function(queued) {
    app.publish.updateQueueListStatus(queued);
    this.checkingStatus = setInterval(function() {
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/article_publication_status',
        data: JSON.stringify({articles: queued}),
        success: function(data) {
          app.publish.updateQueueListStatus(data.articles);
        },

        error: function(data) {
          console.error(app.errors.en.type.api + ': ' + app.API + 'api/article_publication_status');
          console.log(data);
          console.log({articles: queued});
          var responseText = JSON.parse(data.responseText);
          var error = {
            type: app.errors.en.type.api,
          };
          $('.modal-body', '#publish-modal').empty().html(app.publish.errorTemplate({response: data, responseText: responseText, error: error}));
          $('.modal-body', '#publish-modal').append(app.publish.errorDetailTemplate({response: data, responseText: responseText, error: error}));
          this.isPublishing = false;
          clearInterval(app.publish.checkingStatus);
        },
      });
    }, app.checkStatusInterval);
  },

  /**
   * Update the queue with correct status icons and work out when publishing has finished
   * @param queuedArticles
   */
  updateQueueListStatus: function(queuedArticles) {
    this.queuePolled++;
    app.queued = queuedArticles;
    var total = 0;
    var status = {completed: 0, error: 0};
    var articleQueue = $('#articles-queue li');
    var articlePublishStatusTemplate = eLife.templates['publish/article-publish-modal-status'];
    var queuedItems = app.queued;

    _.each(articleQueue, function(articleQueue, i) {
      var articleId = $(articleQueue).data('id');
      var articleVer = $(articleQueue).data('version');
      var articleRun = $(articleQueue).data('run');
      var displayInQueue = {id: articleId, version: articleVer, run: articleRun};
      var queuedItem = _.find(queuedItems, displayInQueue);
      switch (queuedItem['publication-status']) {
        case 'published':
          status.completed++;
          break;
        case 'error':
          status.error++;
          break;
      }
      $('.article-status', articleQueue).remove();
      $(articleQueue).append(articlePublishStatusTemplate(queuedItem));
    });

    _.each(status, function(s) {
      total = total + s;
    });

    // max polls reached
    if (this.queuePolled === app.pollLimit) {
      console.info('max polls reached');
      this.finishPublishing();
    }

    // all status's are complete or errors stop checking
    if (total === queuedItems.length) {
      console.info('all queued items are either complete or errors');
      this.finishPublishing();
    }
  },

  /**
   * We've finished publushing - set some flags and tidy up
   */
  finishPublishing: function() {
    app.isPublishing = false;
    app.isAllPublished = true;
    clearInterval(app.publish.checkingStatus);
    console.info('publishingFinished');
  },

};

app.publish.init();

'use strict';
/**
 * Controls the publishing on the dashboard and details page
 * @type {{init: app.publish.init, bindEvents: app.publish.bindEvents, initModal: app.publish.initModal, populateQueue: app.publish.populateQueue, displayQueueList: app.publish.displayQueueList, refreshPage: app.publish.refreshPage, resetModalButtons: app.publish.resetModalButtons, performPublish: app.publish.performPublish, queueArticles: app.publish.queueArticles, checkArticleStatus: app.publish.checkArticleStatus, updateQueueListStatus: app.publish.updateQueueListStatus, finishPublishing: app.publish.finishPublishing}}
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
    $(document).on('show.bs.modal', this.initDateTimePicker.bind(this));
    $(document).on('show.bs.modal', this.updateModal.bind(this));
    $(document).on('hide.bs.modal', this.resetParameters.bind(this));
    $(document).on('keyup', '.timepicker', this.setTime.bind(this));
    $(document).on('keyup', '.ampmpicker', this.setTime.bind(this));
    $(document).on('click', '#schedule-modal .close', this.refreshPage.bind(this));
    $(document).on('click', '#schedule-modal #schedule-close', this.refreshPage.bind(this));
    $(document).on('keyup', '#schedule-modal #schedule-id', this.checkScheduleId.bind(this));
    $(document).on('keyup', '#schedule-modal #schedule-id', this.validateScheduleForm.bind(this));
  },

  /**
   * set the time when time is entered
   */
  setTime: function() {
    app.schedule.scheduleTime = $('input[name="schedule_hour_submit"]').val() + ':' + $('input[name="schedule_minute_submit"]').val() + ' ' + $('select[name="schedule_ampm_submit"] option:selected').val();
    app.schedule.enableSchedule();
  },

  /**
   * When the modal is loaded enable the date and time pickers.
   */
  initDateTimePicker: function() {
    $('#schedule-action').prop('disabled', true).addClass('disabled');
    var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
    $('.datepicker').pickadate({
      disable: [
        {from: [0, 0, 0], to: yesterday},
      ],
      format: 'mmmm d, yyyy',
      formatSubmit: 'dd/mm/yyyy',
      onSet: function(context) {
        app.schedule.scheduleDate = context.select;
        app.schedule.enableSchedule();
      },
    });

  },

  /**
   * When both date and time have been set in the modal, allow scheduling
   */
  enableSchedule: function() {
    this.validateScheduleForm();
  },

  /**
   * Validate the scheduler form
   */
  validateScheduleForm: function() {
    var errors = 0;

    // is it for the future - if so we need an id to add
    if (this.scheduleActionType === 'future-schedule' && !app.utils.isNumeric($('#schedule-id', '#schedule-modal').val())) {
      errors++;
    }

    // do we have a date?
    if (_.isNull(this.scheduleDate)) {
      errors++;
    }

    // check for hours
    var hours = parseInt($('#schedule_hour_submit', '#schedule-modal').val());
    var hasHours = app.utils.isNumeric(hours);
    if (!hasHours) {
      errors++;
    } else {
      if (hours < 0)
      {
        errors++;
      }

      if (hours > 12)
      {
        errors++;
      }
    }

    // check for minutes
    var minutes = parseInt($('#schedule_minute_submit', '#schedule-modal').val());
    var hasMinutes = app.utils.isNumeric(minutes);
    if (!hasMinutes) {
      errors++;
    } else {
      if (minutes < 0)
      {
        errors++;
      }

      if (minutes > 60)
      {
        errors++;
      }
    }

    // check this time isn't in the past
    if (!_.isNull(this.scheduleDate) && hasHours && hasMinutes) {
      this.scheduleDateTime = moment(moment(app.schedule.scheduleDate).format('DD-MM-YYYY') + ' ' + app.schedule.scheduleTime, 'DD-MM-YYYY hh:mm a');
      var scheduledTime = moment(this.scheduleDateTime).format('x');
      var now = moment().format('x');
      if (scheduledTime <= now) {
        errors++;
      }
    }

    if (errors === 0) {
      $('#schedule-action').prop('disabled', false).removeClass('disabled');
    } else {
      $('#schedule-action').prop('disabled', true).addClass('disabled');
    }
  },

  /**
   * Ensure schedule-id is numeric
   * @param e
   */
  checkScheduleId: function(e) {
    var val = $(e.currentTarget).val();
    var $parent = $(e.currentTarget).parents('.form-group');
    if (!app.utils.isNumeric(val)) {
      $parent.addClass('has-error');
    } else {
      $parent.removeClass('has-error');
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

    if (this.articleScheduled) {
      $('.datepicker').attr('data-value', '').attr('data-value', this.articleScheduled);
      this.scheduleDate = this.articleScheduled;
      this.enableSchedule();
    }

  },

  /**
   * Display additional information in the modal
   * @param e
   */
  updateModal: function(e) {
    var articleDoi = $('#article-' + this.articleId + ' .article-doi').text();
    $('.article-cancel-info', '#schedule-modal').html(articleDoi);
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
    app.isScheduling = true;
    if (this.scheduleActionType === 'future-schedule') {
      this.articleId = $('#schedule-id', '#schedule-modal').val();
    }

    var scheduleData = {};
    if (this.scheduleActionType !== 'schedule-cancel') {
      scheduleData = {article: {'article-identifier': this.articleId, scheduled: moment(this.scheduleDateTime).format('X')}};
    } else {
      scheduleData = {article: {'article-identifier': this.articleId, scheduled: false}};
    }

    console.log(scheduleData);
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
        $('.modal-body', '#schedule-modal').empty().html(app.publish.errorTemplate({response: data, responseText: responseText, error: error}));
        $('.modal-body', '#schedule-modal').append(app.publish.errorDetailTemplate({response: data, responseText: responseText, error: error}));
        $('#schedule-close', '#schedule-modal').text('Close');
        app.isScheduling = false;
        app.isAllScheduled = true;
      },
    });
  },

  /**
   * refresh page when
   * user closes modal and scheduling is not takign place.
   */
  refreshPage: function() {
    if (app.isScheduling === false && app.isAllScheduled === true) {
      location.reload(true);
    }
  },
};

app.schedule.init();
(function($) {
  'use strict';

  //Filter Box
  $('.filter .dropdown-menu').on({
    click: function(e) {
      //Stop modal from closing if clicked anywhere inside
      e.stopPropagation();
    },
  });

})(jQuery);

'use strict';

app.current = {
  /**
   * Initialise the methods for the Current page
   */
  init: function() {
    if ($('.current-page').length > 0) {
      this.articleTemplate = eLife.templates['current/article'];
      this.articleStatsTemplate = eLife.templates['current/article-stats-template'];
      this.loadingTemplate = eLife.templates['loading-template'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
      this.errorTemplate = eLife.templates['error-render'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
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
    $('#articles').empty().html(this.loadingTemplate());
    $.ajax({
      url: app.API + 'api/current',
      cache: false,
      dataType: 'json',
      success: function(articles) {
        app.current.articles = articles;
        $('#articles').empty().html(app.current.articleTemplate(app.current.sortArticles(articles)));
        $('#articleStats').html(app.current.articleStatsTemplate(app.current.sortArticles(articles)));
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
        console.error(app.errors.en.type.api + ': ' + app.API + 'api/current');
        console.log(data);
        var responseText = JSON.parse(data.responseText);
        var error = {
          type: app.errors.en.type.api,
        };
        $('#articles').empty().html(app.current.errorTemplate({response: data, responseText: responseText, error: error}));
        $('#error-console').empty().html(app.current.errorDetailTemplate({response: data, responseText: responseText, error: error}));
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

'use strict';
/**
 * Article Details page
 * @type {{init: app.detail.init, updatePageUrl: app.detail.updatePageUrl, bindEvents: app.detail.bindEvents, bindNavigationEvents: app.detail.bindNavigationEvents, getArticle: app.detail.getArticle, renderArticle: app.detail.renderArticle, setLatestArticle: app.detail.setLatestArticle, getCurrentArticle: app.detail.getCurrentArticle, getCurrentRun: app.detail.getCurrentRun, updateRun: app.detail.updateRun, setCurrentArticle: app.detail.setCurrentArticle, setCurrentRun: app.detail.setCurrentRun, setArticleParams: app.detail.setArticleParams, publish: app.detail.publish}}
 */
app.detail = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.detail-page').length > 0) {
      this.loadingTemplate = eLife.templates['loading-template'];
      this.errorTemplate = eLife.templates['error-render'];
      this.errorDetailTemplate = eLife.templates['error-detail'];
      this.buttonsScheduleTemplate = eLife.templates['detail/buttons-schedule'];
      this.buttonsReScheduleTemplate = eLife.templates['detail/buttons-reschedule'];
      this.buttonsPublishTemplate = eLife.templates['detail/buttons-publish'];
      this.articlesScheduledForTemplate = eLife.templates['detail/article-scheduled-for'];
      this.articleTemplate = eLife.templates['detail/article'];
      this.extraUrl = 'patterns/04-pages-01-detail/04-pages-01-detail.html?/';
      this.article = [];
      this.errors = [];
      this.currentEvents = [];
      this.currentArticle = [];
      this.scheduleStatus = [];
      this.articleScheduledStatusError = [];
      this.queryParams = {};
      Swag.registerHelpers(Handlebars);
      this.renderLoader();
      this.setArticleParams();
      this.getArticle();
      this.bindEvents();
    }
  },

  renderLoader: function() {
    $('#article').empty().html(this.loadingTemplate());
  },

  /**
   * Generate page url
   * if url is /articleid/version/run do nothing
   * if url is /articleid/version find latest run and update the url
   * if url is /articleid find latest version and then the latest run and update the url
   * @returns {string}
   */
  updatePageUrl: function() {
    this.setLatestArticle();

    var articleId;
    var versionNumber;
    var runId;
    var url;
    var state = History.getState();
    var hash = state.hash;
    if (app.config.ISPP) {
      hash = hash.replace(this.extraUrl, '');
    }

    url = hash;
    hash = hash.split('/');
    hash = _.compact(hash);
    articleId = (!_.isEmpty(hash[1])) ? hash[1] : null;
    versionNumber = (!_.isEmpty(hash[2])) ? hash[2] : null;
    runId = (!_.isEmpty(hash[3])) ? hash[3] : null;

    url = (url.slice(-1) === '/') ? url.slice(0, -1) : url;

    if (_.isNull(versionNumber) && _.isNull(runId)) {
      url += '/' + this.queryParams.versionNumber + '/' + this.queryParams.runId;
    }

    if (!_.isNull(versionNumber) && _.isNull(runId)) {
      url += '/' + this.queryParams.runId;
    }

    if (app.config.ISPP) {
      url = '/' + this.extraUrl.slice(0, -1) + url;
    }

    History.replaceState(null, null, url);
    // History.pushState(null, null, url);
  },
  /**
   * Bind events
   */
  bindEvents: function() {
    $('#article', '.detail-page').on('click', '.version-run-nav-list .run-container .run a', this.updateRun.bind(this));
    $('#article', '.detail-page').on('click', '.btn-publish', this.publish.bind(this));
    $('#article').on('click', '.run-container li a', this.bindNavigationEvents.bind(this));
    $(window).on('statechange', this.stateChange.bind(this));
  },

  /**
   * On back/forwards update the article
   * @param e
   */
  stateChange: function(e) {
    this.setArticleParams();
    this.getArticle();
  },

  /**
   * Bind navigation events
   */
  bindNavigationEvents: function(e) {
    e.preventDefault();
    var version = $(e.currentTarget).attr('data-version');
    var run = $(e.currentTarget).attr('data-run');
    var url = '/article/' + this.queryParams.articleId + '/' + version + '/' + run;

    if (app.config.ISPP) {
      url = '/' + this.extraUrl.slice(0, -1) + url;
    }

    // Create a new history item.
    history.pushState(null, null, url);
  },

  /**
   * Determine which action buttons to show for this page
   */
  getDetailActions: function() {
    if (!_.isNull(this.queryParams.articleId)) {
      var articleIds = [];
      articleIds.push(this.queryParams.articleId);
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/article_scheduled_status',
        data: JSON.stringify({articles: articleIds}),
        success: function(data) {
          if (data.articles.length === 1) {
            var scheduleStatus = data.articles[0];
            app.detail.scheduleStatus = scheduleStatus;
            app.detail.renderDetailActions();
          }
        },

        error: function(data) {
          console.error(app.errors.en.type.api + ': ' + app.API + 'api/current');
          console.log(data);
          var responseText = JSON.parse(data.responseText);
          var error = {
            type: app.errors.en.type.api,
          };
          $('#article').prepend(app.detail.errorTemplate({errorType: 'warning', message: app.errors.en.scheduleInformationUnavailable + ' ' + app.errors.en.refresh}));
          $('#error-console').empty().html(app.detail.errorDetailTemplate({response: data, responseText: responseText, error: error}));
        },

      });
    }
  },
  /**
   * Determine which action buttons to show for this page
   */
  renderDetailActions: function() {
    if (!_.isEmpty(this.scheduleStatus)) {
      if (this.scheduleStatus.scheduled > 0) {
        $('.article-detail-actions', '#article').empty().html(app.detail.buttonsReScheduleTemplate({article: app.detail.article}));
        $('.article-detail-scheduled', '#article').empty().html(app.detail.articlesScheduledForTemplate({scheduleStatus: this.scheduleStatus}));
      } else {
        var buttons = app.detail.buttonsScheduleTemplate({article: app.detail.article}) + app.detail.buttonsPublishTemplate({
              article: this.article,
              currentArticle: this.currentArticle,
              currentEvents: this.currentEvents,
              currentVersion: this.queryParams.versionNumber,
              currentRun: this.queryParams.runId,
              scheduleStatus: this.scheduleStatus,
            });
        $('.article-detail-actions', '#article').empty().html(buttons);
      }
    } else {
      var buttons = app.detail.buttonsPublishTemplate({
        article: this.article,
        currentArticle: this.currentArticle,
        currentEvents: this.currentEvents,
        currentVersion: this.queryParams.versionNumber,
        currentRun: this.queryParams.runId,
      });
      $('.article-detail-actions', '#article').empty().html(buttons);
    }
  },
  /**
   * Get article from param in url
   */
  getArticle: function() {
    if (!_.isNull(this.queryParams.articleId)) {
      $.ajax({
        url: app.API + 'api/article/' + this.queryParams.articleId,
        cache: false,
        dataType: 'json',
        success: function(article) {
          app.detail.article = article;
          app.detail.setLatestArticle();
          app.detail.currentArticle = app.detail.getCurrentArticle();
          app.detail.currentEvents = app.detail.getCurrentRun();
          app.detail.renderArticle();
          app.detail.getDetailActions();
        },

        error: function(data) {
          console.error(app.errors.en.type.api + ': ' + app.API + 'api/article/' + app.detail.queryParams.articleId);
          console.log(data);
          var responseText = JSON.parse(data.responseText);
          var error = {
            type: app.errors.en.type.api,
          };
          $('#article').empty().html(app.detail.errorTemplate({response: data, responseText: responseText, error: error}));
          $('#error-console').empty().html(app.detail.errorDetailTemplate({response: data, responseText: responseText, error: error}));
        },

      });
    } else {
      var error = {
        type: app.errors.en.type.application,
      };
      $('#article').empty().html(this.errorTemplate({
        response: {
          statusText: app.errors.en.missingInformation,
        }, message: app.errors.en.noArticleId, error: error
      }));
    }
  },
  /**
   * Render article to template
   */
  renderArticle: function() {
    if (this.article && _.isEmpty(this.errors)) {
      $('#article').empty().html(this.articleTemplate(
          {
            article: this.article,
            currentArticle: this.currentArticle,
            currentEvents: this.currentEvents,
            currentVersion: this.queryParams.versionNumber,
            currentRun: this.queryParams.runId,
            scheduleStatus: this.scheduleStatus,
          }));

      this.renderDetailActions();
    } else {
      $('#article').empty().html(this.errorTemplate(this.errors));
    }

    this.updatePageUrl();
  },

  /**
   * Set latest article
   */
  setLatestArticle: function() {
    if (!this.queryParams.versionNumber) {
      this.queryParams.versionNumber = app.utils.findLastKey(this.article.versions);
    }

    if (!this.queryParams.runId) {
      if (_.has(this.article.versions, this.queryParams.versionNumber)) {
        var lastKey = app.utils.findLastKey(this.article.versions[this.queryParams.versionNumber].runs);
        var runId = this.article.versions[this.queryParams.versionNumber].runs[lastKey]['run-id'];
        this.queryParams.runId = runId;
      } else {
        this.queryParams.runId = null;
      }
    }

  },
  /**
   * Find the current article from stored data
   * @returns {*}
   */
  getCurrentArticle: function() {
    if (_.has(this.article.versions, this.queryParams.versionNumber)) {
      return this.article.versions[this.queryParams.versionNumber].details;
    } else {
      this.errors = {
        response: {
          status: app.errors.en.type.application,
          statusText: app.errors.en.incorrectInformation,
        }, message: app.errors.en.noVersions + ' (' + this.queryParams.versionNumber + ')'
      };
      return false;
    }
  },

  /**
   * Find the current list of events from stored data
   * @returns {*}
   */
  getCurrentRun: function() {
    if (_.has(this.article.versions, this.queryParams.versionNumber)) {
      if (_.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId})) {
        return _.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId});
      } else {
        this.errors = {
          response: {
            status: app.errors.en.type.application,
            statusText: app.errors.en.incorrectInformation,
          }, message: app.errors.en.noRuns + ' (' + this.queryParams.runId + ')'
        };
        return false;
      }
    }
  },

  /**
   * Update page details when a new run is selected
   * @param e
   */
  updateRun: function(e) {
    this.queryParams.versionNumber = $(e.currentTarget).attr('data-version');
    this.queryParams.runId = $(e.currentTarget).attr('data-run');
    this.setCurrentArticle(this.article.versions[this.queryParams.versionNumber].details);
    if (_.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId})) {
      this.setCurrentRun(_.findWhere(this.article.versions[this.queryParams.versionNumber].runs, {'run-id': this.queryParams.runId}));
    }

    this.renderArticle();
  },

  /**
   *
   * @param details
   */
  setCurrentArticle: function(details) {
    this.currentArticle = details;
  },

  /**
   *
   * @param details
   */
  setCurrentRun: function(run) {
    this.currentEvents = run;
  },

  /**
   * Get information from the url for the article ID
   * expected format
   * article/articleId/version/run
   * if there is nothing specified - ie no run/version, load the last version and the last run
   */
  setArticleParams: function() {
    var articleId;
    var versionNumber;
    var runId;
    var url = window.location.pathname;
    if (app.config.ISPP) {
      // for use in the PP
      url = window.location.search;
      url = url.replace('?', '/');
    }

    url = url.split('/');
    url = _.compact(url);
    articleId = (!_.isEmpty(url[1])) ? url[1] : null;
    versionNumber = (!_.isEmpty(url[2])) ? url[2] : null;
    runId = (!_.isEmpty(url[3])) ? url[3] : null;

    /* If you have come through the PP nav we need to force some id's */
    if (app.config.ISPP && url[0] !== 'article') {
      articleId = '00353';
      versionNumber = '1';
      runId = 'c03211f7-6e1e-492d-9312-e0a80857873c';
    }

    this.queryParams = {
      articleId: articleId,
      versionNumber: versionNumber,
      runId: runId,
    };
  },

  /**
   * When 'Publish now' clicked
   * Launch publish modal and update the list of queued items.
   * @param e
   */
  publish: function(e) {
    app.publish.initModal(false);
    app.publish.populateQueue($(e.target), true);
    app.publish.displayQueueList();
  },
};

app.detail.init();

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
    console.info('start ' + moment.unix(start).format('dddd, MMMM Do YYYY, h:mm:ss a'));
    console.info('end ' + moment.unix(end).format('dddd, MMMM Do YYYY, h:mm:ss a'));
    return $.ajax({
      url: app.API + 'api/article_schedule_for_range/from/' + start + '/to/' + end + '/',
      cache: false,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        app.scheduled.scheduled = data;
      },

      error: function(data) {
        console.error('API Error: ' + app.API + 'api/article_schedule_for_range/from/' + start + '/to/' + end + '/');
        console.log(data);
        var responseText = JSON.parse(data.responseText);
        var error = {
          type: app.errors.en.type.api,
        };
        $('.schedule-page__content', app.scheduled.$el).empty().html(app.scheduled.errorTemplate({response: data, responseText: responseText, error: error}));
        $('#error-console').empty().html(app.scheduled.errorDetailTemplate({response: data, responseText: responseText, error: error}));
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
