
function apiCall(zip, country, city) {

    //current weather URL
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&zip=" + zip + "," + country + "&units=imperial&appid=ee0fc7e4084dd72152033db8d2dac3d0";
    // console.log(url);
    //forcast weather URL
    var forcast_url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&zip=" + zip + "," + country + "&units=imperial&appid=69baadc4bd0301e119aa930b8c5069e2";
    //console.log(forcast_url);

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        displayWeather(response);
    });

    $.ajax({
        url: forcast_url,
        method: "GET"
    }).then(function (forcast_response) {
        console.log(forcast_response);
        displayForcastWeather(forcast_response);
    });
}
//  event on click of weather image
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
            apiCall(Globalzip, GlobalCountry, GlobalCity);
        });
    }
    else
        apiCall(Globalzip, GlobalCountry, GlobalCity);
});

//for current weather
function displayWeather(response) {
    //clear the div
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();


    if (response.name) {
        var newDiv = $('<div>').attr('class', 'card').css('width', '18rem');
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
    else {
        $('.weatherbody').empty();
        $('.weatherbody').append(message);

    }
}
//for forcast weather
function displayForcastWeather(response) {

    //clear the div
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();
    $('#weather_carousel').empty();

    if (response.list.length !== 0) {
        var carouselDiv;
        var newDiv;
        var innerDiv;
        var divbody;
        var innerElem;
        var pElem1;
        var pElem2;
        var pElem3;
        var pElem4;
        var card_deck;
        var divclass = ['primary', 'secondary', 'success', 'warning', 'info', 'dark', 'danger'];
        var j = 0;
        for (var i = 0; i < response.list.length; i++) {
            if (j === 7) j = 0;
            newDiv = $('<div>').attr('class', 'card text-white bg-' + divclass[j] + ' mb-3');
            j++;

            innerDiv = $('<div>').attr('class', 'card-header').text(moment.unix(response.list[i].dt).format('dddd HH:mm a'));
            divbody = $('<div>').attr('class', 'card-body');
            innerElem = $('<h5>').attr('class', 'card-title').text(response.list[i].weather[0].description);
            divbody.append(innerElem);

            pElem1 = $('<p>').attr('class', 'card-text').text("Humidity: " + response.list[i].main.humidity);
            pElem2 = $('<p>').attr('class', 'card-text').text("Temperature: " + response.list[i].main.temp);
            pElem3 = $('<p>').attr('class', 'card-text').text("Max temp: " + response.list[i].main.temp_max);
            pElem4 = $('<p>').attr('class', 'card-text').text("Min temp: " + response.list[i].main.temp_min);


            divbody.append(pElem1, pElem2, pElem3, pElem4);
            innerDiv.append(divbody);
            newDiv.append(innerDiv);
            if (i === 0)
                carouselDiv = $('<div>').attr('class', 'carousel-item active');
            else
                carouselDiv = $('<div>').attr('class', 'carousel-item');
            card_deck = $('<div>').attr('class', 'card-deck');
            carouselDiv.append(card_deck);

            card_deck.append(newDiv);
            $('#weather_carousel').append(carouselDiv);
        }
    }
    else {
        $('.weatherbody').empty();
        $('.weatherbody').append(message);
    }
}

