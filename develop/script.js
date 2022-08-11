// variables
var searchFormEl = document.getElementById("search-form");
var cityText = document.getElementById("city-text");

//var url = "http://api.openweathermap.org/data/2.5/weather?q=calgary&APPID=bfbbe0bd4a83635a0fc689eaf40b77c3";
//fetch(url)
 //   .then(res => res.json())
 //   .then(data => console.log(data))

// Define search api function
function searchApi(query) {

    // url before city input
    var cityQueryUrl = 'http://api.openweathermap.org/data/2.5/weather';
    // url with user's chosen city
    cityQueryUrl = cityQueryUrl + '?q=' + query + '&APPID=bfbbe0bd4a83635a0fc689eaf40b77c3';
    console.log(query);

    // Fetch to get data!
    fetch(cityQueryUrl)
        .then(function (res) {
            if (!res.ok) {
                throw res.json(); // Throw res.json anyways?
            }
            return res.json(); // Does json work like this on this api? 
        })

        .then (function (cityRes) {
        cityText.textContent = cityRes.search.query;
        })
}

// Function to handle form
function handleSearchForm(event) {
    //  Prevent default
    event.preventDefault();

    // Create a variable for user search input.
    var searchInputVal = document.getElementById("search-input").value;

    // If no value is typed, console log an error.
    if (!searchInputVal) {
        console.error("Please type in a valid city.");
        return;
    }

    // Call search api function.
    searchApi (searchInputVal);

}

// Event listener on search button, which calls function to handle search form
searchFormEl.addEventListener('click', handleSearchForm);


