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

//On destination click, add destination to firebase database and then add to "Destinations"
//section on the html page

console.log("hi");

function main() {

    $(".btn-secondary").click(function () {
        console.log("after click");

        var input = $(".input-destination").val().trim();
        console.log(input);
        var destArray = input.split(",");
        console.log(destArray);
        var destCity = destArray[0];
        var destZip = destArray[1];
        var destCountry = destArray[2];

        //Send data to the database
        db.ref().push({
            destCity: destCity,
            destZip: destZip,
            destCountry: destCountry,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        }) 

        //Get database info for last 5 destinations and display in table

        //Clear current destination details
        $("#destination-details").empty();

        //Get last 5 destinations from the database
        db.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
            
            // Change the HTML to reflect
            var row = $("<tr>").append(
            $("<td>").text(snapshot.val().destCity),
            $("<td>").text(snapshot.val().destZip),
            $("<td>").text(snapshot.val().destCountry)
        )

            //Append row record to destinations table
            $("#destination-details").append(row);

         });

    }) //End of on click function

}


//Document Ready Function
$(document).ready(function() {
    main();
})