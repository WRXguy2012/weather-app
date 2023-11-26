var key = '65356c91893745839f8235534231811';
var search = document.getElementById('search');

//function to show hourly forecast dropdown
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
    var forecastURL = "http://api.weatherapi.com/v1/forecast.json?&key=" + key + "&q=" + city + "&days=5";
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

        // Hourly info
        var currentTime = res.location.localtime_epoch;

        var hourImg1 = document.getElementById('hourImg1');
        var hourCondition1 = document.getElementById('hourCondition1');
        var hourTemp1 = document.getElementById('hourTemp1');
        var hourWindDir1 = document.getElementById('hourWindDir1');
        var hourWindSpeed1 = document.getElementById('hourWindSpeed1');
        var hourImg1Path = res.forecast.forecastday[0].hour[0].condition.icon;
        hourImg1.src = "." + hourImg1Path;
        hourCondition1.textContent = res.forecast.forecastday[0].hour[0].condition.text;
        hourTemp1.textContent = res.forecast.forecastday[0].hour[0].temp_f;
        hourWindDir1.textContent = res.forecast.forecastday[0].hour[0].wind_dir;
        hourWindSpeed1.textContent = res.forecast.forecastday[0].hour[0].wind_mph;
        var time1 = res.forecast.forecastday[0].hour[0].time_epoch;
        if(time1 < currentTime) {
            document.getElementById('hour1').style.display = "none";
        }

        var hourImg2 = document.getElementById('hourImg2');
        var hourCondition2 = document.getElementById('hourCondition2');
        var hourTemp2 = document.getElementById('hourTemp2');
        var hourWindDir2 = document.getElementById('hourWindDir2');
        var hourWindSpeed2 = document.getElementById('hourWindSpeed2');
        var hourImg2Path = res.forecast.forecastday[0].hour[1].condition.icon;
        hourImg2.src = "." + hourImg2Path;
        hourCondition2.textContent = res.forecast.forecastday[0].hour[1].condition.text;
        hourTemp2.textContent = res.forecast.forecastday[0].hour[1].temp_f;
        hourWindDir2.textContent = res.forecast.forecastday[0].hour[1].wind_dir;
        hourWindSpeed2.textContent = res.forecast.forecastday[0].hour[1].wind_mph;
        var time2 = res.forecast.forecastday[0].hour[1].time_epoch;
        if(time2 < currentTime) {
            document.getElementById('hour2').style.display = "none";
        }

        var hourImg3 = document.getElementById('hourImg3');
        var hourCondition3 = document.getElementById('hourCondition3');
        var hourTemp3 = document.getElementById('hourTemp3');
        var hourWindDir3 = document.getElementById('hourWindDir3');
        var hourWindSpeed3 = document.getElementById('hourWindSpeed3');
        var hourImg3Path = res.forecast.forecastday[0].hour[2].condition.icon;
        hourImg3.src = "." + hourImg3Path;
        hourCondition3.textContent = res.forecast.forecastday[0].hour[2].condition.text;
        hourTemp3.textContent = res.forecast.forecastday[0].hour[2].temp_f;
        hourWindDir3.textContent = res.forecast.forecastday[0].hour[2].wind_dir;
        hourWindSpeed3.textContent = res.forecast.forecastday[0].hour[2].wind_mph;
        var time3 = res.forecast.forecastday[0].hour[2].time_epoch;
        if(time3 < currentTime) {
            document.getElementById('hour3').style.display = "none";
        }

        var hourImg4 = document.getElementById('hourImg4');
        var hourCondition4 = document.getElementById('hourCondition4');
        var hourTemp4 = document.getElementById('hourTemp4');
        var hourWindDir4 = document.getElementById('hourWindDir4');
        var hourWindSpeed4 = document.getElementById('hourWindSpeed4');
        var hourImg4Path = res.forecast.forecastday[0].hour[3].condition.icon;
        hourImg4.src = "." + hourImg4Path;
        hourCondition4.textContent = res.forecast.forecastday[0].hour[3].condition.text;
        hourTemp4.textContent = res.forecast.forecastday[0].hour[3].temp_f;
        hourWindDir4.textContent = res.forecast.forecastday[0].hour[3].wind_dir;
        hourWindSpeed4.textContent = res.forecast.forecastday[0].hour[3].wind_mph;
        var time4 = res.forecast.forecastday[0].hour[3].time_epoch;
        if(time4 < currentTime) {
            document.getElementById('hour4').style.display = "none";
        }

        var hourImg5 = document.getElementById('hourImg5');
        var hourCondition5 = document.getElementById('hourCondition5');
        var hourTemp5 = document.getElementById('hourTemp5');
        var hourWindDir5 = document.getElementById('hourWindDir5');
        var hourWindSpeed5 = document.getElementById('hourWindSpeed5');
        var hourImg5Path = res.forecast.forecastday[0].hour[4].condition.icon;
        hourImg5.src = "." + hourImg5Path;
        hourCondition5.textContent = res.forecast.forecastday[0].hour[4].condition.text;
        hourTemp5.textContent = res.forecast.forecastday[0].hour[4].temp_f;
        hourWindDir5.textContent = res.forecast.forecastday[0].hour[4].wind_dir;
        hourWindSpeed5.textContent = res.forecast.forecastday[0].hour[4].wind_mph;
        var time5 = res.forecast.forecastday[0].hour[4].time_epoch;
        if(time5 < currentTime) {
            document.getElementById('hour5').style.display = "none";
        }

        var hourImg6 = document.getElementById('hourImg6');
        var hourCondition6 = document.getElementById('hourCondition6');
        var hourTemp6 = document.getElementById('hourTemp6');
        var hourWindDir6 = document.getElementById('hourWindDir6');
        var hourWindSpeed6 = document.getElementById('hourWindSpeed6');
        var hourImg6Path = res.forecast.forecastday[0].hour[5].condition.icon;
        hourImg6.src = "." + hourImg6Path;
        hourCondition6.textContent = res.forecast.forecastday[0].hour[5].condition.text;
        hourTemp6.textContent = res.forecast.forecastday[0].hour[5].temp_f;
        hourWindDir6.textContent = res.forecast.forecastday[0].hour[5].wind_dir;
        hourWindSpeed6.textContent = res.forecast.forecastday[0].hour[5].wind_mph;
        var time6 = res.forecast.forecastday[0].hour[5].time_epoch;
        if(time6 < currentTime) {
            document.getElementById('hour6').style.display = "none";
        }

        var hourImg7 = document.getElementById('hourImg7');
        var hourCondition7 = document.getElementById('hourCondition7');
        var hourTemp7 = document.getElementById('hourTemp7');
        var hourWindDir7 = document.getElementById('hourWindDir7');
        var hourWindSpeed7= document.getElementById('hourWindSpeed7');
        var hourImg7Path = res.forecast.forecastday[0].hour[6].condition.icon;
        hourImg7.src = "." + hourImg7Path;
        hourCondition7.textContent = res.forecast.forecastday[0].hour[6].condition.text;
        hourTemp7.textContent = res.forecast.forecastday[0].hour[6].temp_f;
        hourWindDir7.textContent = res.forecast.forecastday[0].hour[6].wind_dir;
        hourWindSpeed7.textContent = res.forecast.forecastday[0].hour[6].wind_mph;
        var time7 = res.forecast.forecastday[0].hour[6].time_epoch;
        if(time7 < currentTime) {
            document.getElementById('hour7').style.display = "none";
        }

        var hourImg8 = document.getElementById('hourImg8');
        var hourCondition8 = document.getElementById('hourCondition8');
        var hourTemp8 = document.getElementById('hourTemp8');
        var hourWindDir8 = document.getElementById('hourWindDir8');
        var hourWindSpeed8 = document.getElementById('hourWindSpeed8');
        var hourImg8Path = res.forecast.forecastday[0].hour[7].condition.icon;
        hourImg8.src = "." + hourImg8Path;
        hourCondition8.textContent = res.forecast.forecastday[0].hour[7].condition.text;
        hourTemp8.textContent = res.forecast.forecastday[0].hour[7].temp_f;
        hourWindDir8.textContent = res.forecast.forecastday[0].hour[7].wind_dir;
        hourWindSpeed8.textContent = res.forecast.forecastday[0].hour[7].wind_mph;
        var time8 = res.forecast.forecastday[0].hour[7].time_epoch;
        if(time8 < currentTime) {
            document.getElementById('hour8').style.display = "none";
        }

        var hourImg9 = document.getElementById('hourImg9');
        var hourCondition9 = document.getElementById('hourCondition9');
        var hourTemp9 = document.getElementById('hourTemp9');
        var hourWindDir9 = document.getElementById('hourWindDir9');
        var hourWindSpeed9 = document.getElementById('hourWindSpeed9');
        var hourImg9Path = res.forecast.forecastday[0].hour[8].condition.icon;
        hourImg9.src = "." + hourImg9Path;
        hourCondition9.textContent = res.forecast.forecastday[0].hour[8].condition.text;
        hourTemp9.textContent = res.forecast.forecastday[0].hour[8].temp_f;
        hourWindDir9.textContent = res.forecast.forecastday[0].hour[8].wind_dir;
        hourWindSpeed9.textContent = res.forecast.forecastday[0].hour[8].wind_mph;
        var time9 = res.forecast.forecastday[0].hour[8].time_epoch;
        if(time9 < currentTime) {
            document.getElementById('hour9').style.display = "none";
        }

        var hourImg10 = document.getElementById('hourImg10');
        var hourCondition10 = document.getElementById('hourCondition10');
        var hourTemp10 = document.getElementById('hourTemp10');
        var hourWindDir10 = document.getElementById('hourWindDir10');
        var hourWindSpeed10 = document.getElementById('hourWindSpeed10');
        var hourImg10Path = res.forecast.forecastday[0].hour[9].condition.icon;
        hourImg10.src = "." + hourImg10Path;
        hourCondition10.textContent = res.forecast.forecastday[0].hour[9].condition.text;
        hourTemp10.textContent = res.forecast.forecastday[0].hour[9].temp_f;
        hourWindDir10.textContent = res.forecast.forecastday[0].hour[9].wind_dir;
        hourWindSpeed10.textContent = res.forecast.forecastday[0].hour[9].wind_mph;
        var time10 = res.forecast.forecastday[0].hour[9].time_epoch;
        if(time10 < currentTime) {
            document.getElementById('hour10').style.display = "none";
        }

        var hourImg11 = document.getElementById('hourImg11');
        var hourCondition11 = document.getElementById('hourCondition11');
        var hourTemp11 = document.getElementById('hourTemp11');
        var hourWindDir11 = document.getElementById('hourWindDir11');
        var hourWindSpeed11 = document.getElementById('hourWindSpeed11');
        var hourImg11Path = res.forecast.forecastday[0].hour[10].condition.icon;
        hourImg11.src = "." + hourImg11Path;
        hourCondition11.textContent = res.forecast.forecastday[0].hour[10].condition.text;
        hourTemp11.textContent = res.forecast.forecastday[0].hour[10].temp_f;
        hourWindDir11.textContent = res.forecast.forecastday[0].hour[10].wind_dir;
        hourWindSpeed11.textContent = res.forecast.forecastday[0].hour[10].wind_mph;
        var time11 = res.forecast.forecastday[0].hour[10].time_epoch;
        if(time11 < currentTime) {
            document.getElementById('hour11').style.display = "none";
        }

        var hourImg12 = document.getElementById('hourImg12');
        var hourCondition12 = document.getElementById('hourCondition12');
        var hourTemp12 = document.getElementById('hourTemp12');
        var hourWindDir12 = document.getElementById('hourWindDir12');
        var hourWindSpeed12 = document.getElementById('hourWindSpeed12');
        var hourImg12Path = res.forecast.forecastday[0].hour[11].condition.icon;
        hourImg12.src = "." + hourImg12Path;
        hourCondition12.textContent = res.forecast.forecastday[0].hour[11].condition.text;
        hourTemp12.textContent = res.forecast.forecastday[0].hour[11].temp_f;
        hourWindDir12.textContent = res.forecast.forecastday[0].hour[11].wind_dir;
        hourWindSpeed12.textContent = res.forecast.forecastday[0].hour[11].wind_mph;
        var time12 = res.forecast.forecastday[0].hour[11].time_epoch;
        if(time12 < currentTime) {
            document.getElementById('hour12').style.display = "none";
        }

        var hourImg13 = document.getElementById('hourImg13');
        var hourCondition13 = document.getElementById('hourCondition13');
        var hourTemp13 = document.getElementById('hourTemp13');
        var hourWindDir13 = document.getElementById('hourWindDir13');
        var hourWindSpeed13 = document.getElementById('hourWindSpeed13');
        var hourImg13Path = res.forecast.forecastday[0].hour[12].condition.icon;
        hourImg13.src = "." + hourImg13Path;
        hourCondition13.textContent = res.forecast.forecastday[0].hour[12].condition.text;
        hourTemp13.textContent = res.forecast.forecastday[0].hour[12].temp_f;
        hourWindDir13.textContent = res.forecast.forecastday[0].hour[12].wind_dir;
        hourWindSpeed13.textContent = res.forecast.forecastday[0].hour[12].wind_mph;
        var time13 = res.forecast.forecastday[0].hour[12].time_epoch;
        if(time13 < currentTime) {
            document.getElementById('hour13').style.display = "none";
        }

        var hourImg14 = document.getElementById('hourImg14');
        var hourCondition14 = document.getElementById('hourCondition14');
        var hourTemp14 = document.getElementById('hourTemp14');
        var hourWindDir14 = document.getElementById('hourWindDir14');
        var hourWindSpeed14 = document.getElementById('hourWindSpeed14');
        var hourImg14Path = res.forecast.forecastday[0].hour[13].condition.icon;
        hourImg14.src = "." + hourImg14Path;
        hourCondition14.textContent = res.forecast.forecastday[0].hour[13].condition.text;
        hourTemp14.textContent = res.forecast.forecastday[0].hour[13].temp_f;
        hourWindDir14.textContent = res.forecast.forecastday[0].hour[13].wind_dir;
        hourWindSpeed14.textContent = res.forecast.forecastday[0].hour[13].wind_mph;
        var time14 = res.forecast.forecastday[0].hour[13].time_epoch;
        if(time14 < currentTime) {
            document.getElementById('hour14').style.display = "none";
        }

        var hourImg15 = document.getElementById('hourImg15');
        var hourCondition15 = document.getElementById('hourCondition15');
        var hourTemp15 = document.getElementById('hourTemp15');
        var hourWindDir15 = document.getElementById('hourWindDir15');
        var hourWindSpeed15 = document.getElementById('hourWindSpeed15');
        var hourImg15Path = res.forecast.forecastday[0].hour[14].condition.icon;
        hourImg15.src = "." + hourImg15Path;
        hourCondition15.textContent = res.forecast.forecastday[0].hour[14].condition.text;
        hourTemp15.textContent = res.forecast.forecastday[0].hour[14].temp_f;
        hourWindDir15.textContent = res.forecast.forecastday[0].hour[14].wind_dir;
        hourWindSpeed15.textContent = res.forecast.forecastday[0].hour[14].wind_mph;
        var time15 = res.forecast.forecastday[0].hour[14].time_epoch;
        if(time15 < currentTime) {
            document.getElementById('hour15').style.display = "none";
        }

        var hourImg16 = document.getElementById('hourImg16');
        var hourCondition16 = document.getElementById('hourCondition16');
        var hourTemp16 = document.getElementById('hourTemp16');
        var hourWindDir16 = document.getElementById('hourWindDir16');
        var hourWindSpeed16 = document.getElementById('hourWindSpeed16');
        var hourImg16Path = res.forecast.forecastday[0].hour[15].condition.icon;
        hourImg16.src = "." + hourImg16Path;
        hourCondition16.textContent = res.forecast.forecastday[0].hour[15].condition.text;
        hourTemp16.textContent = res.forecast.forecastday[0].hour[15].temp_f;
        hourWindDir16.textContent = res.forecast.forecastday[0].hour[15].wind_dir;
        hourWindSpeed16.textContent = res.forecast.forecastday[0].hour[15].wind_mph;
        var time16 = res.forecast.forecastday[0].hour[15].time_epoch;
        if(time16 < currentTime) {
            document.getElementById('hour16').style.display = "none";
        }

        var hourImg17 = document.getElementById('hourImg17');
        var hourCondition17 = document.getElementById('hourCondition17');
        var hourTemp17 = document.getElementById('hourTemp17');
        var hourWindDir17 = document.getElementById('hourWindDir17');
        var hourWindSpeed17 = document.getElementById('hourWindSpeed17');
        var hourImg17Path = res.forecast.forecastday[0].hour[16].condition.icon;
        hourImg17.src = "." + hourImg17Path;
        hourCondition17.textContent = res.forecast.forecastday[0].hour[16].condition.text;
        hourTemp17.textContent = res.forecast.forecastday[0].hour[16].temp_f;
        hourWindDir17.textContent = res.forecast.forecastday[0].hour[16].wind_dir;
        hourWindSpeed17.textContent = res.forecast.forecastday[0].hour[16].wind_mph;
        var time17 = res.forecast.forecastday[0].hour[16].time_epoch;
        if(time17 < currentTime) {
            document.getElementById('hour17').style.display = "none";
        }

        var hourImg18 = document.getElementById('hourImg18');
        var hourCondition18 = document.getElementById('hourCondition18');
        var hourTemp18 = document.getElementById('hourTemp18');
        var hourWindDir18 = document.getElementById('hourWindDir18');
        var hourWindSpeed18 = document.getElementById('hourWindSpeed18');
        var hourImg18Path = res.forecast.forecastday[0].hour[17].condition.icon;
        hourImg18.src = "." + hourImg18Path;
        hourCondition18.textContent = res.forecast.forecastday[0].hour[17].condition.text;
        hourTemp18.textContent = res.forecast.forecastday[0].hour[17].temp_f;
        hourWindDir18.textContent = res.forecast.forecastday[0].hour[17].wind_dir;
        hourWindSpeed18.textContent = res.forecast.forecastday[0].hour[17].wind_mph;
        var time18 = res.forecast.forecastday[0].hour[17].time_epoch;
        if(time18 < currentTime) {
            document.getElementById('hour18').style.display = "none";
        }

        var hourImg19 = document.getElementById('hourImg19');
        var hourCondition19 = document.getElementById('hourCondition19');
        var hourTemp19 = document.getElementById('hourTemp19');
        var hourWindDir19 = document.getElementById('hourWindDir19');
        var hourWindSpeed19 = document.getElementById('hourWindSpeed19');
        var hourImg19Path = res.forecast.forecastday[0].hour[18].condition.icon;
        hourImg19.src = "." + hourImg19Path;
        hourCondition19.textContent = res.forecast.forecastday[0].hour[18].condition.text;
        hourTemp19.textContent = res.forecast.forecastday[0].hour[18].temp_f;
        hourWindDir19.textContent = res.forecast.forecastday[0].hour[18].wind_dir;
        hourWindSpeed19.textContent = res.forecast.forecastday[0].hour[18].wind_mph;
        var time19 = res.forecast.forecastday[0].hour[18].time_epoch;
        if(time19 < currentTime) {
            document.getElementById('hour19').style.display = "none";
        }

        var hourImg20 = document.getElementById('hourImg20');
        var hourCondition20 = document.getElementById('hourCondition20');
        var hourTemp20 = document.getElementById('hourTemp20');
        var hourWindDir20 = document.getElementById('hourWindDir20');
        var hourWindSpeed20 = document.getElementById('hourWindSpeed20');
        var hourImg20Path = res.forecast.forecastday[0].hour[19].condition.icon;
        hourImg20.src = "." + hourImg20Path;
        hourCondition20.textContent = res.forecast.forecastday[0].hour[19].condition.text;
        hourTemp20.textContent = res.forecast.forecastday[0].hour[19].temp_f;
        hourWindDir20.textContent = res.forecast.forecastday[0].hour[19].wind_dir;
        hourWindSpeed20.textContent = res.forecast.forecastday[0].hour[19].wind_mph;
        var time20 = res.forecast.forecastday[0].hour[19].time_epoch;
        if(time20 < currentTime) {
            document.getElementById('hour20').style.display = "none";
        }

        var hourImg21 = document.getElementById('hourImg21');
        var hourCondition21 = document.getElementById('hourCondition21');
        var hourTemp21 = document.getElementById('hourTemp21');
        var hourWindDir21 = document.getElementById('hourWindDir21');
        var hourWindSpeed21 = document.getElementById('hourWindSpeed21');
        var hourImg21Path = res.forecast.forecastday[0].hour[20].condition.icon;
        hourImg21.src = "." + hourImg21Path;
        hourCondition21.textContent = res.forecast.forecastday[0].hour[20].condition.text;
        hourTemp21.textContent = res.forecast.forecastday[0].hour[20].temp_f;
        hourWindDir21.textContent = res.forecast.forecastday[0].hour[20].wind_dir;
        hourWindSpeed21.textContent = res.forecast.forecastday[0].hour[20].wind_mph;
        var time21 = res.forecast.forecastday[0].hour[20].time_epoch;
        if(time21 < currentTime) {
            document.getElementById('hour21').style.display = "none";
        }

        var hourImg22 = document.getElementById('hourImg22');
        var hourCondition22 = document.getElementById('hourCondition22');
        var hourTemp22 = document.getElementById('hourTemp22');
        var hourWindDir22 = document.getElementById('hourWindDir22');
        var hourWindSpeed22 = document.getElementById('hourWindSpeed22');
        var hourImg22Path = res.forecast.forecastday[0].hour[21].condition.icon;
        hourImg22.src = "." + hourImg22Path;
        hourCondition22.textContent = res.forecast.forecastday[0].hour[21].condition.text;
        hourTemp22.textContent = res.forecast.forecastday[0].hour[21].temp_f;
        hourWindDir22.textContent = res.forecast.forecastday[0].hour[21].wind_dir;
        hourWindSpeed22.textContent = res.forecast.forecastday[0].hour[21].wind_mph;
        var time22 = res.forecast.forecastday[0].hour[21].time_epoch;
        if(time22 < currentTime) {
            document.getElementById('hour22').style.display = "none";
        }

        var hourImg23 = document.getElementById('hourImg23');
        var hourCondition23 = document.getElementById('hourCondition23');
        var hourTemp23 = document.getElementById('hourTemp23');
        var hourWindDir23 = document.getElementById('hourWindDir23');
        var hourWindSpeed23 = document.getElementById('hourWindSpeed23');
        var hourImg23Path = res.forecast.forecastday[0].hour[22].condition.icon;
        hourImg23.src = "." + hourImg23Path;
        hourCondition23.textContent = res.forecast.forecastday[0].hour[22].condition.text;
        hourTemp23.textContent = res.forecast.forecastday[0].hour[22].temp_f;
        hourWindDir23.textContent = res.forecast.forecastday[0].hour[22].wind_dir;
        hourWindSpeed23.textContent = res.forecast.forecastday[0].hour[22].wind_mph;
        var time23 = res.forecast.forecastday[0].hour[22].time_epoch;
        if(time23 < currentTime) {
            document.getElementById('hour23').style.display = "none";
        }

        var hourImg24 = document.getElementById('hourImg24');
        var hourCondition24 = document.getElementById('hourCondition24');
        var hourTemp24 = document.getElementById('hourTemp24');
        var hourWindDir24 = document.getElementById('hourWindDir24');
        var hourWindSpeed24 = document.getElementById('hourWindSpeed24');
        var hourImg24Path = res.forecast.forecastday[0].hour[23].condition.icon;
        hourImg24.src = "." + hourImg24Path;
        hourCondition24.textContent = res.forecast.forecastday[0].hour[23].condition.text;
        hourTemp24.textContent = res.forecast.forecastday[0].hour[23].temp_f;
        hourWindDir24.textContent = res.forecast.forecastday[0].hour[23].wind_dir;
        hourWindSpeed24.textContent = res.forecast.forecastday[0].hour[23].wind_mph;
        var time24 = res.forecast.forecastday[0].hour[23].time_epoch;
        if(time24 < currentTime) {
            document.getElementById('hour24').style.display = "none";
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