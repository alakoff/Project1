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
} //End of validation constraints


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
} //End show modal funtion

//Main function
function main() {

    //Get database info for last 5 destinations and display in table

    //Clear current destination details
    $("#destination-details").empty();


    //Get last 5 destinations from the database
    db.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {


        // Create new row and append city,zip and country code
        var row = $("<tr>").append(
            $("<td>").text(snapshot.val().destCity),
            $("<td>").text(snapshot.val().destZip),
            $("<td>").text(snapshot.val().destCountry)
        );

        //Append row record to destinations table
        $("#destination-details").append(row);

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


            var err = validate({destCity,destZip,destCountry}, constraints);

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

                 //load news feeds from newsAPI on button click
                 db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

                    functionCallAPI(snapshot.val().destCountry,snapshot.val().destCity);
                });


                //Get database info for last 5 destinations and display in table

                //Clear current destination details
                $("#destination-details").empty();


                //Get last 5 destinations from the database
                db.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {


                    // Create new row and append city,zip and country code
                    var row = $("<tr>").append(
                        $("<td>").text(snapshot.val().destCity),
                        $("<td>").text(snapshot.val().destZip),
                        $("<td>").text(snapshot.val().destCountry)
                    )

                    //Append row record to destinations table
                    $("#destination-details").append(row);

                });
               
                //Clear current destination input
                $(".input-destination").val('');

            } 

        } else {

            //Input is not entered, prompt to enter input
            showModal('Please enter you destination city, zip code and country code!');

        }

    }); //End of click function        

} //End of main function

//Document Ready Function
$(document).ready(function () {
    main();

}); //End of document ready function
