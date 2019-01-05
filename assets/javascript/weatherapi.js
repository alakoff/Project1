$(document).ready(function(){
   
   
   function apiCall(zip,country){
    // var zip = zip;
    // var country= country; 
    var url= "https://api.openweathermap.org/data/2.5/weather?zip="+zip+","+country+"&units=imperial&appid=ee0fc7e4084dd72152033db8d2dac3d0";
    // console.log(url);
        $.ajax({
        url: url,
        method: "GET"
    }).then(function(response){
       
       console.log("-----------------")
        console.log(response);
          
        // showing info on the html
          if ($(".weather-img").click) {
            $(".news-card").hide();
            $(".social-card").hide();
            $("#weather").show();
            $("#city").text(response.name);
            $("#country").text(response.sys.country); 
            $("#max").text(response.main.temp_max); 
            $("#min").text(response.main.temp_min);   
            $("#humidity").text(response.main.humidity);
            $("#description").text(response.weather[0].description);    
        }
        else if($(".news-img").click){
            $("#weather").hide();
            $(".news-card").show();
            $(".social-card").hide();
        }

    });
};
 
    var database = firebase.database();
    //  event for when a new object is added to the database
    
    
      $(".weather-img").on("click", function(){
        
        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // putting info in variables
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

