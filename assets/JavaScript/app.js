$(document).ready(function () {
    // This array is going to contain the sports that are preloaded to the page, and also the ones the user adds to the list
    var sportsArray = ["tennis", "cycling", "soccer", "baseball", "basketball"];
    // This function is the core of the game, inside it we do the ajax request, add the images to the website and also the rating of the gifs
    function displaySport() {
        // Here we give the var sport an attribute of "data-name", that way we can use that variable to search in the giphy API
        var sport = $(this).attr("data-name");
        // We set the var queryURL equal to the result of the search, that way it is easier to read later
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ujPjQgKwFJVF10SFXmts0jvOPRVeV0Cm&q=" + sport + "&limit=10&offset=0&rating=G&lang=en";
        // This is our ajax request, we are pulling data from the giphy API using the link from queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // We log the result of this search (response) to make sure the search was succesful
            console.log(response);
            // We set the var "results" equal to "response.data", we are going to access the rating and the gifs using this variable. It makes the process shorter
            var results = response.data;
            // We use this for loop to run through the 10 results from our search, and to pull the data we need.
            for (var i = 0; i < results.length; i++) {
                // We set the var "sportDiv" equal to a new html div, this is going to display the gifs on the website
                var sportDiv = $("<div>");
                // Here we use the var "results" to access the rating of the gifs, and we set that equal to the var "p", this is going to display the rating on the screen
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.addClass("rating");
                // We create the var "sportImage" that is going to contain the gif, and it is also going to be used to pause-resume the gifs using attr, we give 4 attributes to each one of them: "src" for the image the user will see, "data-still" for when we pause the gif, "data-animate" to resume the gif and "data-state", "still" so that the gif can appear paused. We also add a class of "gif" so we can identify the gifs and target them later
                var sportImage = $("<img>");

                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("data-still", results[i].images.fixed_height_still.url);
                sportImage.attr("data-animate", results[i].images.fixed_height.url);
                sportImage.attr("data-state", "still");
                sportImage.addClass("gif");


                // Here we append variables "p" and "sportImage" to var "sportDiv" because that is the variable we are going to render on the website
                sportDiv.append(p);
                sportDiv.append(sportImage);
                // Here we target the html id "#sport-images", that is where we want the gifs to show on the website
                $("#sport-images").prepend(sportDiv);

            }
            // This on("click") function is going to pause-resume the gifs using the code described between lines 27 and 33
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
        // The empty() method is going to delete previous gifs when the user clicks a new button. This way the user can only see the gifs he/she has most recently selected
        $("#sport-images").empty();
    }
    // The function renderButtons() is going to display the buttons for each sport on the website, that way the user will be able to click on them. This function will be called later on.
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
    // This on("click") method is going to allow the user to add the sports to the website, that way they can be selected later
    $("#add-sport").on("click", function (event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        sportsArray.push(sport);

        renderButtons();
    });
    // This on("click") method is going to call the function displaySport() when the user clicks on each sport button, which will display the gifs for the sport clicked
    $(document).on("click", ".sport-buttons", displaySport);
    // Function renderButtons() is called one more time to make sure the buttons are displayed on the website
    renderButtons();
});