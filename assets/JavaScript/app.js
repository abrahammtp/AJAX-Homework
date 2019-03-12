$(document).ready(function () {

    var sportsArray = ["tennis", "cycling", "soccer", "baseball", "basketball"];

    function displaySport() {

        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ujPjQgKwFJVF10SFXmts0jvOPRVeV0Cm&q=" + sport + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var sportDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);
                p.addClass("rating");

                var sportImage = $("<img>");

                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("data-still", results[i].images.fixed_height_still.url);
                sportImage.attr("data-animate", results[i].images.fixed_height.url);
                sportImage.attr("data-state", "still");
                sportImage.addClass("gif");



                sportDiv.append(p);
                sportDiv.append(sportImage);

                $("#sport-images").prepend(sportDiv);

            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        });

        $("#sport-images").empty();
    }

    function renderButtons() {

        $("#sport-buttons").empty();

        for (var i = 0; i < sportsArray.length; i++) {

            var a = $("<button>");
            a.addClass("sport-buttons");
            a.attr("data-name", sportsArray[i]);
            a.text(sportsArray[i]);
            $("#sport-buttons").append(a);
        }
    }

    $("#add-sport").on("click", function (event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        sportsArray.push(sport);

        renderButtons();
    });

    $(document).on("click", ".sport-buttons", displaySport);

    renderButtons();
});