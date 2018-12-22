/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.yelp.com/v3/businesses/search";
  
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "api-key": "qkiwKkYmv10UT1fwA2ZGoaYVauMs6mFXxyl8Zthll9R6ZENpyNnFdmmqOte0ZU6zm8ptFb6VXrS36PBfz4O8ZPRUZjsIsF1Tl2jduaXWcLolF5zsoO6cDrzcPWIeXHYx" };
    
    queryParams.q = $("#search-city")
    .val()
    .trim();