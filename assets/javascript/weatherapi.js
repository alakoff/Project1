
function apiCall(zip, country) {

    var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + country + "&units=imperial&appid=ee0fc7e4084dd72152033db8d2dac3d0";
    // console.log(url);
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        displayWeather(response);
    });
}

$("#card12").hide();
//  event for when a new object is added to the database
$(".weather-img").on("click", function () {

    //Add image border to weather icon 
    $(".weather-img").css("border", "3px solid grey");

    //Clear image border from other icons
    $(".news-img").css("border", "none");
    $(".yelp-img").css("border", "none");
    $(".attraction-img").css("border", "none");
    $("#card12").show();
    if (!Globalzip) {
        db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
            
            GlobalCity = snapshot.val().destCity;
            GlobalCountry = snapshot.val().destCountry;
            Globalzip = snapshot.val().destZip;
            apiCall(Globalzip, GlobalCountry);
        });
    }
    else
        apiCall(Globalzip, GlobalCountry);
});

function displayWeather(response){
    //clear the div
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();


    $("#destination").text(response.name+", "+response.sys.country);
    $("#description").text(response.weather[0].description);
    $("#humidity").text("Humidity: "+response.main.humidity);
    $("#temp").text("Temperature: "+response.main.temp);
    $("#temp-max").text("Max temp: "+response.main.temp_max);
    $("#temp-min").text("Min temp: "+response.main.temp_min);
}

