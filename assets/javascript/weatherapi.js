
function apiCall(zip, country) {

    var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + country + "&units=imperial&appid=ee0fc7e4084dd72152033db8d2dac3d0";
    // console.log(url);
    $.ajax({
        url: url,
        method: "GET",
        error: function(xhr, status, error){
            
            //clear the divs
            $('#first').empty();
            $('#second').empty();
            $('#third').empty();
            $('#fourth').empty();
            $('#ticketmaster').empty();
            $('.zomato-body').empty();

            //Create error message
            var errorMessage = xhr.status + ': ' + xhr.statusText;

            //Add error message to weather body
           $(".weatherbody").text(errorMessage);
        }

    }).then(function (response) {
        console.log(response);
        displayWeather(response);
        
    })
    
}

//  event for when a new object is added to the database
$(".weather-img").on("click", function () {

    //Add image border to weather icon 
    $(".weather-img").css("border", "3px solid grey");

    //Clear image border from other icons
    $(".news-img").css("border", "none");
    $(".yelp-img").css("border", "none");
    $(".zomato-img").css("border", "none");
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

function displayWeather(response) {

    //clear the div
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();
    $('.zomato-body').empty();

    var newDiv = $('<div>').attr('class', 'card').css('width','18rem');
    var newDiv_body = $('<div>').attr('class', 'card-body');
    var heading = $('<h5>').attr('class', 'card-title').text('Current Weather');
    newDiv_body.append(heading);

    var ulElem = $('<ul>').attr('class', 'list-group list-group-flush');
    var liElem1 = $('<li>').attr('class', 'list-group-item').text(response.name + ", " + response.sys.country);
    var liElem2 = $('<li>').attr('class', 'list-group-item').text(response.weather[0].description);
    var liElem3 = $('<li>').attr('class', 'list-group-item').text("Humidity: " + response.main.humidity);
    var liElem4 = $('<li>').attr('class', 'list-group-item').text("Temperature: " + response.main.temp);
    var liElem5 = $('<li>').attr('class', 'list-group-item').text("Max temp: " + response.main.temp_max);
    var liElem6 = $('<li>').attr('class', 'list-group-item').text("Min temp: " + response.main.temp_min);

    ulElem.append(liElem1, liElem2, liElem3, liElem4, liElem5, liElem6);
    newDiv.append(newDiv_body, ulElem);
    $('.weatherbody').append(newDiv);

}