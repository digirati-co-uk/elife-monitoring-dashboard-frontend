/*! eLife - v0.0.1 - 
* https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend
* Copyright (c) 2016 eLife; Licensed  */
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
    + "\"><i>Version:</i></a>\n                    </dt>\n                    <dd>\n                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n                    </dd>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Article type:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"article-type","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Publication date:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Corresponding authors:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
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
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                        <a href=\"/article/"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-type"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                        <br/>\n                        <a href=\"/article/"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <td class=\"column-3\">\n            <a href=\""
    + container.escapeExpression(((helper = (helper = helpers["preview-link"] || (depth0 != null ? depth0["preview-link"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"preview-link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"btn btn-default preview\">\n                <span class=\"glyphicon glyphicon-eye-open\"></span>\n                Preview\n            </a>\n            <button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\"\n                    type=\"button\">\n                <span class=\"glyphicon glyphicon-globe\"></span>\n                Publish Now\n            </button>\n            <div class=\"checkbox\">\n                <label>\n                    <input type=\"checkbox\" class=\"toggle-publish-all\"> Batch Publishing\n                </label>\n            </div>\n        </td>\n";
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
    + "\">\n    <td class=\"column-1\">\n        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden-xs\">\n            <span class=\"glyphicon glyphicon-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n        </a>\n        <h6>\n            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
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
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"is","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</tr>";
},"useData":true}));

Handlebars.registerPartial("article-publish-modal", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"btn btn-default pattern-helper\" data-toggle=\"modal\" data-target=\"#publish-modal\">\n    Modal\n</a>\n<div class=\"modal fade\" id=\"publish-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" aria-labelledby=\"publish-modal\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Publish article(s)</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you sure you want to publish the following article(s)?\n                <ol id=\"articles-queue\"></ol>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"publish-close\">Close</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"publish-cancel\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner publish-action\" id=\"publish-action\"></button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("article-detail", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-calendar\"></span>\n                Re-Schedule\n            </button>\n            <button class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-calendar\"></span>\n                Cancel Schedule\n            </button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <a href=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["preview-link"] : stack1), depth0))
    + "\" target=\"_blank\" class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-eye-open\"></span>\n                Preview\n            </a>\n            <button class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-globe\"></span>\n                Publish Now\n            </button>\n            <button class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-calendar\"></span>\n                Schedule\n            </button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data}));
},"7":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Article type:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1), depth0))
    + "</dd>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Publication date:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1), depth0))
    + "</dd>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Corresponding authors:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1), depth0))
    + "</dd>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <dt><i>Authors:</i></dt>\n                        <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.authors : stack1), depth0))
    + "</dd>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing, alias5="function";

  return "<section class=\"article-detail\">\n    <div class=\"actions \">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["scheduled-publication-date"] : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n    <table class=\"snapshot\">\n        <tr>\n            <td class=\"column-1\">\n                <span class=\"glyphicon glyphicon-file "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n                <h6>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "</h6>\n                <p>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.title : stack1), depth0))
    + "</p>\n            </td>\n            <td class=\"column-2\">\n                <dl>\n                    <dt><i>Version:</i></dt>\n                    <dd><strong>"
    + alias3(((helper = (helper = helpers.currentVersion || (depth0 != null ? depth0.currentVersion : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"currentVersion","hash":{},"data":data}) : helper)))
    + "</strong></dd>\n                    <dt><i>Run:</i></dt>\n                    <dd><strong>"
    + alias3(((helper = (helper = helpers.currentRun || (depth0 != null ? depth0.currentRun : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"currentRun","hash":{},"data":data}) : helper)))
    + "</strong></dd>\n                </dl>\n            </td>\n        </tr>\n    </table>\n    <table class=\"detail\">\n        <tr>\n            <td class=\"column-1\">\n                <dl>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.authors : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </dl>\n            </td>\n        </tr>\n    </table>\n</section>";
},"useData":true}));

