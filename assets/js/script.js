// Pseudocode

// Base URL
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={9ddc12efb6a46b86c5ae9bd300cf132d}

// Search City Section
    // Create a input text area for the user to type in the city they are searching for
        // The input text are must have a search button

    // When the user clicks on the search button then that city is then saved to the page
        // Create a clear button to delete all the saved cities and the selected city


// Displaying Conditions on Selected City
    // When city has been selected the following criteria must be dispalyed
    // Criteria:
        // City's Name
        // Date
        // Conditions
            // current and future
        // Icon displaying the conditions
        // Display the upcoming 5day forecast

// Creating Variables

    // Search City Variables
var searchCity = $('#search-city')
var searchCityBtn =$('#search-city-btn')
var searchHistory = $('#search-history-li')
var clearHistoryBtn = $('#clear-history')
    //Current City Variables
var currentCity = $('#current-city')
var currentTemp = $('#current-temp')
var currentHumidity = $('#current-humidity')
var currentWind = $('#current-wind-speed')
var uvIndex = $('#uv-index')
    // API key to grant access to OpenWeather
var APIkey = "9ddc12efb6a46b86c5ae9bd300cf132d"
    // Empty variable to access data
var cityList = [ ];

// Displaying current date in the title
var currentDate = moment().format('L');
$('#current-date').text(" + currentDate + ");

// Search history exists when page loads
loadHistory();
showClearBtn();

/* Clicking enter will trigger the input value
and add it to the search history
*/
$(document).on("submit", function(event){
    event.preventDefault();

    // Value gets entered into search bar
    var searchVal = searchCity.val().trim();

    currentConditions(searchVal)
    searchHistory(searchVal)
    searchCity.val("");
});

// Clear sidebar of previous cities that were searched
clearHistoryBtn.on("click", function(){
    cityList = [ ];
    // Updating city in local storage
    listArray();
    $(this).addClass("hide");
});

/* Once the button in the search history is clicked
then that city will pop up in dashboard with weather info
*/
searchHistory.on("click", "li.city-btn", function(event){
    var value = $(this).data("value");
    currentConditions(value);
    searchHistory(value);
});

// Requesting open weather API based on users input
function currentConditions(searchValue) {

    // URL for ajax api
    var apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;

    // ajax
    $.ajax({
        url: apiurl,
        method: "GET"

    }).then(function(response){
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<small class='text-muted' id = 'current-date'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWind.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

        //ajax call for the uv index
        $.ajax({
            url: uvURL,
            method: "GET"

        }).then(function(response){
            uvIndex.text(response.value);
        });

        var country = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat=" + lat +  "&lon=" + lon;

        // ajax call for the 5day-forecast
        $.ajax({
            url: forecastURL,
            method: "Get"

        }).then(function(response){
            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i <response.list.length; i+=8) {
                var forecastDate = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDate);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");

                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);

                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDateString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
            }
        })
    })
};

// Save the search history of ctites and displaying it
function searchHistory(searchValue) {
    // Grab value entered into search bar
    // var searchValue = searchCityInput.val().trim();

    // If there are characters entered into the search bar
    if (searchValue) {
        // Place value in the array of cities
        // if it is a new entry
        if (cityList.indexOf(searchValue) === -1) {
            cityList.push(searchValue);

            // List all of the cities in user history
            listArray();
            clearHistoryButton.removeClass("hide");
            weatherContent.removeClass("hide");
        } else {
            // Remove the existing value from the array
            var removeIndex = cityList.indexOf(searchValue);
            cityList.splice(removeIndex, 1);

            // Push the value again to the array
            cityList.push(searchValue);

            /*list all of the cities in user history
            so the old entry appears at the top
            of the search history */
            listArray();
            clearHistoryButton.removeClass("hide");
            weatherContent.removeClass("hide");
        }
    }
    // console.log(cityList);
}

// Listing array into the search history sidebar
function listArray() {
    // Empty out the elements in the sidebar
    searchHistoryList.empty();
    // Repopulate the sidebar with each city
    // in the array
    cityList.forEach(function(city){
        var searchHistoryItem = $('<li class="list-group-item city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        searchHistoryList.prepend(searchHistoryItem);
    });
    // Update city list history in local storage
    localStorage.setItem("cities", JSON.stringify(cityList));

}

/* Grabbing the city from local storage and
updating the cities list array for
the search history side bar
 */
function loadHistory(searchVal) {
    if (searchVal){
        if(cityList.indexOf(searchVal) === -1){
            cityList.push(searchVal);

            listArray();
            clearHistoryBtn.removeClass("hide");
            weatherContent.removeClass("hide");

        } else {
            var removeIndex = cityList.indexOf(searchVal);
            cityList.splice(removeIndex, 1);

            cityList.push(searchVal);
            listArray();
            clearHistoryBtn.removeClass("hide");
            weatherContent.removeClass("hide");
        }
    }
}

// Listing array into search history sidebar
function listArray(){
    searchHistoryList.empty();
    cityList.forEach(function(city){
        var searchHistoryItem = $('<li class = list-group city-btn>');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        searchHistoryList.prepend(searchHistoryItem);
    })
    localStorage.setItem("cities", JSON.stringify(cityList));
}

/* From local storage we grab the city list(string)
and update the city list array for
the search history side bar
*/
function loadHistory() {
    if(localStorage.getItem("cities")){
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
        listArray();
        if (cityList.length !== 0) {
            currentConditionsRequest(cityList[lastIndex]);
            weatherContent.removeClass("hide");
        }
    }
}

/* Searching if there are elements in
the sidebar in order to show the clear btn
*/
function showClear(){
    if(searchHistoryList.text() !== ""){
        clearHistoryBtn.removeClass("hide");
    }
}
