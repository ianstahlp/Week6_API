$(document).ready(function() {


    var cyberPunk = ["Blade Runner", "CyberPunk", "Ghost In The Shell"];

//now for the meat and bones of this thing.
    function cyberPunkDisplay() {
        //this renames the new cyber variable to work within this function. to add to 'data-name' everytime the new q is added within the url. neato
        var cyber = $(this).attr("data-name");

        //this is the URL I requested and all the fun things within in the API. It's self-explanatory.
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=D41gbr2b1uEFwKbbBJ6w2stQNLVENSWV&q=" + cyber + "&limit=5&offset=0&rating=PG&lang=en";
        console.log(queryURL);
        $.ajax({

            url: queryURL,
            method: "GET"

        }).done(function(response) { //this fun thing comes around once the API is called.


                //this here empties out the div with this ID each and everytime a new input is pushed.
                //in other words, it doesn't append new information to the previous API call.
         $("#gif-view").empty();

            //for the sake of stopping repeated inputs on my own end. Makes it sliiiightly quicker. 
            var results = response.data;


            //FOR LOOPS BLARGH
            for (var i = 0; i < results.length; i++) {
                //I tried a different thing here and added the class within the variable. I don't know which I like more. I think I hate both.
                var gifDiv = $("<li class='gifDiv'>");
           
                //I fininally realized what "rating" constitutes. I think it was introduced with the OMDB exercise so I thought it was data about the movie itself and
                //not of the gif. LESSONS LEARNED. +.02 INTELLIGENCE ADDED
                var rating = $("<p>").text("Rating: " + results[i].rating);

                //We append the rating on top of the image using that p element on top.
                gifDiv.append(rating);

                //this makes the image do fun stuff I GUESS
                gifImage = $("<img>");


                //this took forever to figure out. Essentially, we attribute each and every...pseudoelement?...within the API call.

                //first we grab the image itself.
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //then we attribute the means of how the gif is called, in this case, it starts small. These two are needed for DOM manipulation later on.
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 

                //we add a new class for DOM manipulation. Thanks, class exercise.
                gifImage.addClass("image");

                //finally, we append the entire thing into the #gif-view. Hooray for me. 
                gifDiv.append(gifImage);
                
                $("#gif-view").prepend(gifDiv);
            }


        });


    }
//this here function renders the initial buttons for the array provided on line 4. 
    function buttonRender() {


        $("#buttons-view").empty();

        for (var i = 0; i < cyberPunk.length; i++) {

            var gifButton = $("<button>");
            //needed to add numerous classes to this for bootstrap presentation as well as DOM manipulation. 
            gifButton.addClass("cyber");
            gifButton.addClass("btn btn-primary");

            //This attributes each button with the name within the cyberPunk array
            gifButton.attr("data-name", cyberPunk[i]);

            //at which point, we have this that actually displays the stuff. neato.
            gifButton.text(cyberPunk[i]);
            $("#buttons-view").append(gifButton);
        }

    }

//this function is called whened a new button is added via input.
    function newButton() {
        $("#add-gif").on("click", function() {
            //branded a new variable that will add into the gif input ID
            var cyber = $("#gif-input").val().trim();
            //each time a new input is added, it pushes that variable into the global variable cyberPunk
            cyberPunk.push(cyber);

            buttonRender(); //calling this within newButton function allows for a button to be rendered with everything that it implies.
            return false; //I looked this up. I don't know why it works. Stops page refresh
        });

    }




//finally, these things are called. 
    buttonRender();
    newButton();
    $(document).on("click", ".cyber", cyberPunkDisplay);

    //this didn't work inside the cyberPunkDisaply function. Makes sense I guess, I just don't like how it's just kind of chillin' outside. 
    $(document).on("click", ".image", function() {

        //I'm not going to lie, this is almost ad verbatim what was used from the class exercise. I feel dirty. 
        var state = $(this).attr("data-state");
        if ( state === 'still') {
              $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }   else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');

        }
    });



});

//I'm done. Thanks for that, Omar and company. I almost never want to touch API's again. 






//they are cool tho