//use the 'location' string parameter to search
//add location parameter to variable 'queryURL'
//console.log the url
//console.log results

// var queryURL = "https://api.yelp.com/v3/businesses/search" + "?location=Richmond";



// $.ajax({
//     url: queryURL,
//     headers: {
//      'Authorization':'Bearer qkiwKkYmv10UT1fwA2ZGoaYVauMs6mFXxyl8Zthll9R6ZENpyNnFdmmqOte0ZU6zm8ptFb6VXrS36PBfz4O8ZPRUZjsIsF1Tl2jduaXWcLolF5zsoO6cDrzcPWIeXHYx',
//  },
//     method: 'GET',
//     dataType: 'json',
// });

// console.log(queryURL);

//  'use strict';

var apiKey = qkiwKkYmv10UT1fwA2ZGoaYVauMs6mFXxyl8Zthll9R6ZENpyNnFdmmqOte0ZU6zm8ptFb6VXrS36PBfz4O8ZPRUZjsIsF1Tl2jduaXWcLolF5zsoO6cDrzcPWIeXHYx;

const yelp = require('yelp-fusion');

const client = yelp.client(apiKey);

$("#yelpClick").on("click", function(){
  console.log("clicked")
client.search({
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});
});