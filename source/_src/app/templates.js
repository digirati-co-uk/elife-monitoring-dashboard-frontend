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

  return "            <p>\n                <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n            </p>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <dt>\n                        <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Version:</i></a>\n                    </dt>\n                    <dd>\n                        <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n                    </dd>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Article type:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"article-type","hash":{},"data":data}) : helper)))
    + "</a>\n                </dd>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Publication date:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["publication-date"] : depth0),"Do MMMM YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</a>\n                </dd>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <dt>\n                    <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i>Corresponding authors:</i></a>\n                </dt>\n                <dd>\n                    <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
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

  return "                        <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-type"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                        <br/>\n                        <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "        <td class=\"column-3\">\n            <button class=\"btn btn-default preview\">\n                <span class=\"glyphicon glyphicon-eye-open\"></span>\n                Preview\n            </button>\n            <button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\"\n                    type=\"button\">\n                <span class=\"glyphicon glyphicon-globe\"></span>\n                Publish Now\n            </button>\n            <div class=\"checkbox\">\n                <label>\n                    <input type=\"checkbox\" class=\"toggle-publish-all\"> Batch Publishing\n                </label>\n            </div>\n        </td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr data-article-title=\""
    + alias4(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-version=\""
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-run=\""
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">\n    <td class=\"column-1\">\n        <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden-xs\">\n            <span class=\"glyphicon glyphicon-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n        </a>\n        <h6>\n            <a href=\"/patterns/04-pages-01-detail/04-pages-01-detail.html?articleId="
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
    var stack1;

  return container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
    return "no-article-status-type";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <dt><i>Article type:</i></dt>\n                    <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1), depth0))
    + "</dd>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <dt><i>Publication date:</i></dt>\n                    <dd>"
    + container.escapeExpression((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1),"Do MMMM YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</dd>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <dt><i>Corresponding authors:</i></dt>\n                    <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1), depth0))
    + "</dd>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing, alias5="function";

  return "<section class=\"article-detail\">\n    <table class=\"snapshot\">\n        <tr>\n            <td class=\"column-1\">\n                <span class=\"glyphicon glyphicon-file "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n                <h6>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "</h6>\n                <p>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.title : stack1), depth0))
    + "</p>\n            </td>\n            <td class=\"column-2\">\n                <dl>\n                    <dt><i>Version:</i></dt>\n                    <dd><strong>"
    + alias3(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</strong></dd>\n                    <dt><i>Run:</i></dt>\n                    <dd><strong>"
    + alias3(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "</strong></dd>\n                </dl>\n            </td>\n            <td class=\"column-3\">\n                <button class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-eye-open\"></span>\n                    Preview\n                </button>\n                <button class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-globe\"></span>\n                    Publish Now\n                </button>\n                <button class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-calendar\"></span>\n                    Schedule\n                </button>\n                <button class=\"btn btn-default hide\">\n                    <span class=\"glyphicon glyphicon-calendar\"></span>\n                    Re-Schedule\n                </button>\n                <button class=\"btn btn-default hide\">\n                    <span class=\"glyphicon glyphicon-calendar\"></span>\n                    Cancel Schedule\n                </button>\n            </td>\n        </tr>\n    </table>\n    <table class=\"detail\">\n        <tr>\n            <td class=\"column-1\">\n                <dl>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <!--<dt><i>Authors:</i></dt>-->\n                    <!--<dd>Bárány, Jules Bordet, Schack August Steenberg Krogh, Archibald Vivian Hill, Otto Fritz Meyerhof, Sir Frederick, Grant Banting, John James Rickard Macleod</dd>-->\n                </dl>\n            </td>\n        </tr>\n    </table>\n</section>";
},"useData":true}));

