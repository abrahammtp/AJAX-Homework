$(document).ready(function () {

    var sportsArray = ["tennis", "cycling", "soccer", "baseball", "basketball"];

    $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    function displaySport() {

        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ujPjQgKwFJVF10SFXmts0jvOPRVeV0Cm&q=" + sport + "&limit=10&offset=0&rating=G&lang=en";

            $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var sportDiv = $("<div>");
                    sportDiv.addClass("gif");
        
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);
        
                    // Creating and storing an image tag
                    var sportImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    sportImage.attr("src", results[i].images.fixed_height.url);
        
                    // Appending the paragraph and image tag to the animalDiv
                    sportDiv.append(p);
                    sportDiv.append(sportImage);
        
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#sport-images").prepend(sportDiv);
                  }

                
            });

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

      $("#add-sport").on("click", function(event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        sportsArray.push(sport);

        renderButtons();
      });

      $(document).on("click", ".sport-buttons", displaySport);

      renderButtons();

      


    // startButtons(); 

    // $("#buttons").click(displaySport());

    // function startButtons() {
    //     for (let i = 0; i < sportsArray.length; i++) {
    //         var buttons = $("<button>");
    //         buttons.addClass("sports");
    //         buttons.attr("data-name", sportsArray[i]);
    //         buttons.text(sportsArray[i]);
    //         $("#sport-buttons").append(buttons);
    //         $("#add-sport").on("click", function(event){
    //             event.preventDefault();
    //             var sport = $("#sport-input").val().trim();
    //             // sport.addClass("sports");
    //             sport.attr("data-name", sportsArray[i]);
    //             sport.text(sportsArray[i]);
    //             sportsArray.push(sport);
    //             $("$sport-buttons").append(sport);

    //         }
    //    )}
    // }

    // function displaySport() {
    //     var sportsArray = $(this).attr("data-sport");
    //     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportsArray + "&api_key=ujPjQgKwFJVF10SFXmts0jvOPRVeV0Cm";

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
    //         console.log(response);







    //     })

    // }

    // // $("#add-sport").on("click", function(event){
    // //     event.preventDefault();
    // //     var sport = $("#sport-input").val().trim();
    // //     // sport.addClass("sports");
    // //     sport.attr("data-name", sportsArray[i]);
    // //     sport.text(sportsArray[i]);
    // //     sportsArray.push(sport);
    // //     $("$sport-buttons").append(sport);

    // //     // var buttons = $("<button>");


    // // })
});