//comment about packages
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var request = require('request');
var fs = require("fs");

require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var caseStatement = process.argv[2];
var searchTerm = process.argv[3];

//===================================================
//node liri.js my-tweets
//create a function to retrieve and display tweets
var getTweets = function (tweets) {
    var params = { WastakenJared: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++)
                console.log(tweets[i].text);
        } else if (error) {
            console.log("There was an error. Try again.");
        }
    });
}
//===================================================
    

//===================================================
//node liri.js spotify-this-song '<song name here>'
var getSong = function (searchTerm) {
    //create a function to retrieve song and display: artist, song name, preview link, album
    spotify.search({ type: 'track', query: searchTerm }, function (error, data) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Title: " + data.tracks.items[0].name);
        console.log("Preview link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);    
    })
};
//===================================================


//===================================================
//node liri.js movie-this '<movie name here>'
var getMovie = function (movieName) {
    // if statement if movie name is empty string pass default (mr nobody to movieName)
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=dd60cac0";

    //function to retrieve movie data and display: title, year, IMDB rating, Rotten Tomatoes rating,  country, language, plot, actors
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = (JSON.parse(body));
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        }
    });
}
//===================================================


//===================================================
//node liri.js do-what-it-says 
//us the fs package
//run spotify-this-song for "i want it that way" in random.txt
function getRandom() {
fs.readFile("random.txt", "utf8", function(error, data){
    var dataTxt = data.split(",");
    getSong(dataTxt[1]);
});
}
//===================================================


//===================================================
var pullData = function (caseStatement, searchTerm) {
    if (caseStatement === "movie-this") {
        if (searchTerm){
            getMovie(searchTerm)
        } else {
            getMovie("Mr. Nobody")
        }
        
    } else if (caseStatement === "spotify-this-song") {
        if (searchTerm){
            getSong(searchTerm)
        } else {
            getSong("Ace of Base")
        }
    } else if (caseStatement === "my-tweets") {
        getTweets()
    } else if (caseStatement === "do-what-it-says") {
        getRandom()
    }
};
pullData(process.argv[2], process.argv[3]);
//===================================================

