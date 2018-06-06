require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var request = require('request');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



// spotify
//   .search({ type: 'track', query: 'Search query' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });


//node liri.js my-tweets

//create a function to retrieve and display tweets


//node liri.js spotify-this-song '<song name here>'

//create a function to retrieve song and display: artist, song name, preview link, album
//make a default to display the song "The Sign" by Ace of Base
var movieName = "";
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=dd60cac0";
//node liri.js movie-this '<movie name here>'
request(queryUrl, function(error, response, body){
    if(!error && response.statusCode === 200){
        var body = (JSON.parse(body));
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMDB Rating: " + body.imdbRating);
        console.log("Rotten Tomatoes Rating: " + body.tomatoesRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
    
    } else {
        //default Mr. Nobody
    }

});
//function to retrieve movie data and display: title, year, IMDB rating, Rotten Tomatoes rating,  country, language, plot, actors
//make a default to display the movie "Mr. Nobody"


//node liri.js do-what-it-says 
//us the fs package
//run spotify-this0song for "i want it that way" in random.txt