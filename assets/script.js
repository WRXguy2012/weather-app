var key = '65356c91893745839f8235534231811';
var search = document.getElementById('search');
var homeSearch = document.getElementById('homeSearch');
var smallSearch = document.getElementById('smallSearch');
var locationBtn = document.getElementById('locationBtn');

//function to show dropdowns
function hourly(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

//function to call map API
    maptilersdk.config.apiKey = 'biEyTcjDrAYVujwnVhhS';
    const map = (window.map = new maptilersdk.Map({
      container: 'map', 
      style: maptilersdk.MapStyle.BACKDROP,  
      zoom: 1,
      center: [-15.5, 15.2],
      hash: true,
    }));

    const timeTextDiv = document.getElementById("time-text");
    const pointerDataDiv = document.getElementById("pointer-data");
    let pointerLngLat = null;

    const weatherLayer = new maptilerweather.RadarLayer({
      opacity: 0.8,
    });

    // Called when the animation is progressing
    weatherLayer.on("tick", event => {
      refreshTime();
      updatePointerValue(pointerLngLat);
    });

    map.on('load', function () {
      map.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
      map.addLayer(weatherLayer, 'Water');
      weatherLayer.animateByFactor(3600);
    });

    map.on('mouseout', function(evt) {
      if (!evt.originalEvent.relatedTarget) {
        pointerDataDiv.innerText = "";
        pointerLngLat = null;
      }
    });

    // Update the date time display
    function refreshTime() {
      const d = weatherLayer.getAnimationTimeDate();
      timeTextDiv.innerText = d.toString();
    }

    function updatePointerValue(lngLat) {
      if (!lngLat) return;
      pointerLngLat = lngLat;
      const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
      if (!value) {
        pointerDataDiv.innerText = "";
        return;
      }
    }

    map.on('mousemove', (e) => {
      updatePointerValue(e.lngLat);
    });

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
            // var humid = document.getElementById("humid");
            var windDir = document.getElementById("windDir");
            var windSpeed = document.getElementById("windSpeed");
            location.textContent = res.location.name;
            state.textContent = res.location.region;
            condition.textContent = res.current.condition.text;
            imgElem.src = "." + imgPath;
            temp.textContent = res.current.temp_f;
            feels.textContent = res.current.feelslike_f;
            // humid.textContent = res.current.humidity;
            windDir.textContent = res.current.wind_dir;
            windSpeed.textContent = res.current.wind_mph;

        });
}

