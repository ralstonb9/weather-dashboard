var apiKey = "dee567190317fc8cac89fcacbcac5aeb";
$(document).ready(function(){
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    showSearchHistory();

    function showSearchHistory() {
        var history = $("#search-history");
        for (i=0; i < searchHistory.length; i++){
            var historyBtn = $("<button>");
            historyBtn.text(searchHistory[i]);
            historyBtn.addClass("history-btn");
            history.append(historyBtn);
        }

        $(".history-btn").on("click", function() {
            searchForCity($(this).text());
        })
    }
    
    $("#search-button").on("click", function() {
        var userInput = $("#search-input").val();
    
        if (userInput && !searchHistory.includes(userInput)) {
            searchHistory.push(userInput);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            showSearchHistory();
          }
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
                    var date = dayjs(data.list[0].dt_txt).format('MMM D, YYYY')
                    var todaysWeather = document.getElementById('current-forecast');
                    todaysWeather.style.height = 'auto'
                    document.getElementById('current-forecast').innerHTML=
                    `
                    <ul>
                    <h3>${cityName}(${date})</h3><img src=https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png />
                    <li>Temp: ${data.list[0].main.temp} °F</li>
                    <li>${data.list[0].wind.speed} MPH</li>
                    <li>${data.list[0].main.humidity}%</li>
                    </ul>
                    `
                
                for (var i=2; i < data.list.length; i+=8) {
                    console.log(data.list[i])
                    document.getElementById('forecast').innerHTML=
                    `
                    <ul>
                    <h5>${date}</h5><img src=https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png />
                    <li>Temp: ${data.list[i].main.temp} °F</li>
                    <li>${data.list[i].wind.speed} MPH</li>
                    <li>${data.list[i].main.humidity}%</li>
                    </ul>
                    `
                }
                
                
                   
                })
            
        
        })

}