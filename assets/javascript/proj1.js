//Current Project1 Data Using Firebase

//Copied Firebase Config Inforation
var config = {
    apiKey: "AIzaSyDZk2G8b4OOiN3rW0wDALk0ITxY2UdL0PY",
    authDomain: "teamwinnersproject1.firebaseapp.com",
    databaseURL: "https://teamwinnersproject1.firebaseio.com",
    projectId: "teamwinnersproject1",
    storageBucket: "teamwinnersproject1.appspot.com",
    messagingSenderId: "991653674785"
};

//Initialize Firebase Appliction
firebase.initializeApp(config);

//Create database reference variable
var db = firebase.database();

//Global Variables declaration for All APIs
var GlobalCountry;
var GlobalCity;
var Globalzip;
var message = "No Macthing Results Found";

//Validate.js constraints
var constraints = {
    destCity: {
        presence: {
            allowEmpty: false,
            message: "Destination city is not valid"
        },
        length: {
            minimum: 2,
            message: "Destination city is not valid"
        }
    },
    destZip: {
        presence: {
            allowEmpty: false,
            message: "Destination zip code not valid"
        },
        length: {
            minimum: 2,
            message: "Destination zip code not valid"
        }
    },
    destCountry: {
        presence: {
            allowEmpty: false,
            message: "Destination country not valid"
        },
        length: {
            minimum: 2,
            message: "Destination country not valid"
        }
    }
} //End


//Function to show error modal if input validation fails
function showModal(message) {

    // Show the modal and update modal text
    var modal = $("#myModal").css('display', 'block');
    $('.modal-text').text(message);

    // Get the <span> element that closes the modal
    var span = $(".close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        $("#myModal").css('display', 'none');
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            $("#myModal").css('display', 'none');
        }
    }
} //End 

//Function to get recent destinations
function getRecentDestinations() {

    //Clear current destination details
    $("#destination-details").empty();

    //Get last 5 destinations from the database
    db.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {

        // Create new row and append city,zip and country code
        var row = $("<tr>");
       
        row.append(
            $("<td>").attr('class', 'table-warning table-row').text(snapshot.val().destCity),
            $("<td>").attr('class', 'table-info table-row').text(snapshot.val().destZip),
            $("<td>").attr('class', 'table-active table-row').text(snapshot.val().destCountry)
        );

        //Append row record to destinations table
        $("#destination-details").append(row);
        
        //Add border to last row just added to the table
        $("tr").css('border','none');
        $("tr:last").css('border','3px solid gray');

    });

} //End


//Main function
function main() {

    //Get database info for last 5 destinations and display in table
    getRecentDestinations();


    //On click function for when user clicks on a previous destination in the table
    $("#destination-details").on('click', 'tr', function () {
        $("#card12").hide();

        //Add border to clicked row in destinations table
        $("tr").css('border', 'none');
        $(this).css('border', '3px solid gray');

        var rowData = $(this).children('td').map(function () {
            return $(this).text();
        }).get();

        console.log(rowData);

        //initialize global varilables on destination table row click
        GlobalCity = rowData[0];
        Globalzip = rowData[1];
        GlobalCountry = rowData[2];

        //Add image border to News icon 
        $(".news-img").css("border", "3px solid grey");

        //Clear image border from other icons
        $(".weather-img").css("border", "none");
        $(".attraction-img").css("border", "none");
        $(".yelp-img").css("border", "none");
        $(".zomato-img").css("border", "none");

        //call newsAPI on destination row click with global variables;
        functionCallAPI(GlobalCountry, GlobalCity, Globalzip);
    });


    //On click funtion for search button
    $(".btn-secondary").click(function () {

        //Destination entered by user
        var input = $(".input-destination").val().trim();

        //If destination input has been entered
        if (!validate.isEmpty(input)) {

            //Split it into an array
            var destArray = input.split(",");
            console.log(destArray);

            //Validate array 
            var destCity = destArray[0];
            var destZip = destArray[1];
            var destCountry = destArray[2];


            var err = validate({ destCity, destZip, destCountry }, constraints);

            console.log(err);

            //If there is not an input data error
            if (!err) {

                //Send data to the firebase database 
                db.ref().push({
                    destCity: destCity,
                    destZip: destZip,
                    destCountry: destCountry,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP

                });

                //initialize global variables
                GlobalCountry = destCountry;
                GlobalCity = destCity;
                Globalzip = destZip;

                //load news feeds from newsAPI on button click
                //using global variables                         
                functionCallAPI(GlobalCountry, GlobalCity, Globalzip);

                //Clear input field
                $(".input-destination").val("");

                //Get database info for last 5 destinations and display in table
                getRecentDestinations();

                //Add image border to News icon 
                $(".news-img").css("border", "3px solid grey");

                //Clear image border from other icons
                $(".weather-img").css("border", "none");
                $(".attraction-img").css("border", "none");
                $(".yelp-img").css("border", "none");

            } else {

                //Input is entered but not correctly
                showModal('Destination input is not valid. Please enter "city,zip,country" separated by commas. If no zip code is applicable, just enter 00000.');

            }

        } else {

            //Input is not entered, prompt to enter input
            showModal('Please enter the destination city, zip code and country code! Or click on a previous destination.');

        }

    }); //End of click function        

} //End 

//Document Ready Function
$(document).ready(function () {
    main();

}); //End 
