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
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
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
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"uppercase","hash":{},"data":data}))
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
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden-xs\">\n            <span class=\"glyphicon glyphicon-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n        </a>\n        <h6>\n            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
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

Handlebars.registerPartial("article-detail", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <button class=\"btn btn-default schedule\" id=\"schedule-amend\" data-toggle=\"modal\" data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n                <span class=\"glyphicon glyphicon-calendar\"></span>\n                Re-Schedule\n            </button>\n            <button class=\"btn btn-default schedule\" id=\"schedule-cancel\" data-toggle=\"modal\" data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n                <span class=\"glyphicon glyphicon-calendar\"></span>\n                Cancel Schedule\n            </button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <a href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["preview-link"] : stack1), depth0))
    + "\" target=\"_blank\" class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-eye-open\"></span>\n                Preview\n            </a>\n            <button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\" type=\"button\"\n                    data-article-title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "\"\n                    data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n                    data-article-version=\""
    + alias2(((helper = (helper = helpers.currentVersion || (depth0 != null ? depth0.currentVersion : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentVersion","hash":{},"data":data}) : helper)))
    + "\"\n                    data-article-run=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1["run-id"] : stack1), depth0))
    + "\">\n                <span class=\"glyphicon glyphicon-globe\"></span>\n                Publish Now\n            </button>\n            <button class=\"btn btn-default schedule\" id=\"schedule\" data-toggle=\"modal\" data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n                <span class=\"glyphicon glyphicon-calendar\"></span>\n                Schedule\n            </button>\n";
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

  return ((stack1 = container.invokePartial(partials["article-publish-modal"],depth0,{"name":"article-publish-modal","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-schedule-modal"],depth0,{"name":"article-schedule-modal","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<section class=\"article-detail\">\n    <div class=\"actions\">\n"
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
    + "</span>\n                </div>\n                <div class=\"column-2\">\n                    <dl>\n                        <dt><i>Timestamp:</i></dt>\n                        <dd class=\"divide\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"MM/DD/YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</dd>\n                        <dd class=\"divide\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</dd>\n                    </dl>\n                    <dl>\n                        <dt><i>Message:</i></dt>\n                        <dd>"
    + alias4(((helper = (helper = helpers["event-message"] || (depth0 != null ? depth0["event-message"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-message","hash":{},"data":data}) : helper)))
    + "</dd>\n                    </dl>\n                </div>\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"glyphicon e-icon lg warning glyphicon-exclamation-sign  pull-left\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"glyphicon e-icon lg success glyphicon-ok  pull-left\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"glyphicon e-icon lg danger glyphicon-remove  pull-left\" title=\""
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
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "\" data-version=\""
    + alias4(alias3(((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1), depth0))
    + "\" data-run=\""
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "\">\n                                <span class=\"title\">Run "
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "</span>\n                                <span class=\"date\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["first-event-timestamp"] : depth0),"MM/DD/YYYY HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</span>\n                                <span class=\"icon\"><span class=\"glyphicon glyphicon-chevron-right\"></span></span>\n                            </a>\n                        </li>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["run-number"] : depth0),(depths[2] != null ? depths[2].currentRun : depths[2]),{"name":"is","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<section class=\"article-version-map\">\n    <ol class=\"article-version-map-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.versions : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"useData":true,"useDepths":true,"useBlockParams":true}));

Handlebars.registerPartial("article-publish-modal", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"btn btn-default pattern-helper\" data-toggle=\"modal\" data-target=\"#publish-modal\">\n    Modal\n</a>\n<div class=\"modal fade\" id=\"publish-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" aria-labelledby=\"publish-modal\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Publish article(s)</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you sure you want to publish the following article(s)?\n                <ol id=\"articles-queue\"></ol>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"publish-close\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner publish-action\" id=\"publish-action\"></button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("article-schedule-modal", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"btn btn-default pattern-helper\">\n    Modal\n</a>\n<div class=\"modal fade\" id=\"schedule-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\"\n     aria-labelledby=\"schedule-modal\">\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                        aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Schedule article</h4>\n            </div>\n            <div class=\"modal-body\"></div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"schedule-close\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner hidden\" id=\"schedule-action\">Schedule</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner hidden\" id=\"schedule-cancel\">Cancel</button>\n            </div>\n        </div>\n    </div>\n</div>";
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

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#error-list\">\n                        <span class=\"glyphicon e-icon lg danger glyphicon-warning-sign\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#error-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles with Errors</span>\n                        </a>\n                    </div>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#in-progress-list\">\n                        <span class=\"glyphicon e-icon lg info glyphicon-cog\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#inProgress-list\">\n                            <span class=\"val\">"
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

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg danger glyphicon-warning-sign  pull-left\"></span>\n                        <h4>Errors\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                                <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[3][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg info glyphicon-cog  pull-left\"></span>\n                        <h4>In Progress\n                            <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n                        </h4>\n                    </caption>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg muted glyphicon-hand-down  pull-left\"></span>\n                        <h4>\n                            User Input Required\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                            <br>(Ready to Publish)\n                        </h4>\n                    </caption>\n";
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon e-icon lg warning glyphicon-time  pull-left\"></span>\n                        <h4>Scheduled\n"
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

this["eLife"]["templates"]["publish/article-publish-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
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
    return "<p>When do you want to schedule this article?</p>\n<br/>\n<div class=\"form-group\">\n    <div class=\"col-sm-6\">\n        <input id=\"\" name=\"\" class=\"form-control datepicker\" type=\"text\" placeholder=\"Date\">\n    </div>\n    <div class=\"col-sm-6\">\n        <input id=\"\" name=\"\" class=\"form-control timepicker\" type=\"text\" placeholder=\"Time\">\n    </div>\n</div>\n<br/>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-warning\">\n    <p>Are you sure you want to cancel the publication of this article?</p>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"cancel",{"name":"is","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
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
    return "            <p>Success your article has been scheduled.</p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"alert alert-danger\">\n        <p>An error has occured, please try again.</p>\n        "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.success : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});