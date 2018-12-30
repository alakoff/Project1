$(document).ready(function(){
   
   
   function apiCall(zip,country){
    // var zip = zip;
    // var country= country; 
    var url= "http://api.openweathermap.org/data/2.5/weather?zip="+zip+","+country+"&units=imperial&appid=ee0fc7e4084dd72152033db8d2dac3d0";
    // console.log(url);
        $.ajax({
        url: url,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
};
    // initializing database
    var config = {
        apiKey: "AIzaSyDZk2G8b4OOiN3rW0wDALk0ITxY2UdL0PY",
        authDomain: "teamwinnersproject1.firebaseapp.com",
        databaseURL: "https://teamwinnersproject1.firebaseio.com",
        projectId: "teamwinnersproject1",
        storageBucket: "teamwinnersproject1.appspot.com",
        messagingSenderId: "991653674785"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
    //  event for when a new object is added to the database
    
    
      $(".weather-img").on("click", function(){
        
        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        var city = snapshot.val().destCity;
        var country = snapshot.val().destCountry;
        var zip = snapshot.val().destZip;

        console.log(city);
        console.log(country);
        console.log(zip);
          
        apiCall(zip,country);
      });
      });

});

