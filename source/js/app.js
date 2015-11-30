/*! eLife - v0.0.1 - 2015-11-30
* https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend
* Copyright (c) 2015 eLife; Licensed  */
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

(function ($) {
    Swag.registerHelpers(Handlebars);
})(jQuery);
(function($) {
  'use strict';

  var ESCAPE_KEY = 27;



  var utils = {
    queueArticles: function(queued) {
      console.log(queued);
    }
  };


  var App = {
    init: function() {
      this.queued = [];
      this.isPublishing = false;
      this.bindEvents();
      this.renderArticles();
    },

    bindEvents: function() {
      console.log('bindEvents');

      // @TODO This needs to look for ..toggle-add-to-queue checkboxes but its not working atm
      $('#articles').on('change', 'input:checkbox', this.toggleAddToQueueBtn.bind(this));

      $('#articles').on('click', '.btn-publish-queued', this.publishQueued.bind(this));
      $('#articles').on('click', '.btn-publish', this.publish.bind(this));

      $('#articles').on('click', '#publish-action', this.performPublish.bind(this));

      $('#articles').on('keyup', '#publish-modal', this.refreshPage.bind(this));
      $('#articles').on('click', '#publish-modal .close', this.refreshPage.bind(this));
    },

    renderArticles: function() {
      console.log('renderArticles');
      $.ajax({
        url: "http://localhost:8000/articles.json",
        cache: false,
        dataType: "json",
        success: function(articles){
          this.articleTemplate = eLife.templates['article-template'];
          $('#articles').html(this.articleTemplate(articles));
        },
        error: function(data){
          console.log(data);
          this.errorTemplate = eLife.templates['error-template'];
          $('#articles').html(this.errorTemplate(data));
        }
      });

    },

    toggleAddToQueueBtn: function(e) {
      console.log('toggleAddToQueueBtn');
      $('.btn-publish-queued').show(); //@TODO not working
      this.populateQueue($(e.target));
    },

    publishQueued: function() {
      console.log('publishQueued');
      var isMultiple = (_.size(this.queued) > 1) ? true : false;
      this.initModal(isMultiple);
      this.displayQueue();
    },

    publish: function(e) {
      console.log('publish');
      this.initModal(false);
      this.populateQueue($(e.target));
      this.displayQueue();
    },

    initModal: function(isMultiple) {
      console.log('initPublishModal');
      var btnText = (isMultiple) ? 'Publish All' : 'Publish';
      $('#articles-queue', '#publish-modal').empty();
      $('#publish-action', '#publish-modal').empty().text(btnText);
    },

    populateQueue: function(target) {
      console.log('populateQueue');
      var targetParent = target.parents('tr'); //@TODO remove the need for this
      var articleId = targetParent.attr('data-article-id');
      var articleVer = targetParent.attr('data-article-version');
      var articleRun = targetParent.attr('data-article-run');
      var addToQueue = {id: articleId, version: articleVer, run: articleRun};

      var queuedItems = [];
      queuedItems = this.queued;
      if(_.findWhere(queuedItems, addToQueue)) {
        // delete from queueditems
        _.reject(queuedItems, addToQueue, function(){

        });
      }
      else {
        queuedItems.push(addToQueue);
      }
      this.queued = queuedItems;

      console.log(this.queued);
    },

    displayQueue: function(article) {
      console.log('displayQueue');
      _.each(this.queued, function(article) {
        $('#articles-queue').append('<li>' + article.id + '</li>');
      });
    },

    refreshPage: function(e) {
      if (this.isPublishing === true || e.which === ESCAPE_KEY) {
        location.reload(true);
      }
    },

    performPublish: function(e) {
      //Disable Publish (all) button to stop sending multiple requests
      $('#publish-cancel').hide();
      $(e).empty().attr('disabled', true).css({width: '100%'});

      // gather article data to send off
      // queue them queueArticlePublication
      utils.queueArticles(this.queued);
      // poll to find out the status getArticleStatus
      // profit





      //Poll endpoint if articles can be queued
      queueArticlePublication();

      //Wait 5 seconds for the first response
      setTimeout(function() {
        //If the JS Object is not empty then
        if (!jQuery.isEmptyObject(articlesQueue)) {
          getArticleStatus();
        }
      }, 5000);



      this.isPublishing = true;

    },



  };

  App.init();


  /// Code still to be refactored

  //Global variables
  var dataStructure = []; //Data structure for the ajax request
  var articlesQueue = {}; //JS Object that holds the article-ids to be queued/published
  var articleId;
  var articleVer;
  var queueDress; //Variables to prepare the article-id(s) for use


  //Poll
  function queueArticlePublication() {

    //$.ajax({
    //  url: url,
    //  type: "POST",
    //  data: {articles: JSON.stringify(data)},
    //  contentType: "application/json",
    //  complete: callback
    //});


    $.ajax({
      type: 'POST',
      url: 'http://localhost:8008/queue_article_publication',
      data: {articles: dataStructure.join(',')},
      error: function(xhr, textStatus, errorThrown) {
        var err = textStatus + ', ' + errorThrown;
        console.log('Request Failed: ' + err);
      },
    }).done(function(data, textStatus) {

      console.log(data)
      console.log(textStatus)

      //Loop through all the key, value pairs in returned JS Object from server
      $.each(data, function(key, value) {

        //Check if key exists in JS Object and the same key from server's response has the value 'queued'
        if (articlesQueue.hasOwnProperty(key) && value === 'queued') {

          //If not showing the spinner
          if ($('#publish-action *:not(div)')) {
            //Show the publish (all) spinner in progress
            $('#publish-action').empty().append('<div class="throbber-loader">Loading…</div>');
          }

          //Edit the JS Object with the value from server's response
          articlesQueue[key] = value;
        } else if (articlesQueue.hasOwnProperty(key) && value === 'error') {

          var keyCheck = "#articles-queue li:contains('" + key + "')";

          //Show error(s) to the user next to article(s) & Remove article-id(s) from JS Object
          $(keyCheck).append('<span class="glyphicon glyphicon-remove glyphicon-remove--stat" data-toggle="tooltip" data-placement="top" title=" + value + "></span>');
          delete articlesQueue[key];
        }

        //If the JS Object is empty then
        if (jQuery.isEmptyObject(articlesQueue)) {
          //Feedback to the user
          $('#publish-action').unbind().text('Close').attr('disabled', false);

          //Bind a reload to the click
          $('#publish-action').click(function() {
            location.reload(true);
          });
        }

        //Initialise Tooltips
        $('[data-toggle="tooltip"]').tooltip();

      });

      //Prepare the data structure
      dataStructure = [];
      $.each(articlesQueue, function(key) {
        dataStructure.push(key);
      });
    });
  }

  //Responses
  function getArticleStatus() {

    $.ajax({
      type: 'GET',
      url: 'http://localhost:8008/check_article_status',
      data: {articles: dataStructure.join(',')},
      error: function(xhr, textStatus, errorThrown) {
        var err = textStatus + ', ' + errorThrown;
        console.log('Request Failed: ' + err);
      },
    }).done(function(data, textStatus) {

      //Loop through all the key, value pairs in returned JS Object from server
      $.each(data, function(key, value) {

        var keyCheck = "#articles-queue li:contains('" + key + "')";

        //Check if key exists in JS Object and the same key from server's response has the value 'published'
        if (articlesQueue.hasOwnProperty(key) && value === 'published') {

          //Show published status to the user next to article(s) & Remove article-id(s) from JS Object
          $(keyCheck).append('<span class="glyphicon glyphicon-ok glyphicon-ok--stat" data-toggle="tooltip" data-placement="top" title="' + value + '"></span>');
          delete articlesQueue[key];
        } else if (articlesQueue.hasOwnProperty(key) && value === 'error') {

          //Show error status to the user next to article(s) & Remove article-id(s) from JS Object
          $(keyCheck).append('<span class="glyphicon glyphicon-remove glyphicon-remove--stat" data-toggle="tooltip" data-placement="top" title="' + value + '"></span>');
          delete articlesQueue[key];
        }

      });

      //Initialise Tooltips
      $('[data-toggle="tooltip"]').tooltip();

      //If the JS Object is still not empty then
      if (!jQuery.isEmptyObject(articlesQueue)) {

        //Prepare the data structure
        dataStructure = [];
        $.each(articlesQueue, function(key) {
          dataStructure.push(key);
        });

        //Loop this function every 10 seconds
        setTimeout(function() {
          getArticleStatus();
        }, 10000);
      } else {

        //Feedback to the user
        $('#publish-action').unbind().text('Close').attr('disabled', false);

        //Bind a reload to the click
        $('#publish-action').click(function() {
          location.reload(true);
        });
      }
    });
  }


})(jQuery);

