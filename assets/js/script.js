var apiKey = "dee567190317fc8cac89fcacbcac5aeb";
$(document).ready(function(){
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    showSearchHistory();

    function showSearchHistory() {
        var history = $("#search-history");
        
    }
    
    $("#search-button").on("click", function() {
        var userInput = $("#search-input").val();
    
        if (userInput) {
            searchForCity(userInput);
        }
    });
});


function searchForCity(cityName) {
    var apiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;
    
    fetch(apiCall)
        .then(function(response) {
            if(!response.ok) {
                console.log("call failed");
            }
            return response.json();
        })
        .then(function(data) {
            var lat = data[0].lat
            var lon = data[0].lon
            var apiCall2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            console.log(data)
            fetch(apiCall2)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    var todaysWeather = document.getElementById('current-forecast');
                    todaysWeather.style.height = 'auto'
                    document.getElementById('current-forecast').innerHTML=
                    `
                    <ul>
                    <h3>${cityName}(${data.list[0].dt_txt})</h3><img src=https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png />
                    <li>Temp: ${data.list[0].main.temp} °F</li>
                    <li>${data.list[0].wind.speed} MPH</li>
                    <li>${data.list[0].main.humidity}%</li>
                    </ul>
                    `
                
                for (var i=2; i < data.list.length; i+=8) {
                    console.log(data.list[i])
                    document.getElementById('future').innerHTML=
                    `
                    <ul>
                    <h5>${data.list[i].dt_txt}</h5><img src=https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png />
                    <li>Temp: ${data.list[i].main.temp} °F</li>
                    <li>${data.list[i].wind.speed} MPH</li>
                    <li>${data.list[i].main.humidity}</li>
                    </ul>
                    `
                }
                
                
                    //     var currentForecast = document.getElementById("current-forecast");
                //     var weatherDisplay = displayWeatherData(data.list[0], data.city.name, true);
                //     currentForecast.style.height = "auto";
                //     currentForecast.innerHTML = weatherDisplay;
                //     for (var i=0; i < 5; i++)
                //         var forecastDisplay = displayWeatherData(data.list[i * 8 +1], data.city.name, false);
                })
            // function displayWeatherData(data, cityName, isCurrent) {
                // var windSpeed = data.wind.speed;
                // var humidity = data.main.humidity;
                // var temperature = data.main.temp;
                // var date = data.dt;
                // var weatherImage = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`

                // if (isCurrent) {
                //     header = "<h3>" + cityName + " (" + date + ')<img src="' + weatherImage + '" alt="' + data.weather[0].description + '/><h3>';
                // } else {
                //     header = "<h5>" + cityName + '<img src="' + weatherImage + '" alt="' + data.weather[0].description + '" /><h5>';
                // }

                // var weatherDisplayText = header + "<p>Temp: " + temperature + " °F</p>" + "<p>Wind: " + windSpeed + " mph</p>" + "<p>Humidity: " + humidity + " %</p>";
                // return weatherDisplayText;
            // }
        
        })

}