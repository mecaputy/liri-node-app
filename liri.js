//comment about packages
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var request = require('request');
var fs = require("fs");

require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(Spotify);

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
    spotify.search({ type: 'track', query: searchTerm }, function (error, response) {
        if (!error) {
            for (var i = 0; i < response.length; i++)
                console.log(response[i].text);
        } else if (error) {
            console.log("There was an error. Try again.");
        }
            //     var body = (JSON.parse(body));
            //     console.log("Artist: " + body.Title);
            //     console.log("Title: " + body.Year);
            //     console.log("Preview: " + body.imdbRating);
            //     console.log("Album: " + body.Ratings[1].Value);//get correct items for spotify
            // } else{
            //make a default to display the song "The Sign" by Ace of Base
        
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

        } else if (error) {
            // var defaultMovie = (); Mr
            //make a default to display the movie "Mr. Nobody"
        }

    });
}
//===================================================

//===================================================
//node liri.js do-what-it-says 
//us the fs package
//run spotify-this0song for "i want it that way" in random.txt
// var getRandom = function() {
//     if (caseStatement === 'do-what-it-says'){
//         getSong('./random.text')
//     }
// }
//===================================================

//===================================================
var pullData = function (caseStatement, searchTerm) {
    if (caseStatement === "movie-this") {
        getMovie(searchTerm)
    } else if (caseStatement === "spotify-this-song") {
        getSong(searchTerm)
    } else if (caseStatement === "my-tweets") {
        getTweets()
    } else if (caseStatement === "do-what-it-says") {
        getSong()
    }
};
pullData(process.argv[2], process.argv[3]);
//===================================================

// spotifyUrl = "https://api.spotify.com/?t=" + songName + spotify;