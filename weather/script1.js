var city = document.getElementById('city');
var temp = document.getElementById('temp');
var unit = document.getElementById('unit');
var icon = document.getElementById('icon');
var key = '9d7be2ad361191932f57bffd63ee5afe';

var longitude, latitude;

var ipReq = new XMLHttpRequest();
var xhr = new XMLHttpRequest();

function getCoords() {
  ipReq.open("GET", 'http://freegeoip.net/json/');
  ipReq.response = 'json';
  ipReq.send();
  
  ipReq.onreadystatechange = function(e) {
    var DONE = 4;
    var OK = 200;
    if (e.target.readyState === DONE) {
        if (e.target.status === OK) {
          var location = JSON.parse(e.target.response);
          latitude = location.latitude;
          longitude = location.longitude;
          req = 'lat=' + latitude + '&lon=' + longitude;
          getWeather(req);
        }
    } else {
        console.log('Error: ' + xhr.status);
    }
  };
}
    
function getWeather(req) {
  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?' + req + '&APPID=' + key);

  xhr.responseType = 'json';
  xhr.send();
  
  xhr.onreadystatechange = function(e) {
    var DONE = 4;
    var OK = 200;
    if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
   
            city.innerHTML = e.target.response.name;
            var kelvin = e.target.response.main.temp;
            temp.innerHTML = Math.round(kelToFar(kelvin));    
            var img = e.target.response.weather[0].icon;
            icon.setAttribute('src', 'http://openweathermap.org/img/w/' + img + '.png');
        }
    }
  };
}

function kelToFar(kelvin) {
    return kelvin * (9/5) - 459.67;
}

function FarToCel(farh) {
    return (farh - 32) * (5/9);
}

function CelToFar(cel) {
    return cel * (9/5) + 32;
}

getCoords();


unit.addEventListener("click", function() {
    if (unit.innerHTML == "F") {
        temp.innerHTML = Math.round(FarToCel(temp.innerHTML));
        unit.innerHTML = "C";
    } else {
        temp.innerHTML = Math.round(CelToFar(temp.innerHTML));
        unit.innerHTML = "F";
    }
});
