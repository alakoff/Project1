//Current Train Schedules Data Using Firebase

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

$(".btn-secondary").click(function () {

    var input = $(".destination").val().trim();
    var destArray = input.split(",");
    var destCity = destArray[0];
    var destZip = destArray[1];
    var destCountry = destArray[2];

    //Send data to the database
    db.ref().push({
        destDate: firebase.database.ServerValue.TIMESTAMP,
        destCity: destCity,
        destZip: destZip,
        destCountry: destCountry

    }) 



}) //End of on click function
