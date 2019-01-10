//This file is used for Zomato API processing

//Function to get Zomato city id git
function getZomatoData(url,key) {

    //Make AJAX call using query URL and api key for destination city id
    $.ajax({

        url: url,
        headers: {
            'user-key':key
        },
        method: "GET"

    }).then(function (res) {

        //If function returns a valid city id 
        if (res.location_suggestions[0].city_id) {

            var cityID = res.location_suggestions[0].city_id;
            
            //Restuarant query string using city id 
            var queryRest = 'https://developers.zomato.com/api/v2.1/search?&entity_id='+cityID+'&entity_type=city&count=20&radius=16000';

            //Call function to get the list of restaurants based on the city id
            getRestaurants(queryRest,key);

        }

    })

}  //End



//Function to get Zomato restaurants
function getRestaurants(url,key) {

    //Make AJAX call using query URL and api key for restaurants
    $.ajax({

        url: url,
        headers: {
            'user-key':key
        },
        method: "GET"

    }).then(function (res) {

        //Call fuction to display restuarant data returned
        displayZomato(res);
 
    })

}  //End


//Function for Zomato
function zomato(city) {
    
    //API Info
    var apiKey = '3eb53b3f118fbce4d5ae9dd7555849b3';
    
    //City ID query string to get city id needed for restaurant query
    var queryCity = 'https://developers.zomato.com/api/v2.1/locations?query='+city+'&count=1';

    //Call function to get Zomato restaurant data
    getZomatoData(queryCity,apiKey);

} //End 


//Function to display Zomato API data
function displayZomato(res) {

    //Declare variables used for display
    var newDiv;
    var image;
    var newbody;
    var otherElem1;
    var otherElem2;
    var otherElem3;
    var otherElem4;
    var otherElem5;

    //Clear the other divs
    $('#first').empty();
    $('#second').empty();
    $('#third').empty();
    $('#fourth').empty();
    $('#ticketmaster').empty();
    $('.weatherbody').empty();
    $('.zomato-body').empty();



    //Get and format 20 restaurants from Zomato API

    //if response array length is greater than zero
    if (parseInt(res.results_found)>0) {

        //Loop through the first 20 results
        for (i = 0; i < 20; i++) {

            newDiv = $('<div>').attr('class', 'card');
            newbody = $('<div>').attr('class', 'card-body');
            otherElem1 = $('<h5>').text(res.restaurants[i].restaurant.name).attr('class', 'card-title');
            otherElem2 = $('<p>').text('Cuisine: '+res.restaurants[i].restaurant.cuisines).attr('class', 'card-text');
            otherElem3 = $('<p>').text('Pricing: '+res.restaurants[i].restaurant.currency).attr('class', 'card-text');
            otherElem4 = $('<p>').text('Rating: '+res.restaurants[i].restaurant.user_rating.aggregate_rating).attr('class', 'card-text');
            otherElem5 = $('<a>').text('Menu').attr('href', res.restaurants[i].restaurant.menu_url).attr('class', 'btn btn-primary').attr('target', '_blank');
            newbody.append(otherElem1, otherElem2, otherElem3, otherElem4, otherElem5);
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

        //Display "No Results" message
        $('.zomato-body').append(message);

    }

}  //End 



//Main function
function main1() {

    //Create database reference variable
    var db = firebase.database();

    //On click function for the Zomato image
    $(".zomato-img").click(function(){

        //Add image border to Zomato icon 
        $(".zomato-img").css("border", "3px solid gray");

        //Clear image border from the other icons
        $(".news-img").css("border", "none");
        $(".weather-img").css("border", "none");
        $(".attraction-img").css("border", "none");
        $(".yelp-img").css("border", "none");


        //If no global city variable defined yet, use last record in database
        if (!GlobalCity) {

            //Query database for the last record to get values
            db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {   

                //initialise global variable
                GlobalCity = snapshot.val().destCity;
                GlobalCountry = snapshot.val().destCountry;
                Globalzip = snapshot.val().destZip;

            })
        }
            
        //using global city variable to start Zomato API process
        zomato(GlobalCity);
          
      });

}  //End


//Document Ready Function
$(document).ready(function() {
    main1();
}) //End


