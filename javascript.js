$(document).ready(function() {


    var cyberPunk = ["Blade Runner", "CyberPunk", "Ghost In The Shell"];

    function buttonRender() {

        
        $("#buttons-view").empty();

        for (var i = 0; i < cyberPunk.length; i++) {

            var gifButton = $("<button>");
            gifButton.addClass("cyber");
            gifButton.addClass("btn btn-primary");
            gifButton.attr("data-name", cyberPunk[i]);
            gifButton.text(cyberPunk[i]);
            $("#buttons-view").append(gifButton);
        }

    }

    function newButton() {
        $("#add-gif").on("click", function() {

            var cyber = $("#gif-input").val().trim();
            cyberPunk.push(cyber);

            buttonRender(); //calling this within newButton function allows for a button to be rendered with everything that it implies.
            return false; //I looked this up. I don't know why it works. Stops page refresh
        });

    }


    function cyberPunkDisplay() {

        var cyber = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=D41gbr2b1uEFwKbbBJ6w2stQNLVENSWV&q=" + cyber + "&limit=5&offset=0&rating=PG&lang=en";
        console.log(queryURL);
        $.ajax({

            url: queryURL,
            method: "GET"

        }).done(function(response) {

            $("#gif-view").empty();
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<li class='gifDiv'>");
               // gifDiv.addClass("gifDiv");

                var rating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(rating);
                gifImage = $("<img>");



                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gif-view").prepend(gifDiv);
            }


        });


    }

    buttonRender();
    newButton();
    $(document).on("click", ".cyber", cyberPunkDisplay);
    $(document).on("click", ".image", function() {

        var state = $(this).attr("data-state");
        if ( state === 'still') {
              $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }   else{
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');

        }
    });



});