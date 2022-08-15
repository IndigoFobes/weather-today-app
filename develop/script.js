//var url = "http://api.openweathermap.org/data/2.5/weather?q=calgary&APPID=bfbbe0bd4a83635a0fc689eaf40b77c3";

// variables
var searchFormEl = document.getElementById("search-form");
var cityText = document.getElementById("city-text");
var today = document.getElementById("today");
var emoji =  String.fromCodePoint(0x1F324); // for now, leave as is.
var weatherStats = document.getElementById("stats");
var searchHistory = document.getElementById("search-history");
var button = document.getElementById("clear-history");
// Set empty array
let cityArray
if (localStorage.getItem('cities')) {
    cityArray = JSON.parse(localStorage.getItem('cities'))
} else {
    cityArray = []; 
}


// Set up local storage key and value
localStorage.setItem('cities', JSON.stringify(cityArray));
// variable to reference later in code
var data = JSON.parse(localStorage.getItem('cities'))


// Show today's date.
today.textContent = moment().format('MM.DD.YY');


// Put whatever items are already in local storage onto the page as search history
for (i = 0; i < data.length; i++) {
    var city = data[i];
    var storedCity = document.createElement('li');
    storedCity.textContent = city; // Grabbing the localstorage data we've saved and parsed
    storedCity.setAttribute('data-index', i);
    // Append to ul
    searchHistory.appendChild(storedCity);
    // Give it an id for styling
    storedCity.setAttribute('id', 'stored-city');   

    // Add click
    storedCity.addEventListener('click', function(event) {
        var element = event.target;
        var index = element.getAttribute('data-index');
        searchApi(data[index]);
        
})
}


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
            cityText.textContent = cityRes.name;// gonna define emoji

            // for icon
            
            /* if (cityRes.weather.main == 'Drizzle') {
                icon = '09d';
            } 
            else if (cityRes.weather.main == 'Rain') {
                icon = '10d';
            }
            else if (cityRes.weather.main == 'Snow') {
                icon = '13d';
            }
            else if (cityRes.weather.main == 'Clear') {
                icon = '01d';
            }
            else {
                icon = '03d';
            }

            var iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            var img = document.querySelector('img');
            img.setAttribute('src', iconUrl); */
            
            
            // Add temp info
            var tempItem = document.getElementById("temp-item");
            tempItem.textContent = "Temp: " + cityRes.main.temp + '°';

            // Add wind info
            var windItem = document.getElementById("wind-item");
            windItem.textContent = "Wind: " + cityRes.wind.speed + " mph";

            // Add humidity info
            var humidItem = document.getElementById("humid-item");
            humidItem.textContent = "Humidity: " + cityRes.main.humidity + "%";

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
            var UvItem = document.getElementById("uv-item");
            uviValue = print.value;
            UvItem.textContent = "UV index: " + uviValue;

            // color of UV index
            if (uviValue < 3) {
                UvItem.setAttribute('style', 'background-color: #78DA7B; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else if (uviValue >= 3 && uviValue < 6) {
                UvItem.setAttribute('style', 'background-color: #EFE336; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else if (uviValue >= 6 && uviValue < 8) {
                UvItem.setAttribute('style', 'background-color: #EF9336; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else if (uviValue >= 8 && uviValue < 11) {
                UvItem.setAttribute('style', 'background-color: #CA5F22; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
            else {
                UvItem.setAttribute('style', 'background-color: #EF3636; font-weight: 500; max-width: 130px; border-radius: .2rem; padding-left: .5rem');
            }
        })
 
    })

}


// Function to handle form
function handleSearchForm(event) {

    //  Prevent default
    event.preventDefault();

    // Create a variable for user search input.
    var newData = document.getElementById("search-input").value;
   // console.log(newData);

    // If no value is typed, console log an error.
    if (!newData) {
        console.error("Please type in a valid city.");
        return;
    }

    // push user input into local storage
    cityArray.push(newData);
    localStorage.setItem('cities', JSON.stringify(cityArray));

    // Call search api function.
    searchApi (newData);

    // Clear search bar and move to search history
    if (newData) {
       
        var searchBarClear = document.getElementById("search-input");
        searchBarClear.value = '';

        // Move city to search history
        var cityHistory = document.createElement("li");
        cityHistory.textContent = newData;
        searchHistory.appendChild(cityHistory);
        // Give it an id for styling!
        cityHistory.setAttribute('id', 'city-history');
        // Add click event for new items!
        cityHistory.addEventListener('click', function() {
            console.log(newData);
            searchApi(newData);
        });

    }
   
}
   
// Event listener for clear history button
button.addEventListener('click', function() {
    localStorage.clear()
    while (searchHistory.firstChild) {
        searchHistory.removeChild((searchHistory.firstChild))
    }
});


// Event listener on search button, which calls function to handle search form
searchFormEl.addEventListener('click', handleSearchForm);
