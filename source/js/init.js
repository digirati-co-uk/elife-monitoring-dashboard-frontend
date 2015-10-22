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
	var articlesQueue = {};
	var articleId, articleVer, queueDress;

	//Article Checkbox
	$('.article-snapshot-list.action input:checkbox').click(function(e) {

		if ($(".article-snapshot-list.action input:checkbox:checked").length > 0) {
			$(".btn#publish").attr('disabled', true);
		} else {
			$(".btn#publish").attr('disabled', false);
		}

		if ($(".article-snapshot-list.action input:checkbox:checked").length > 1) {
			$("#publish-all").show();
		} else {
			$("#publish-all").hide();
		}
	});
	//Article Publish Click
	$(".btn#publish").click(function(e) {

		$("#articles-queue").empty();
		$("#publish-all-action").hide();
		$("#publish-action").show();
		
		articleId = $(this).parents("tr").find(".article-id").html();
		articleVer = $(this).parents("tr").find(".article-version").html();
		queueDress = articleId + "-v" + articleVer;

		articlesQueue = {};
		articlesQueue[queueDress] = "";
		// articlesQueue[JSON.stringify(queueDress)] = "";

		$("#articles-queue").append("<li>" + queueDress + "</li>");

		// console.log(articlesQueue);
	});
	//Article Publish All Click
	$(".btn#publish-all").click(function(e) {

		$("#articles-queue").empty();
		$("#publish-all-action").show();
		$("#publish-action").hide();

		articlesQueue = {};

		$(".article-snapshot-list.action input:checkbox:checked").each(function() {
			
			articleId = $(this).parents("tr").find(".article-id").html();
			articleVer = $(this).parents("tr").find(".article-version").html();
			queueDress = articleId + "-v" + articleVer;


			articlesQueue[queueDress] = "";

			$("#articles-queue").append("<li>" + queueDress + "</li>");
		});

		// console.log(articlesQueue);
	});
	//Publish/Publish All Action
	$("#publish-action, #publish-all-action").click(function(e) {

		e.stopPropagation();
		$(this).attr('disabled', true);

		//Publish Queue
		sendQueue();

		//Response Loop
		getResponse();

		//Publish Cancel
		$("#publish-modal .modal-dialog").click(function(e) {
			e.stopPropagation();
		});
		$("#publish-modal button.close, .btn#publish-cancel").click(function(e) {

			e.stopPropagation();
			location.reload(true);
		});
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				location.reload(true);
			}
		});
	});
	//Poll
	function sendQueue() {
		$.ajax({
			type: 'POST',
			// url: '../../data/queue.json',
			url: '../../data/queue.json',
			data: articlesQueue,
		    error: function(xhr, textStatus, errorThrown) {
	      		var err = textStatus + ", " + errorThrown;
				console.log( "Request Failed: " + err );
		  	}
		}).done(function(data, textStatus) {

			// console.log(articlesQueue);

		    $.each(data, function(key, value) {

		    	if (articlesQueue.hasOwnProperty(key) && articlesQueue[key] === "queued") {

					var keyCheck = "#articles-queue li:contains('" + key + "')";

					// build up the object array with the values from the server

					// set the publish / publish all spinner in progress
					$("#publish-action, #publish-all-action").append("<div class='throbber-loader'>Loading…</div>");

					// if (value.result === "error") {
					// 	console.log(value[0].result + ": " + value[1].message);
					// 	$(keyCheck).append("<span class='glyphicon glyphicon-remove'></span>");
					// } else if (value.result === "queued") {
					// 	console.log(value[0].result);
					// 	$("#publish-action, #publish-all-action").empty().append("<div class='throbber-loader'>Loading…</div>");
					// } else {
					// 	console.log(value[0]);
					// }
				} else {
					// show errors to the user next to articles
				}
			});
		});
	}
	//Responses
	function getResponse() {
		$.ajax({
			type: 'GET',
			url: '../../data/response.json',
			success: function(data, textStatus) {

				// poll for articles that have not yet been published recursively

			    $.each(data, function(key, value) {

			    	// check if key exists and its value is not 'published'
					if (articlesQueue.hasOwnProperty(key) && articlesQueue[key] !== "published") {

						var keyCheck = "#articles-queue li:contains('" + key + "')";

						$(keyCheck).children().remove();

						if (value === "error") {
							$(keyCheck).append("<span class='glyphicon glyphicon-remove' data-toggle='tooltip' data-placement='top' title='Error'></span>");
						} else if (value === "published") {
							$(keyCheck).append("<span class='glyphicon glyphicon-ok' data-toggle='tooltip' data-placement='top' title='Published'></span>");
						} 
						// else if (value === "ready to publish") {
						// 	$(keyCheck).append("");
						// } 
						else if (value === null) {
							$(keyCheck).append("<span class='glyphicon glyphicon-warning-sign' data-toggle='tooltip' data-placement='top' title='Something went wrong'></span>");
						} else {
							console.log(value);
						}
					}
				});

				//Initialise Tooltip
				$('[data-toggle="tooltip"]').tooltip();

				setTimeout(function() {
					getResponse();
				}, 10000);
			},
			error: function(xhr, textStatus, errorThrown) {
			    var err = textStatus + ", " + errorThrown;
				console.log( "Request Failed: " + err );
			}
		});
	}

	//Filter Box
	$('#filter .dropdown-menu').on({
		"click":function(e) {
	      e.stopPropagation();
	    }
	});
})(this);