Handlebars.registerPartial("article-version-history", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li>\n                <div class=\"column-1\">\n                    start (orange), end (green), error (red)\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"start",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"end",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"error",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    <span>"
    + alias4(((helper = (helper = helpers["event-type"] || (depth0 != null ? depth0["event-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-type","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div class=\"column-2\">\n                    <dl>\n                        <dt><i>Timestamp:</i></dt>\n                        <dd class=\"divide\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"MM/DD/YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</dd>\n                        <dd class=\"divide\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</dd>\n                    </dl>\n                    <dl>\n                        <dt><i>Message:</i></dt>\n                        <dd>"
    + alias4(((helper = (helper = helpers["event-message"] || (depth0 != null ? depth0["event-message"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-message","hash":{},"data":data}) : helper)))
    + "</dd>\n                    </dl>\n                </div>\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <!--<span class=\"glyphicon glyphicon-ok "
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + " glyphicon-ok--mod pull-left\"></span>-->\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <!--<span class=\"glyphicon glyphicon-warning "
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + " glyphicon-warning-sign--mod pull-left\"></span>-->\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"article-version-history\">\n    <ol class=\"article-version-history-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1.events : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"useData":true}));

Handlebars.registerPartial("article-version-list", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "            <li>\n                <span class=\"version-container\">\n                    <span class=\"version\">Version "
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "</span>\n                    <span class=\"status\"><span\n                            class=\"glyphicon reset-article-status-type "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.details : stack1)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + " \"></span></span>\n                </span>\n                <ol class=\"run-container\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = blockParams[0][0]) != null ? stack1.runs : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </ol>\n\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1.details : stack1)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data,"blockParams":blockParams}));
},"4":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <li data-run=\""
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "\" data-version=\""
    + alias4(((helper = (helper = helpers["version-number"] || (depth0 != null ? depth0["version-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version-number","hash":{},"data":data}) : helper)))
    + "\" class=\"run "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["version-number"] : depth0),(depths[2] != null ? depths[2].currentVersion : depths[2]),{"name":"is","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                            <a href=\"#\">\n                                "
    + alias4(((helper = (helper = helpers.currentArticle || (depth0 != null ? depth0.currentArticle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentArticle","hash":{},"data":data}) : helper)))
    + "\n                                <span class=\"title\">Run "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</span>\n                                <span class=\"date\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["first-event-timestamp"] : depth0),"MM/DD/YYYY HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</span>\n                                <span class=\"icon\"><span class=\"glyphicon glyphicon-chevron-right\"></span></span>\n                            </a>\n                        </li>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["run-number"] : depth0),(depths[2] != null ? depths[2].currentRun : depths[2]),{"name":"is","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<section class=\"article-version-map\">\n    <ol class=\"article-version-map-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.versions : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"useData":true,"useDepths":true,"useBlockParams":true}));

this["eLife"]["templates"]["current/article-publish-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"glyphicon e-icon sm danger glyphicon-remove\"></span>\n        <br />\n        <span class=\"text-muted\">"
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

  return "        <span class=\"glyphicon e-icon sm success glyphicon-ok\"></span>\n        <br />\n        <span class=\"text-muted\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<span class=\"article-status\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"error",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"queued",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"ready to publish",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"published",{"name":"is","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n\n";
},"useData":true});

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

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#error-list\">\n                        <span class=\"glyphicon e-icon lg danger glyphicon-warning-sign\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#error-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles with Errors</span>\n                        </a>\n                    </div>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#in-progress-list\">\n                        <span class=\"glyphicon e-icon lg info glyphicon-cog\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#in-progress-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles are in Progress</span>\n                        </a>\n                    </div>\n                </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#uir-list\">\n                        <span class=\"glyphicon e-icon lg muted glyphicon-hand-down \"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#uir-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles require User Input<br>(Ready to Publish)</span>\n                        </a>\n                    </div>\n                </div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#scheduled-list\">\n                        <span class=\"glyphicon e-icon lg warning glyphicon-time\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#scheduled-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles are Scheduled</span>\n                        </a>\n                    </div>\n                </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div class=\"section-map\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</div>\n\n\n";
},"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["current/article"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(alias1,blockParams[0][1],"uir",{"name":"is","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = blockParams[0][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["article-publish-modal"],depth0,{"name":"article-publish-modal","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "        <section class=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "-list\" id=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "-list\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "            <table class=\"article-snapshot-list\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"error",{"name":"is","hash":{},"fn":container.program(7, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"inProgress",{"name":"is","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(14, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                <tbody>\n"
    + ((stack1 = helpers.each.call(alias3,blockParams[1][0],{"name":"each","hash":{},"fn":container.program(16, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </section>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                <button href=\"#\" class=\"btn btn-default publish-all btn-publish-queued\" data-toggle=\"modal\"\n                        data-target=\"#publish-modal\" type=\"button\">\n                    <span class=\"glyphicon glyphicon-globe\"></span>\n                    Publish All Selected\n                </button>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg danger glyphicon-warning-sign\"></span>\n                        <h4>Errors\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                                <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[3][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg info glyphicon-cog\"></span>\n                        <h4>In Progress\n                            <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n                        </h4>\n                    </caption>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg muted glyphicon-hand-down \"></span>\n                        <h4>\n                            User Input Required\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                            <br>(Ready to Publish)\n                        </h4>\n                    </caption>\n";
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg warning glyphicon-time\"></span>\n                        <h4>Scheduled\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"16":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["article-item"],depth0,{"name":"article-item","hash":{"section":blockParams[2][1]},"data":data,"blockParams":blockParams,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["current/error-check-article-status"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-danger\">\n    An error has occurred while checking the status of the article(s) requested. Please cancel and try again.\n</div>";
},"useData":true});

this["eLife"]["templates"]["current/error-queue-articles"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-danger\">\n    An error has occurred while queueing the article(s) requested. Please cancel and try again.\n</div>";
},"useData":true});

this["eLife"]["templates"]["detail/article"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col-md-3\">\n"
    + ((stack1 = container.invokePartial(partials["article-version-list"],depth0,{"name":"article-version-list","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n<div class=\"col-md-9\">\n"
    + ((stack1 = container.invokePartial(partials["article-detail"],depth0,{"name":"article-detail","hash":{"section":(depth0 != null ? depth0.articleDetail : depth0)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-version-history"],depth0,{"name":"article-version-history","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["error-render"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section>\n    <p class=\"lead\"><strong>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.statusText || (depth0 != null ? depth0.statusText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusText","hash":{},"data":data}) : helper)))
    + "</strong></p>\n    <p>Sorry an error occurred while retrieving the requested information.</p>\n    <br />\n    <p>"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n    <br />\n</section>";
},"useData":true});

this["eLife"]["templates"]["loading-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"text-center\"><div class=\"throbber-loader throbber-loader--small \"></div></div>";
},"useData":true});
Handlebars.registerHelper('elFormatUnixDate', function(date, format) {
  return moment.unix(date).format(format);
});
(function($) {
  'use strict';

  //Datepicker - https://eonasdan.github.io/bootstrap-datetimepicker/#linked-pickers
  $('#datetimepicker-start').datetimepicker({
    format: 'DD-MM-YY',
  });
  $('#datetimepicker-end').datetimepicker({
    format: 'DD-MM-YY',
    useCurrent: false, //Important! See issue #1075
  });
  $('#datetimepicker-start').on('dp.change', function(e) {
    $('#datetimepicker-end').data('DateTimePicker').minDate(e.date);
  });

  $('#datetimepicker-end').on('dp.change', function(e) {
    $('#datetimepicker-start').data('DateTimePicker').maxDate(e.date);
  });

})(jQuery);

'use strict';

var config = {
  API: '/',
  ISPP: false,
};


'use strict';

var app = {
  ESCAPE_KEY: 27,
  API: config.API,
  config: config,
};


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
   * Parse query string.
   * https://gist.github.com/ryoppy/5780748
   * ?a=b&c=d to {a: b, c: d}
   * @param {String} (option) queryString
   * @return {Object} query params
   */
  getQueryParams: function(queryString) {
    var query = (queryString || window.location.search).substring(1); // delete ?
    if (!query) {
      return false;
    }

    return _
        .chain(query.split('&'))
        .map(function(params) {
          var p = params.split('=');
          return [p[0], decodeURIComponent(p[1])];
        })
        .object()
        .value();
  },
};
'use strict';

app.current = {
  /**
   * Initialise the methods for the Current page
   */
  init: function() {
    if ($('.current-page').length > 0) {
      this.checkingStatus = '';
      this.queuePolled = 0;
      this.articles = [];
      this.queued = [];
      this.isPublishing = false;
      this.isAllPublished = false;
      this.checkStatusInterval = 8000;
      this.publishTimeout = 5000;
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

    $('#articles', '.current-page').on('click', '#publish-action', this.performPublish.bind(this));

    $('#articles', '.current-page').on('keyup', '#publish-modal', this.refreshPage.bind(this));
    $('#articles', '.current-page').on('click', '#publish-modal .close', this.refreshPage.bind(this));
    $('#articles', '.current-page').on('click', '#publish-modal #publish-cancel', this.refreshPage.bind(this));
    $('#articles', '.current-page').on('click', '#publish-modal #publish-close', this.refreshPage.bind(this));

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
      },

      error: function(data) {
        this.errorTemplate = eLife.templates['error-render'];
        $('#articles').empty().html(this.errorTemplate(data));
      },

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

    this.populateQueue($(e.target));
  },

  /**
   * When 'Publish all selected' active & clicked
   * Launch publish modal and update the list of queued items.
   *
   */
  publishQueued: function() {
    var isMultiple = (_.size(this.queued) > 1) ? true : false;
    this.initModal(isMultiple);
    this.displayQueueList();
  },
  /**
   * When 'Publish now' clicked
   * Launch publish modal and update the list of queued items.
   * @param e
   */
  publish: function(e) {
    this.initModal(false);
    this.populateQueue($(e.target), true);
    this.displayQueueList();
  },
  /**
   * Show modal popup that contains publish status information
   * @param isMultiple
   */
  initModal: function(isMultiple) {
    var btnText = (isMultiple) ? 'Publish All' : 'Publish';
    $('#articles-queue', '#publish-modal').empty();
    $('#publish-action', '#publish-modal').empty().text(btnText);
    $('#publish-close').hide();
  },
  /**
   * Amend queued items.
   * @param target
   * @param publishNow
   */
  populateQueue: function(target, publishNow) {
    var targetParent = target.parents('tr');
    var articleId = targetParent.attr('data-article-id');
    var articleVer = targetParent.attr('data-article-version');
    var articleRun = targetParent.attr('data-article-run');
    var addToQueue = {id: articleId, version: articleVer, run: articleRun};
    if (publishNow) {
      this.queued = [];
      this.queued = app.utils.addObject(this.queued, addToQueue);
    } else {
      if (_.findWhere(this.queued, addToQueue)) {
        this.queued = app.utils.removeObject(this.queued, addToQueue);
      } else {
        this.queued = app.utils.addObject(this.queued, addToQueue);
      }
    }
  },
  /**
   * Update the queue list to the items in the queue
   * @param article
   */
  displayQueueList: function(article) {
    _.each(this.queued, function(article) {
      var title = $('[data-article-id=' + article.id + ']').attr('data-article-title');
      var listItem = $('<li>' + title + '</li>');
      listItem.data({id: article.id, version: article.version, run: article.run});
      $('#articles-queue').append(listItem);
    });
  },
  /**
   * Update the queue list status and update global status's
   * @param queuedArticles
   */
  updateQueueListStatus: function(queuedArticles) {
    this.queuePolled++;
    this.queued = queuedArticles;
    var total = 0;
    var status = {completed: 0, error: 0};
    var articleQueue = $('#articles-queue li');
    var articlePublishStatusTemplate = eLife.templates['current/article-publish-modal-status'];
    var queuedItems = this.queued;

    _.each(articleQueue, function(articleQueue, i) {
      var articleId = $(articleQueue).data('id');
      var articleVer = $(articleQueue).data('version');
      var articleRun = $(articleQueue).data('run');
      var displayInQueue = {id: articleId, version: articleVer, run: articleRun};
      var queuedItem = _.find(queuedItems, displayInQueue);
      switch (queuedItem.status) {
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

    if (this.queuePolled === 250 || _.contains(status, queuedItems.length) || status === queuedItems.length) {
      this.isPublishing = false;
      this.isAllPublished = true;
      clearInterval(this.checkingStatus);
      $('#publish-close').show();
    }

  },

  /**
   * refresh page on certain circumstances
   * @param e
   */
  refreshPage: function(e) {
    if (this.isPublishing === true || this.isAllPublished === true || e.which === app.ESCAPE_KEY) {
      location.reload(true);
    }

    this.resetModalButtons();
  },

  /**
   * Reset the modal buttons and publish checkboxes
   */
  resetModalButtons: function() {
    $('#publish-modal #publish-action').prop('disabled', false).removeClass('disabled');
    $('#articles-queue').empty();
    $('.btn-publish-queued').hide();
    $('.toggle-publish-all').each(function(i, e) {
      $(e).prop('checked', false);
    });

    this.queued = [];
  },

  /**
   * queue articles to the publishing service
   * @param e
   */
  performPublish: function(e) {
    $('#publish-cancel').hide();
    $('#publish-action').prop('disabled', true).addClass('disabled');
    this.isPublishing = true;
    this.queueArticles(this.queued);

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
        app.current.updateQueueListStatus(data.articles);
        setTimeout(app.current.checkArticleStatus(app.current.queued), app.current.publishTimeout);
      },

      error: function(data) {
        this.queueArticleStatusErrorTemplate = eLife.templates['current/error-queue-articles'];
        $('#publish-modal .modal-body').html(this.queueArticleStatusErrorTemplate(articles));
        $('#publish-cancel').show();
      },
    });
  },

  /**
   * Poll service to find out what is happening
   * @param queued
   */
  checkArticleStatus: function(queued) {
    app.current.updateQueueListStatus(queued);
    this.checkingStatus = setInterval(function() {
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: app.API + 'api/article_publication_status',
        data: JSON.stringify({articles: queued}),
        success: function(data) {
          app.current.updateQueueListStatus(data.articles);
        },

        error: function(data) {
          this.checkArticleStatusErrorTemplate = eLife.templates['current/error-check-article-status'];
          $('#publish-modal .modal-body').html(this.checkArticleStatusErrorTemplate(articles));
          $('#publish-cancel').show();
          this.isPublishing = false;
          clearInterval(app.current.checkingStatus);
        },
      });
    }, this.checkStatusInterval);
  },

};

app.current.init();

'use strict';

app.detail = {
  /**
   * Initialise the methods for the Detail page
   */
  init: function() {
    if ($('.detail-page').length > 0) {
      this.article = [];
      this.currentEvents = [];
      this.currentArticle = [];
      this.version = '';
      this.run = '';
      var queryParams = this.getArticleParams();
      Swag.registerHelpers(Handlebars);
      this.getArticle(queryParams);
      this.bindEvents();
    }
  },

  /**
   * Bind events
   */
  bindEvents: function() {
    $('#article', '.detail-page').on('click', '.article-version-map-list .run-container .run a', this.updateRun.bind(this));
  },

  /**
   * Get article from param in url
   * @param queryParams
   */
  getArticle: function(queryParams) {
    var url;
    var message;
    if (!_.isUndefined(queryParams.articleId)) {
      url = queryParams.articleId;
      //url = (!_.isUndefined(queryParams.versionNumber)) ? url + '/' + queryParams.versionNumber : url;
      //url = (!_.isUndefined(queryParams.runNumber)) ? url + '/' + queryParams.runNumber : url;
      $.ajax({
        url: app.API + 'api/article/' + url,
        cache: false,
        dataType: 'json',
        success: function(article) {
          app.detail.article = article;
          app.detail.currentArticle = app.detail.getCurrentArticle();
          app.detail.currentEvents = app.detail.getCurrentEvents();
          app.detail.renderArticle();
        },

        error: function(data) {
          this.errorTemplate = eLife.templates['error-render'];
          $('#article').empty().html(this.errorTemplate(data));
        },

      });
    } else {
      this.errorTemplate = eLife.templates['error-render'];
      message = 'No ArticleId was supplied. <br /><br />';
      $('#article').empty().html(this.errorTemplate({message: message}));
    }
  },
  /**
   * Render article to template
   */
  renderArticle: function() {
    if (this.article) {
      this.articleTemplate = eLife.templates['detail/article'];
      $('#article').empty().html(this.articleTemplate(
          {
            article: this.article,
            currentArticle: this.currentArticle,
            currentEvents: this.currentEvents,
            currentVersion: this.version,
            currentRun: this.run,
          }));
    }
  },

  /**
   * Find the current article from stored data
   * @returns {*}
   */
  getCurrentArticle: function() {
    if (!this.version && !this.run) {
      this.version = app.utils.getNthObjectKey(this.article.versions, 0);
      this.run = app.utils.getNthObjectKey(this.article.versions[this.version].runs, 0);
    }

    return this.article.versions[this.version].details;
  },

  /**
   * Find the current list of events from stored data
   * @returns {*}
   */
  getCurrentEvents: function() {
    if (!this.version && !this.run) {
      this.version = app.utils.getNthObjectKey(this.article.versions, 0);
      this.run = app.utils.getNthObjectKey(this.article.versions[this.version].runs, 0);
    }

    return this.article.versions[this.version].runs[this.run];
  },

  /**
   * Update page details when a new run is selected
   * @param e
   */
  updateRun: function(e) {
    this.run = $(e.target).parents('[data-run]:first').attr('data-run');
    this.version = $(e.target).parents('[data-version]:first').attr('data-version');
    this.currentArticle = this.article.versions[this.version].details;
    this.currentEvents = this.article.versions[this.version].runs[this.run];
    this.renderArticle();
  },

  /**
   * Get information from the url for the article ID
   * expected format
   * article/articleId/version/run
   */
  getArticleParams: function() {
    var queryParams = {};
    var articleId;
    var versionNumber;
    var runNumber;
    var url;
    if (app.config.ISPP) {
      articleId = '00387';
      versionNumber = '1';
      runNumber = '1';
    } else {
      url = window.location.pathname.split('/');
      url = _.compact(url);
      articleId = url[1];
      versionNumber = url[2];
      runNumber = url[3];
    }

    queryParams = {
      articleId: articleId,
      versionNumber: versionNumber,
      runNumber: runNumber,
    };

    return queryParams;
  },
};

app.detail.init();

'use strict';

app.archive = {
  init: function() {
    if ($('.archive-page').length > 0) {

    }
  },

  bindEvents: function() {

  },

};

