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

	//Global variables
	var articlesQueue = [];
	var articleId, articleVer, queueDress;

	//Publish Checkbox
	$('.article-snapshot-list.action input:checkbox').click(function(e) {

		$("#publish-action").hide();
		$("#publish-all-action").show();

		if ($("#articles-queue").length == 0) {
			$("#article-queue").detach();
			$("#publish-modal .modal-body").append("<ol id='articles-queue'></ol>");
		}

		if ($(".article-snapshot-list.action input:checkbox:checked").length > 0) {
			$(".btn#publish").attr('disabled', true);
			$("#publish-all").show();
		} else {
			$(".btn#publish").attr('disabled', false);
			$("#publish-all").hide();
		}

		articleId = $(this).parents("li").find(".article-id").html();
		articleVer = $(this).parents("li").find(".article-version").html();
		queueDress = articleId + "-v" + articleVer;

		if (this.checked) {
			articlesQueue.push(queueDress);
			$("#articles-queue").append("<li>" + queueDress + "</li>");
		} else {
		 	articlesQueue.pop(queueDress);
			$("#articles-queue li:contains('" + queueDress + "')").remove();
		}
	});
	//Publish
	$(".btn#publish").click(function(e) {

		$("#publish-all-action").hide();
		$("#publish-action").show();

		if ($("#article-queue").length == 0) {
			$("#articles-queue").detach();
			$("#publish-modal .modal-body").append("<ol id='article-queue'></ol>");
		}

		articleId = $(this).parents("li").find(".article-id").html();
		articleVer = $(this).parents("li").find(".article-version").html();
		queueDress = articleId + "-v" + articleVer;

		$("#article-queue li").remove();
		$("#article-queue").append("<li>" + queueDress + "</li>");
	});
	//Publish Cancel
	$(".btn#publish-cancel").click(function(e) {

		$("#article-queue, #articles-queue").detach();
		location.reload(true);
		console.log("page reloaded");
	});
	//Publish Action
	$("#publish-action, #publish-all-action").click(function(e) {

		// Process
		// $.ajax({
		//   type: 'POST',
		//   url: '../../data/queue.json',
		//   success: function(data, textStatus) {
		//     $.each(data, function(key, value) {
		// 		if (value === "error") {
		// 			console.log("error");
		// 		} else if (value === "published") {
		// 			console.log("published");
		// 		} else if (value === "ready to publish") {
		// 			console.log("ready to publish");
		// 		} else if (value === null) {
		// 			console.log("null");
		// 		} else {
		// 			console.log("not handled");
		// 		}
		// 	});
		//   },
		//   error: function(xhr, textStatus, errorThrown) {
		//     var err = textStatus + ", " + errorThrown;
		// 	console.log( "Request Failed: " + err );
		//   }
		// });

		//Response Loop
		getResponse();
	});

	//Responses
	function getResponse() {
		$.ajax({
			type: 'GET',
			url: '../../data/response.json',
			success: function(data, textStatus) {

			    $.each(data, function(key, value) {

					if (jQuery.inArray(key, articlesQueue) !== -1 || $("#article-queue")) {

						var keyCheck = "#article-queue li:contains('" + key + "'), #articles-queue li:contains('" + key + "')";

						if (value === "error") {
							$(keyCheck).append("<span> error</span>");
						} else if (value === "published") {
							$(keyCheck).append("<span> published</span>");
						} else if (value === "ready to publish") {
							$(keyCheck).append("<span> ready to publish</span>");
						} else if (value === null) {
							$(keyCheck).append("<span> null</span>");
						} else {
							console.log(value);
						}
					}
				});

				setTimeout(function() {
					getResponse();
				}, 10000);
			},
			error: function(xhr, textStatus, errorThrown) {

			    var err = textStatus + ", " + errorThrown;
				console.log( "Request Failed: " + err );
			}
		});
	};

	//Filter Box
	$('#filter .dropdown-menu').on({
		"click":function(e) {
	      e.stopPropagation();
	    }
	});
})(this);