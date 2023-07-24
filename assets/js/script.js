$(document).ready(function(){
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    var apiKey = "dee567190317fc8cac89fcacbcac5aeb";
    showSearchHistory();

    function showSearchHistory() {
        var history = $("#search-history");
        
    }
    
});

$("#search-button").on("click", function() {
    var userInput = $("#search-input").val();

    if (userInput) {
        searchForCity(userInput);
    }
});

function searchForCity(cityName) {
    var apiCall = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    var apiKey = "dee567190317fc8cac89fcacbcac5aeb";

    fetch(apiCall)
        .then(function(response) {
            if(!response.ok) {
                console.log("call failed");
            }
            return response.json();
        })
        // .then()
}