// function to call forecast api
var forecastAPI = function (city) {
    var forecastURL = "http://api.weatherapi.com/v1/forecast.json?&key=" + key + "&q=" + city + "&days=3&alerts=yes";
    fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (res) {
        console.log(res);
        //todays info
        // var date1 = document.getElementById("date1");
        var img1 = document.getElementById('img1');
        var condition1 = document.getElementById('condition1');
        var minTemp1 = document.getElementById('minTemp1');
        var maxtemp1 = document.getElementById('maxTemp1');
        var rain1 = document.getElementById('rain1');
        var sunrise1 = document.getElementById('sunrise1');
        var sunset1 = document.getElementById("sunset1");
        var uv1 = document.getElementById('uv1');
        var img1Path = res.forecast.forecastday[0].day.condition.icon;
        // date1.textContent = res.forecast.forecastday[0].date;
        img1.src = "." + img1Path;
        condition1.textContent = res.forecast.forecastday[0].day.condition.text;
        minTemp1.textContent = res.forecast.forecastday[0].day.mintemp_f;
        maxtemp1.textContent = res.forecast.forecastday[0].day.maxtemp_f;
        rain1.textContent = res.forecast.forecastday[0].day.daily_chance_of_rain;
        sunrise1.textContent = res.forecast.forecastday[0].astro.sunrise;
        sunset1.textContent = res.forecast.forecastday[0].astro.sunset;
        uv1.textContent = res.forecast.forecastday[0].day.uv;
        //alert info
        var isAlert = res.alerts.alert.length;
        if(isAlert != 0){
            document.getElementById('alertSection').style.display = "block";
        } else {
            console.log("no alerts");
        };

        var alertCount = document.getElementById('alertCount');
        alertCount.textContent = res.alerts.alert.length;

        for(let i = 0; i < isAlert; i++) {
            document.getElementById("alert" + i).style.display = "block";
            document.getElementById("alertMsg" + i).innerHTML = res.alerts.alert[i].headline;
            document.getElementById("alertDesc" + i).innerHTML = res.alerts.alert[i].desc;
            console.log(i);
        }

        // Hourly info
        var currentTime = res.location.localtime_epoch;

        for(let i = 0; i < 24; i++) {
            document.getElementById("hourCondition" + i).innerHTML = res.forecast.forecastday[0].hour[i].condition.text;
            document.getElementById("hourTemp" + i).innerHTML = res.forecast.forecastday[0].hour[i].temp_f;
            document.getElementById("hourWindDir" +i).innerHTML = res.forecast.forecastday[0].hour[i].wind_dir;
            document.getElementById("hourWindSpeed" + i).innerHTML = res.forecast.forecastday[0].hour[i].wind_mph;
            var times = [res.forecast.forecastday[0].hour[i].time_epoch];
            var imgs = [res.forecast.forecastday[0].hour[i].condition.icon];
            var index = 1;
            document.getElementById("hourImg" + i).src = "." + imgs[index - 1];
            if(times[index - 1] < currentTime) {
                document.getElementById("hour" + i).style.display = "none";
            }
        }
        

        //tomorrows info
        var date2 = document.getElementById("date2");
        var img2 = document.getElementById('img2');
        var condition2 = document.getElementById('condition2');
        var minTemp2 = document.getElementById('minTemp2');
        var maxtemp2 = document.getElementById('maxTemp2');
        var rain2 = document.getElementById('rain2');
        var sunrise2 = document.getElementById('sunrise2');
        var sunset2 = document.getElementById("sunset2");
        var img2Path = res.forecast.forecastday[1].day.condition.icon;
        date2.textContent = res.forecast.forecastday[1].date;
        img2.src = "." + img2Path;
        condition2.textcontent = res.forecast.forecastday[1].day.condition.text;
        minTemp2.textContent = res.forecast.forecastday[1].day.mintemp_f;
        maxtemp2.textContent = res.forecast.forecastday[1].day.maxtemp_f;
        rain2.textContent = res.forecast.forecastday[1].day.daily_chance_of_rain;
        sunrise2.textContent = res.forecast.forecastday[1].astro.sunrise;
        sunset2.textContent = res.forecast.forecastday[1].astro.sunset;
        // day 3 info
        var date3 = document.getElementById("date3");
        var img3 = document.getElementById('img3');
        var condition3 = document.getElementById('condition3');
        var minTemp3 = document.getElementById('minTemp3');
        var maxtemp3 = document.getElementById('maxTemp3');
        var rain3 = document.getElementById('rain3');
        var sunrise3 = document.getElementById('sunrise3');
        var sunset3 = document.getElementById("sunset3");
        var img3Path = res.forecast.forecastday[2].day.condition.icon;
        date3.textContent = res.forecast.forecastday[2].date;
        img3.src = "." + img3Path;
        condition3.textcontent = res.forecast.forecastday[2].day.condition.text;
        minTemp3.textContent = res.forecast.forecastday[2].day.mintemp_f;
        maxtemp3.textContent = res.forecast.forecastday[2].day.maxtemp_f;
        rain3.textContent = res.forecast.forecastday[2].day.daily_chance_of_rain;
        sunrise3.textContent = res.forecast.forecastday[2].astro.sunrise;
        sunset3.textContent = res.forecast.forecastday[2].astro.sunset;
    });
}

// hide element until button is pressed
var showStats = function () {
    document.getElementById('stats').style.display = "block";
    document.getElementById('forecast').style.display = "block";
    document.getElementById('today').style.display = "block";
    document.getElementById('mapSection').style.display = "block";
    document.getElementById('header').style.display = "block";
    document.getElementById('headerSmall').style.display = "block";
    document.getElementById('home').style.display = "none";
}

// button events
search.addEventListener("submit", function(event) {
    event.preventDefault();
    var userInput = document.querySelector('#searchInput').value;
    console.log(userInput);
    weatherAPI(userInput);
    forecastAPI(userInput);
    showStats();

});

homeSearch.addEventListener("submit", function(event) {
    event.preventDefault();
    var userInput = document.querySelector('#homeInput').value;
    console.log(userInput);
    weatherAPI(userInput);
    forecastAPI(userInput);
    showStats();

});

smallSearch.addEventListener("submit", function(event) {
    event.preventDefault();
    var userInput = document.querySelector('#smallInput').value;
    console.log(userInput);
    weatherAPI(userInput);
    forecastAPI(userInput);
    showStats();

});

// get location
var locationSearch = function () {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById('locationError').style.display = "block";
    }
    function showPosition(position) {
        var location = position.coords.latitude + "," + position.coords.longitude;
        console.log(location);
        weatherAPI(location);
        forecastAPI(location);
        showStats();
    }
};