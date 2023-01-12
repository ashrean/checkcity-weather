# Check City Weather

# Table of Contents
- Description
- Installation Instructions
- GitHub Account
- Contacts
- Code Snippets
- Resources
- Credits


# Descriptiom
This application is to inform you of the weather conditions based on the city you are searching. When on the browser
you have the search sidebar this allows you for then search for the specified city. Once you then have clicked on the search button
the city you have selected will then be saved to the browser and visable for you to access. It will then show you the city you have selected
the current date and the weather conditions along with the upcoming five-day forecast.

# Installtion Instructions
1. Open the terminal (make sure it's not coded into a directory)
2. Type ls to see all of your files stored on your computer
3. Type cd into a directory of your choice from there you have two options
    - Create a new directory by using the command mkdir FILENAME
    - type cd into an existing one
4. Once you have selected a directory of your choice you may git clone the repository.
5. Type ls to make sure it is there
6. Type cd to enter the selected directory
7. Type code . (make sure to add space between the code and the period) and VS Code will automatically open it up for you.

# Github Account
URL -> https://github.com/ashrean

Deployed Link -> https://ashrean.github.io/checkcity-weather/
# Contacts
Email - sese.ashrean@gmail.com

Linkedin - https://www.linkedin.com/in/ashleyrean/

# Code Snippets
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





# Resources
- https://www.w3schools.com/default.asp
- https://developer.mozilla.org/en-US/
- Book: Javascipt(6th edition) - Mike McGrath
- https://openweathermap.org/forecast5

# Credits
- Edwin Hernandez
- Paul: Brother in-law
