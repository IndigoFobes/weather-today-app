// variables
var searchFormEl = document.getElementById("search-form");



// Function to handle form
function handleSearchForm(event) {
    //  Prevent default
    event.preventDefault();

    // Create a variable for user search input
    var searchInputVal = document.getElementById("search-input").value;

}

var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bfbbe0bd4a83635a0fc689eaf40b77c3";
fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))