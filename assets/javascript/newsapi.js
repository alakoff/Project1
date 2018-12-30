var message = "Nothing to show";
//on news image click
$(".news-img").on("click", function () {

    db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        functionCallAPI(snapshot.val().destCountry, snapshot.val().destCity);
    });
});

//function to call API
function functionCallAPI(destCountry, destCity) {

    /* For news Api */
    var NEWS_API_KEY = 'b83d1089394b41b5860ba157c186b529';
    var COUNTRY = destCountry;
    var CITY = destCity;

    var queryURL = "https://newsapi.org/v2/everything?q='" + CITY + "'&apiKey=" + NEWS_API_KEY;
    //var queryURL = "https://newsapi.org/v2/top-headlines?sources=abc-news-au&apiKey=" + NEWS_API_KEY;
    //var queryURL = "https://newsapi.org/v2/top-headlines?category=general&country=" + COUNTRY + "&apiKey=" + NEWS_API_KEY;
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
    $('#ticketmaster').empty();

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
        $('.news-body').append(message);

    }
}

/* For attractions-TicketMaster API */

//function to call API
function callTicketMasterAPI(Country, city, zipcode, state) {

    /* For ticketmaster Api */
    var TICKETMASTER_API_KEY = 'DVjga3FlueYjqRP5A2UaqjJ4vEvq0rU6';
    var queryURLforticketmaster = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&countryCode=" + Country + "&apikey=" + TICKETMASTER_API_KEY;
    console.log(queryURLforticketmaster);

    $.ajax({

        url: queryURLforticketmaster,

        method: "GET"

    }).then(function (response) {

        console.log(response);
        ticketmasterListing(response);

    });
}
//on attraction image click
$(".attraction-img").on("click", function () {

    db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        callTicketMasterAPI(snapshot.val().destCountry, snapshot.val().destCity, snapshot.val().destZip);
    });
});


function ticketmasterListing(response) {

    var outerDiv;
    var blockquote;
    var pElem;
    var footer;
    var ancherElem;
    //clear the div
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();
    if (response.page.totalElements) {

        var data = response._embedded.events;
        var info = '';
        var info1 = '';

        for (var i = 0; i < data.length; i++) {

            outerDiv = $('<div>').attr('class', 'card bg-warning text-white text-center p-3');
            blockquote = $('<blockquote>').attr('class', 'blockquote mb-0');
            pElem = $('<p>').text(data[i].name);
            if (data[i].priceRanges) info = 'Price Ranges:' + data[i].priceRanges[0].min + '-' + data[i].priceRanges[0].max + data[i].priceRanges[0].currency;
            if (data[i].pleaseNote) info1 = data[i].pleaseNote;

            footer = $('<footer>').attr('class', 'blockquote-footer text-white').html('<small>' + info1 + '<br><cite title="Source Title">' + info + '</cite></small>');

            blockquote.append(pElem, footer);
            outerDiv.append(blockquote);
            ancherElem = $('<a>').attr('target', '_blank').attr('href', data[i].url);
            ancherElem.append(outerDiv);
            $('#ticketmaster').append(ancherElem);

        }
    } else {

        $('#ticketmaster').append(message);

    }
}