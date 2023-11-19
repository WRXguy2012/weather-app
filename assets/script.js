var key = '65356c91893745839f8235534231811';
var search = document.getElementById('search');

// function to call current conditions api
var weatherAPI = function (city) {
    var requestURL = "http://api.weatherapi.com/v1/current.json?&key=" + key + "&q=" + city;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res);
            var location = document.getElementById("location");
            var state= document.getElementById("state");
            var condition = document.getElementById("condition");
            var imgElem = document.getElementById("img");
            var imgPath = res.current.condition.icon;
            var temp = document.getElementById("temp");
            var feels = document.getElementById("feels");
            var humid = document.getElementById("humid");
            var windDir = document.getElementById("windDir");
            var windSpeed = document.getElementById("windSpeed");
            location.textContent = res.location.name;
            state.textContent = res.location.region;
            condition.textContent = res.current.condition.text;
            imgElem.src = "." + imgPath;
            temp.textContent = res.current.temp_f;
            feels.textContent = res.current.feelslike_f;
            humid.textContent = res.current.humidity;
            windDir.textContent = res.current.wind_dir;
            windSpeed.textContent = res.current.wind_mph;

        });
}

// function to call forecast api
var forecastAPI = function (city) {
    var forecastURL = "http://api.weatherapi.com/v1/forecast.json?&key=" + key + "&q=" + city + "&days=3";
    fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (res) {
        console.log(res);
    });
}

// hide element until button is pressed
var showStats = function () {
    document.getElementById('stats').style.display = "block";
}

// button event
search.addEventListener("submit", function(event) {
    event.preventDefault();
    var userInput = document.querySelector('#searchInput').value;
    console.log(userInput);
    weatherAPI(userInput);
    forecastAPI(userInput);
    showStats();

});