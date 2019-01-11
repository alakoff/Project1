/* For attractions-TicketMaster API */

//function to call API
function callTicketMasterAPI(Country, city, zipcode) {

    /* For ticketmaster Api */
    var TICKETMASTER_API_KEY = 'DVjga3FlueYjqRP5A2UaqjJ4vEvq0rU6';
    var queryURLforticketmaster = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&countryCode=" + Country + "&apikey=" + TICKETMASTER_API_KEY;
   // console.log(queryURLforticketmaster);

    $.ajax({

        url: queryURLforticketmaster,

        method: "GET"

    }).then(function (response) {

       // console.log(response);
        ticketmasterListing(response);

    });
}
//on attraction image click
$(".attraction-img").on("click", function () {

    //Add image border to News icon 
    $(".attraction-img").css("border", "3px solid grey");

    //Clear image border from other icons
    $(".weather-img").css("border", "none");
    $(".news-img").css("border", "none");
    $(".yelp-img").css("border", "none");
    $(".zomato-img").css("border", "none");
  
   
    if(!GlobalCity){

        db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
            GlobalCity=snapshot.val().destCity;
            GlobalCountry = snapshot.val().destCountry;
            Globalzip =snapshot.val().destZip;
            callTicketMasterAPI(GlobalCountry,GlobalCity,Globalzip);  
        });

    }else
        //using global variable as input
        callTicketMasterAPI(GlobalCountry,GlobalCity,Globalzip);  
    

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
    $('.weatherbody').empty();
    $('.zomato-body').empty();
    $('#weather_carousel').empty();
    

    if (response.page.totalElements) {

        var data = response._embedded.events;
        var info = '';
        var info1 = '';

        for (var i = 0; i < data.length; i++) {

            outerDiv = $('<div>').attr('class', 'card bg-info text-dark text-center font-weight-bold p-3');
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
        $('#ticketmaster').empty();
        $('#ticketmaster').append(message);

    }
}