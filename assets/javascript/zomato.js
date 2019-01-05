//Function to call Yelp API and ruturn data
function getZomato(city) {
    
    //API Info
    var apiKey = '3eb53b3f118fbce4d5ae9dd7555849b3';
    var queryURL = 'https://developers.zomato.com/api/v2.1/search?entity_type=city&q='+city+'&count=10&radius=5000';

    // curl -X GET --header "Accept: application/json" --header "user-key: 3eb53b3f118fbce4d5ae9dd7555849b3" "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=New%20York&count=10&radius=5000"
   
    //Make AJAX call using query URL and api key for data based on the location
    $.ajax({

        url: queryURL,
        headers: {
            'Accept':'application/json',
            'user-key':apiKey
        },
        method: "GET"

    }).then(function (response) {

        //Test console log the response
        console.log(response);

    });

} //End 


//Function to display Yelp API data
function displayZomato() {
}  //End



//Main function
function main1() {

    //Create database reference variable
    var db = firebase.database();

    //On click function for the Zomato image
    $(".zomato-img").click(function(){

        //Test console.log
        console.log("click on Zomato image");

        //Add image border to Zomato icon 
        $(".zomato-img").css("border", "3px solid gray");

        //Clear image border from the other icons
        $(".news-img").css("border", "none");
        $(".weather-img").css("border", "none");
        $(".attraction-img").css("border", "none");

        //If no global variable defined yet, use last record in database
        if (!GlobalCity) {

            //Query database for the last record to get values
            db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {   

                //initialise global variable
                GlobalCity = snapshot.val().destCity;
                GlobalCountry = snapshot.val().destCountry;
                Globalzip = snapshot.val().destZip;

            })
        }
            
        //using global variables to call yelp API
        getZomato(GlobalCity);

        //Call function to display the yelp data
        displayZomato();
          
      });

}  //End


//Document Ready Function
$(document).ready(function() {
    main1();
}) //End


