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
function currentConditions(searchValue)
