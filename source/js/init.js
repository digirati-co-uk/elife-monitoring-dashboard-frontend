(function(w){
	var sw = document.body.clientWidth,
		sh = document.body.clientHeight;

	$(w).resize(function(){ //Update dimensions on resize
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

	//Filter Box
	$('#filter .dropdown-menu').on({
		"click":function(e) {
	      e.stopPropagation();
	    }
	});

	//Datepicker
	$('#datetimepicker-start').datetimepicker({
		format: 'D-MM-YY'
	});
    $('#datetimepicker-end').datetimepicker({
    	format: 'D-MM-YY',
        useCurrent: false //Important! See issue #1075
    });
    $("#datetimepicker-start").on("dp.change", function (e) {
        $('#datetimepicker-end').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker-end").on("dp.change", function (e) {
        $('#datetimepicker-start').data("DateTimePicker").maxDate(e.date);
    });

	//Global variables
	var dataStructure = []; //Data structure for the ajax request
	var articlesQueue = {}; //JS Object that holds the article-ids to be queued/published
	var articleId, articleVer, queueDress; //Variables to prepare the article-id(s) for use

	//Article Checkbox
	$('.article-snapshot-list.action input:checkbox').click(function(e) {

		//Interaction in the actionable items column of UIR table
		if ($(".article-snapshot-list.action input:checkbox:checked").length > 0) {
			$(".btn#publish").attr('disabled', true);
			$("#publish-all").show();
		} else {
			$(".btn#publish").attr('disabled', false);
			$("#publish-all").hide();
		}
	});

	//Article Publish Click
	$(".btn#publish").click(function(e) {

		//Empty list & swap text to 'publish'
		$("#articles-queue").empty();
		// $("#publish-all-action").hide();
		$("#publish-action").empty().text('Publish');

		//Prepare the article-ids for insertion in JS object
		articleId = $(this).parents("tr").find(".article-id").html();
		articleVer = $(this).parents("tr").find(".article-version").html();
		queueDress = articleId + "-v" + articleVer;

		//Empty & populate the JS Object
		articlesQueue = {};
		articlesQueue[queueDress] = "";
		// articlesQueue[JSON.stringify(queueDress)] = "";

		//Feedback to the user
		$("#articles-queue").append("<li>" + queueDress + "</li>");

	});

	//Article Publish All Click
	$(".btn#publish-all").click(function(e) {

		//Empty list & swap text to 'Publish all'
		$("#articles-queue").empty();
		// $("#publish-all-action").show();
		$("#publish-action").empty().text('Publish all');

		//Empty the JS Object
		articlesQueue = {};

		//Iterate through selected article(s)
		$(".article-snapshot-list.action input:checkbox:checked").each(function() {
			
			//Prepare the article-ids for insertion in JS object & queue list
			articleId = $(this).parents("tr").find(".article-id").html();
			articleVer = $(this).parents("tr").find(".article-version").html();
			queueDress = articleId + "-v" + articleVer;

			//Add to the JS Object
			articlesQueue[queueDress] = "";

			//Append to the queue list
			$("#articles-queue").append("<li>" + queueDress + "</li>");
		});
	});

	//Publish (all) Action
	$("#publish-action").click(function(e) {

		//Disable Publish (all) button to stop sending multiple requests
		e.stopPropagation();
		$("#publish-cancel").hide();
		$(this).empty().attr('disabled', true).css({"width":"100%"});

		//Prepare the data structure
		$.each(articlesQueue, function(key) {
			dataStructure.push(key);
		});

		//Poll endpoint if articles can be queued
		queueArticlePublication();
		
		//Wait 5 seconds for the first response
		setTimeout(function() {
			//If the JS Object is not empty then
			if (!jQuery.isEmptyObject(articlesQueue)) {
				getArticleStatus();
			}
		}, 5000);

		//Click Close icon to close modal & force reload
		$("#publish-modal button.close").click(function(e) {
			e.stopPropagation();
			location.reload(true);
		});
		//Or press ESC & force a reload
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				location.reload(true);
			}
		});
	});

	//Poll
	function queueArticlePublication() {

		$.ajax({
			type: 'POST',
			url: '../../data/queue.json',
			data: { "articles" : dataStructure.join(",")},
			error: function(xhr, textStatus, errorThrown) {
	      		var err = textStatus + ", " + errorThrown;
				console.log( "Request Failed: " + err );
		  	}
		}).done(function(data, textStatus) {

			//Loop through all the key, value pairs in returned JS Object from server
		    $.each(JSON.parse(data), function(key, value) {

		    	//Check if key exists in JS Object and the same key from server's response has the value 'queued'
		    	if (articlesQueue.hasOwnProperty(key) && value.result == 'queued') {

					//If not showing the spinner
					if ($("#publish-action *:not(div)")) {
						//Show the publish (all) spinner in progress
						$("#publish-action").empty().append("<div class='throbber-loader'>Loading…</div>");
					}

					//Edit the JS Object with the value from server's response
					articlesQueue[key] = value;
				} else if (articlesQueue.hasOwnProperty(key) && value.result == 'error') {

		    		var keyCheck = "#articles-queue li:contains('" + key + "')";

					//Show error(s) to the user next to article(s) & Remove article-id(s) from JS Object
					$(keyCheck).append("<span class='glyphicon glyphicon-remove' data-toggle='tooltip' data-placement='top' title='" + value.message + "'></span>");
					delete articlesQueue[key];
				}

				//If the JS Object is empty then
				if (jQuery.isEmptyObject(articlesQueue)) {
					//Feedback to the user
					$("#publish-action").unbind().text("Close").attr('disabled', false);

					//Bind a reload to the click
					$("#publish-action").click(function(e) {
						e.stopPropagation;
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
			url: '../../data/response.json',
			data: { "articles" : dataStructure.join(",")},
			error: function(xhr, textStatus, errorThrown) {
	      		var err = textStatus + ", " + errorThrown;
				console.log( "Request Failed: " + err );
		  	}
		}).done(function(data, textStatus) {

			//Loop through all the key, value pairs in returned JS Object from server
		    $.each(JSON.parse(data), function(key, value) {

		    	var keyCheck = "#articles-queue li:contains('" + key + "')";

		    	//Check if key exists in JS Object and the same key from server's response has the value 'published'
				if (articlesQueue.hasOwnProperty(key) && value == 'published') {

					//Show published status to the user next to article(s) & Remove article-id(s) from JS Object
					$(keyCheck).append("<span class='glyphicon glyphicon-ok' data-toggle='tooltip' data-placement='top' title='" + value + "'></span>");
					delete articlesQueue[key];
				} else if (articlesQueue.hasOwnProperty(key) && value == 'error') {

					//Show error status to the user next to article(s) & Remove article-id(s) from JS Object
					$(keyCheck).append("<span class='glyphicon glyphicon-remove' data-toggle='tooltip' data-placement='top' title='" + value + "'></span>");
					delete articlesQueue[key];
				} else if (articlesQueue.hasOwnProperty(key) && value === null) {

					//Show error status to the user next to article(s) & Remove article-id(s) from JS Object
					$(keyCheck).append("<span class='glyphicon glyphicon-remove' data-toggle='tooltip' data-placement='top' title='" + value + "'></span>");
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
				$("#publish-action").unbind().text("Close").attr('disabled', false);

				//Bind a reload to the click
				$("#publish-action").click(function(e) {
					e.stopPropagation;
					location.reload(true);
				});
			}
		});
	}
})(this);