(function(w) {
  var sw = document.body.clientWidth;
  var sh = document.body.clientHeight;

  $(w).resize(function() { //Update dimensions on resize
    sw = document.body.clientWidth;
    sh = document.body.clientHeight;

    //updateAds();

  });

  //Navigation toggle
  $('.nav-toggle-menu').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
  });

  //Navigation toggle
  $('.nav-toggle-search').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header .search-form').toggleClass('active');
  });
})(this);

this["eLife"] = this["eLife"] || {};
this["eLife"]["templates"] = this["eLife"]["templates"] || {};

Handlebars.registerPartial("article-item-template", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <td class=\"column-3\">\n            <a href=\"#\">\n                <b>STATUS MESSAGE</b>\n            </a>\n        </td>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <td class=\"column-3\">\n            <button class=\"btn btn-default preview\">\n                <span class=\"glyphicon glyphicon-eye-open\"></span>\n                Preview\n            </button>\n            <button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\"\n                    type=\"button\">\n                <span class=\"glyphicon glyphicon-globe\"></span>\n                Publish Now\n            </button>\n            <div class=\"checkbox\">\n                <label>\n                    <input type=\"checkbox\" class=\"toggle-publish-all\"> Batch Publishing\n                </label>\n            </div>\n        </td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr data-article-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-article-version=\""
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "\" data-article-run=\""
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "\">\n    <td class=\"column-1\">\n        <a href=\"#\" class=\"hidden-xs\">\n            <span class=\"glyphicon glyphicon-file "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></span>\n        </a>\n        <h6>\n            <a href=\"#\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n        </h6>\n\n        <p>\n            <a href=\"#\">"
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "</a>\n        </p>\n    </td>\n    <td class=\"column-2\">\n        <dl>\n            <dt>\n                <a href=\"#\">\n                    <i>Version:</i>\n                </a>\n            </dt>\n            <dd>\n                <a href=\"#\">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.run || (depth0 != null ? depth0.run : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n            </dd>\n            <dt>\n                <a href=\"#\">\n                    <i>Article type:</i>\n                </a>\n            </dt>\n            <dd>\n                <a href=\"#\">Research Article</a>\n            </dd>\n            <dt>\n                <a href=\"#\">\n                    <i>Publication date:</i>\n                </a>\n            </dt>\n            <dd>\n                <a href=\"#\">"
    + alias4(((helper = (helper = helpers.datePublished || (depth0 != null ? depth0.datePublished : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datePublished","hash":{},"data":data}) : helper)))
    + "</a>\n            </dd>\n            <dt>\n                <a href=\"#\">\n                    <i>Corresponding authors:</i>\n                </a>\n            </dt>\n            <dd>\n                <a href=\"#\">"
    + alias4(((helper = (helper = helpers.authors || (depth0 != null ? depth0.authors : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"authors","hash":{},"data":data}) : helper)))
    + "</a>\n            </dd>\n        </dl>\n    </td>\n"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"isnt","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"is","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</tr>";
},"useData":true}));

Handlebars.registerPartial("article-publish-modal", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"btn btn-default pattern-helper\" data-toggle=\"modal\" data-target=\"#publish-modal\">\n    Modal\n</a>\n<div class=\"modal fade\" id=\"publish-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" aria-labelledby=\"publish-modal\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Publish article(s)</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you sure you want to publish the following article(s)?\n                <ol id=\"articles-queue\"></ol>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"publish-cancel\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner publish-action\" id=\"publish-action\"></button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true}));

this["eLife"]["templates"]["article-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
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

  return ((stack1 = container.invokePartial(partials["article-item-template"],depth0,{"name":"article-item-template","hash":{"section":blockParams[2][1]},"data":data,"blockParams":blockParams,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["error-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section>\n    <p><strong>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.statusText || (depth0 != null ? depth0.statusText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusText","hash":{},"data":data}) : helper)))
    + "</strong> Sorry an error occurred retrieving the articles.</p>\n</section>";
},"useData":true});