this["eLife"]["templates"]["current/article-publish-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"glyphicon glyphicon-remove glyphicon-remove--stat\"></span>\n        <br />\n        <span class=\"text-muted\">"
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

  return "        <span class=\"glyphicon glyphicon-ok glyphicon-ok--stat\"></span>\n        <br />\n        <span class=\"text-muted\">"
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
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"in-progress",{"name":"is","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(7, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(9, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#error-list\">\n                        <span class=\"glyphicon glyphicon-warning-sign glyphicon-warning-sign--mod\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#error-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles with Errors</span>\n                        </a>\n                    </div>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#in-progress-list\">\n                        <span class=\"glyphicon glyphicon-cog glyphicon-cog--mod\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#in-progress-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles are in Progress</span>\n                        </a>\n                    </div>\n                </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#uir-list\">\n                        <span class=\"glyphicon glyphicon-hand-down glyphicon-hand-down--mod\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#uir-list\">\n                            <span class=\"val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                            <span class=\"desc\">Articles require User Input<br>(Ready to Publish)</span>\n                        </a>\n                    </div>\n                </div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                <div class=\"col-sm-3\">\n                    <a href=\"#scheduled-list\">\n                        <span class=\"glyphicon glyphicon-time glyphicon-time--mod\"></span>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"#scheduled-list\">\n                            <span class=\"val\">"
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
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"in-progress",{"name":"is","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias4).call(alias3,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(14, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                <tbody>\n"
    + ((stack1 = helpers.each.call(alias3,blockParams[1][0],{"name":"each","hash":{},"fn":container.program(16, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </section>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                <button href=\"#\" class=\"btn btn-default publish-all btn-publish-queued\" data-toggle=\"modal\"\n                        data-target=\"#publish-modal\" type=\"button\">\n                    <span class=\"glyphicon glyphicon-globe\"></span>\n                    Publish All Selected\n                </button>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon glyphicon-warning-sign glyphicon-warning-sign--mod pull-left\"></span>\n                        <h4>Errors\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                                <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[3][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon glyphicon-cog glyphicon-cog--mod pull-left\"></span>\n                        <h4>In Progress\n                            <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n                        </h4>\n                    </caption>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon glyphicon-hand-down glyphicon-hand-down--mod pull-left\"></span>\n                        <h4>\n                            User Input Required\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                            <br>(Ready to Publish)\n                        </h4>\n                    </caption>\n";
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                    <caption>\n                        <span class=\"glyphicon glyphicon-time glyphicon-time--mod pull-left\"></span>\n                        <h4>Scheduled\n"
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

this["eLife"]["templates"]["detail/article"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "            <li>\n                <span class=\"version\">Version "
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</span>\n                <ol class=\"run\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = blockParams[0][0]) != null ? stack1.runs : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </ol>\n\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <li data-run=\""
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "\"  data-version=\""
    + alias4(((helper = (helper = helpers["version-number"] || (depth0 != null ? depth0["version-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version-number","hash":{},"data":data}) : helper)))
    + "\">\n                            <a href=\"#\">\n                                <span>Run "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</span>\n                                <span>"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["publication-date"] : depth0),"Do MMMM YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</span>\n                                <span>14:00</span>\n                            </a>\n                        </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li>\n                <div class=\"column-1\">\n                    <span class=\"glyphicon glyphicon-ok "
    + alias4(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-status","hash":{},"data":data}) : helper)))
    + " glyphicon-ok--mod pull-left\"></span>\n                    <span>"
    + alias4(((helper = (helper = helpers["event-type"] || (depth0 != null ? depth0["event-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-type","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div class=\"column-2\">\n                    <dl>\n                        <dt><i>Timestamp:</i></dt>\n                        <dd class=\"divide\">"
    + alias4(((helper = (helper = helpers["event-timestamp"] || (depth0 != null ? depth0["event-timestamp"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-timestamp","hash":{},"data":data}) : helper)))
    + "28/04/2015</dd>\n                        <dd class=\"divide\">12:34</dd>\n                    </dl>\n                    <dl>\n                        <dt><i>Message:</i></dt>\n                        <dd>"
    + alias4(((helper = (helper = helpers["event-message"] || (depth0 != null ? depth0["event-message"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-message","hash":{},"data":data}) : helper)))
    + "</dd>\n                    </dl>\n                </div>\n            </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\n"
    + ((stack1 = container.invokePartial(partials["article-detail"],depth0,{"name":"article-detail","hash":{"section":(depth0 != null ? depth0.articleDetail : depth0)},"data":data,"blockParams":blockParams,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<section class=\"article-version-map col-sm-4 col-md-3\">\n    <ol class=\"article-version-map-list\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.versions : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ol>\n</section>\n<section class=\"article-version-history col-sm-8 col-md-8 col-md-offset-1\">\n    <ol class=\"article-version-history-list\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.events : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"usePartial":true,"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["error-render"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section>\n    <p class=\"lead\"><strong>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.statusText || (depth0 != null ? depth0.statusText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusText","hash":{},"data":data}) : helper)))
    + "</strong></p>\n    <p>Sorry an error occurred while retrieving the requested information.</p>\n    <br />\n</section>";
},"useData":true});

this["eLife"]["templates"]["loading-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"text-center\"><div class=\"throbber-loader throbber-loader--small \"></div></div>";
},"useData":true});