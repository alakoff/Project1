
//on news image click
$(".news-img").on("click", function () {

    db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        functionCallAPI(snapshot.val().destCountry);
    });
});

//function to call API
function functionCallAPI(destCountry) {

    /* For news Api */
    var NEWS_API_KEY = 'b83d1089394b41b5860ba157c186b529';
    var COUNTRY = destCountry;
    // var queryURL = "https://newsapi.org/v2/top-headlines?category=general&country=" + COUNTRY + "&apiKey=" + NEWS_API_KEY;

    var queryURL = "https://newsapi.org/v2/everything?q=Washington&apiKey=" + NEWS_API_KEY;


    $.ajax({

        url: queryURL,

        method: "GET"

    }).then(function (response) {

        console.log(response);
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

    //fetch Top20 news article from API

    for (var i = 0; i < 20; i++) {

        newDiv = $('<div>').attr('class', 'card');
        image = $('<img>').attr('src', response.articles[i].urlToImage).attr('class', 'card-img-top');
        newDiv.append(image);

        newbody = $('<div>').attr('class', 'card-body');
        otherElem1 = $('<h5>').text(response.articles[i].title).attr('class', 'card-title');
        otherElem2 = $('<p>').text(response.articles[i].description).attr('hrclassef', 'card-text');
        otherElem3 = $('<a>').text('More').attr('href', response.articles[i].url).attr('class', 'btn btn-primary').attr('target','_blank');
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
}
