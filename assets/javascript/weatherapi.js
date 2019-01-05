
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
//  event for when a new object is added to the database
$(".weather-img").on("click", function () {

    //Add image border to weather icon 
    $(".weather-img").css("border", "3px solid grey");

    //Clear image border from other icons
    $(".news-img").css("border", "none");
    $(".yelp-img").css("border", "none");
    $(".attraction-img").css("border", "none");

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
    $('.weatherbody').text('City :' +response.name+',Humidity:'+response.main.humidity+', Current Temperature:'+response.main.temp+', Maximum Temp:'+response.main.temp_max+', Minimum Temp:'+response.main.temp_min);

}

