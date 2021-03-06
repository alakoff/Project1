//on news image click
$(".news-img").on("click", function () {

    //Add image border to News icon 
    $(".news-img").css("border", "3px solid grey");

    //Clear image border from other icons
    $(".weather-img").css("border", "none");
    $(".attraction-img").css("border", "none");
    $(".yelp-img").css("border", "none");
    $(".zomato-img").css("border", "none");
    if (!GlobalCity) {

        db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

            //initialise global variable
            GlobalCity = snapshot.val().destCity;
            GlobalCountry = snapshot.val().destCountry;
            Globalzip = snapshot.val().destZip;
            //using global variable to call API
            functionCallAPI(GlobalCountry, GlobalCity, Globalzip);
        });

    } else

        functionCallAPI(GlobalCountry, GlobalCity, Globalzip);

});

//function to call API
function functionCallAPI(destCountry, destCity, destZip) {

    /* For news Api */
    var NEWS_API_KEY = 'b83d1089394b41b5860ba157c186b529';
    
    var queryURL = "https://newsapi.org/v2/everything?q='" + destCity + "'&apiKey=" + NEWS_API_KEY;
    //var queryURL = "https://newsapi.org/v2/top-headlines?q='" + destCity + "'&category=general&country=" + destCountry + "&apiKey=" + NEWS_API_KEY;
    $.ajax({

        url: queryURL,

        method: "GET"

    }).then(function (response) {

        //console.log(response);
        drycode(response);
    });
}

//list news details
function drycode(response) {

    var newDiv;
    var image;
    var newbody;
    var otherElem1;
    var otherElem2;
    var otherElem3;

    //clear the div
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();
    $('.weatherbody').empty();
    $('.zomato-body').empty();
    $('#weather_carousel').empty();


    //fetch Top20 news article from API
    if (response.totalResults) {
        for (var i = 0; i < 20; i++) {

            newDiv = $('<div>').attr('class', 'card');
            image = $('<img>').attr('src', response.articles[i].urlToImage).attr('class', 'card-img-top');
            newDiv.append(image);

            newbody = $('<div>').attr('class', 'card-body');
            otherElem1 = $('<h5>').text(response.articles[i].title).attr('class', 'card-title');
            otherElem2 = $('<p>').text(response.articles[i].description).attr('class', 'card-text');
            otherElem3 = $('<a>').text('More').attr('href', response.articles[i].url).attr('class', 'btn btn-primary').attr('target', '_blank');
            newbody.append(otherElem1, otherElem2, otherElem3);
            newDiv.append(newbody);

            //for carousel
            if (i < 5)
                $('#first').append(newDiv);

            else if ((i >= 5) && (i < 10))
                $('#second').append(newDiv);

            else if ((i >= 10) && (i < 15))
                $('#third').append(newDiv);
            else
                $('#fourth').append(newDiv);

        }
    } else {
        $('.news-body').empty();
        $('.news-body').append(message);

    }
}