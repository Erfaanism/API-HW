$(document).ready(function() {

	

	var arrMovies = ["Reservoir Dogs", "Pulp Fiction", "Jackie Brown", "Kill Bill", "Inglourious Basterds", "Django Unchained"];

	function loading() {
		$.each(arrMovies, function (i, val) {
			$("#buttonContainer").append($("<button>").addClass("movieButtons").attr("data-name", val).text(val));
			$("body").css("background-color", randomColor());
		})
	}

	function displayRating(movieName) {
		$.ajax({
			url: "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece",
			method: "GET"
		}).done(function(response) {
			$("#movieRating").html("<span id='imdbRating'>" + response.Ratings[0].Source + ": " + response.Ratings[0].Value + "</span>");
			$("#movieRating").append("<span id='rtRating'>" + response.Ratings[1].Source + ": " + response.Ratings[1].Value + "</span>");
			$("#movieRating").append("<span id='mcRating'>" + response.Ratings[2].Source + ": " + response.Ratings[2].Value + "</span>");
		})

	}

	function displayGIPHY(movieName) {
		var rowDiv = $("<div class='row'>");
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?api_key=HVbOpAnkelVdlK1Vv9EAEiTGQ3b3PRvR&q=" + movieName + "&limit=12&offset=0&rating=R&lang=en",
			method: "GET"
		}).done(function (response) {
			$.each(response.data, function (j, val2) {
				var colDiv = $("<div class='col-4 mt-4'>");
				var ratingP = $("<p>").text("Rating: " + response.data[j].rating.toUpperCase());
				var imgGIF = $("<img>").addClass("gif").attr("src", response.data[j].images.fixed_height_still.url).attr("id", "gif" + j, "alt", "GIF" + j).attr("data-state", "still").attr("data-still", response.data[j].images.fixed_height_still.url).attr("data-animated", response.data[j].images.fixed_height.url);
				colDiv.html(ratingP);
				colDiv.append(imgGIF);
				rowDiv.append(colDiv);
			})
		})
		$("#moviesSection").html(rowDiv);
	}

	function randomColor() {
		var characters = "123456789ABCDEF";
		console.log(characters.length);
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += characters[Math.floor(Math.random() * characters.length)];

		}
		console.log(color);
		return color;
	}

	loading();

	$("#addMovie").click(function(event) {
		event.preventDefault();
		$("#buttonContainer").append($("<button>").addClass("movieButtons").attr("data-name", $("#movieInput").val().trim()).text($("#movieInput").val().trim()));
		$("#movieInput").val("");
	})

	$(document).on("click", ".movieButtons", function(){
		$("body").css("background-color", randomColor());
		displayRating($(this).attr("data-name"));
		displayGIPHY($(this).attr("data-name"));
	})

	$(document).on("click", ".gif", function(){
		
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animated")).attr("data-state", "animated");
		}
		else {
			$(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
		}
	})
})