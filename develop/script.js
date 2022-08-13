// variables
var searchFormEl = document.getElementById("search-form");
var cityText = document.getElementById("city-text");
var today = document.getElementById("today");
var emoji =  String.fromCodePoint(0x1F324); // for now, leave as is.
var weatherStats = document.getElementById("stats");
//var url = "http://api.openweathermap.org/data/2.5/weather?q=calgary&APPID=bfbbe0bd4a83635a0fc689eaf40b77c3";

// Show today's date.
today.textContent = moment().format('MM.DD.YY');

// Define search api function
function searchApi(query) {

    // My appid:
    var APIkey = 'bfbbe0bd4a83635a0fc689eaf40b77c3';

    // url before city input
    var cityQueryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';

    // url with user's chosen city
    cityQueryUrl = cityQueryUrl + query + '&units=imperial&APPID=' + APIkey;
    console.log(cityQueryUrl);


    // Fetch to get data!
    fetch(cityQueryUrl)
        .then(function (res) {
            if (!res.ok) {
                throw res.json(); 
            }
            return res.json(); 
        })

        // Print name of city on page
        .then (function (cityRes) {
            cityText.textContent = cityRes.name + ' ' + emoji; // gonna define emoji
            
            // Add temp info
            var tempItem = document.createElement("li");
            tempItem.textContent = "Temp: " + cityRes.main.temp + '°';
            weatherStats.appendChild(tempItem);

            // Add wind info
            var windItem = document.createElement("li");
            windItem.textContent = "Wind: " + cityRes.wind.speed + " mph";
            weatherStats.appendChild(windItem);

            // Add humidity info
            var humidItem = document.createElement("li");
            humidItem.textContent = "Humidity: " + cityRes.main.humidity + "%";
            weatherStats.appendChild(humidItem);

            // lat and lon
            var lat = cityRes.coord.lat;
            var lon = cityRes.coord.lon;

            // For UV: url before city input.
            var sunUrl = "api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + APIkey;

            sunUrl = "https://cors-anywhere.herokuapp.com/" + sunUrl;

            // Fetch to get uv data!
        fetch(sunUrl)
        .then(function (sunRes) {
            if (!sunRes.ok) {
              throw sunRes.json();
            }
            return sunRes.json();
        })
    
        // Print UV info on page
        .then (function (print) {
            // add UV info
            var UvItem = document.createElement("li");
            uviValue = print.value;
            UvItem.textContent = "UV index: " + uviValue;
            weatherStats.appendChild(UvItem);
            UvItem.setAttribute('id', 'uviColor');

            // color of UV index
            if (uviValue < 3) {
                uviColor.setAttribute('style', 'background-color: #78DA7B; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else if (uviValue >= 3 && uviValue < 6) {
                uviColor.setAttribute('style', 'background-color: #EFE336; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else if (uviValue >= 6 && uviValue < 8) {
                uviColor.setAttribute('style', 'background-color: #EF9336; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else if (uviValue >= 8 && uviValue < 11) {
                uviColor.setAttribute('style', 'background-color: #CA5F22; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else {
                uviColor.setAttribute('style', 'background-color: #EF3636; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
        })
 
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

    // Clear search bar
    if (searchInputVal) {
        var searchBarClear = document.getElementById("search-input");
        searchBarClear.value = '';
    }

}

// Event listener on search button, which calls function to handle search form
searchFormEl.addEventListener('click', handleSearchForm);

