function loadPage(){
    var cityEL = document.getElementById("city-input");
    var searchBtnEL = document.getElementById("search-btn");
    var searchCLearEL = document.getElementById("clear-history");
    var cityNameEL = document.getElementById('city-name');
    var pictureEL = document.getElementById('weather-picture');
    var tempEL = document.getElementById('temp');
    var humdiyEL = document.getElementById('humid');
    var windEL = document.getElementById('wind');
    var uvEL = document.getElementById('uv');
    var searchHistoryEL = document.getElementById('history');
    var fiverEl = document.getElementById('fiver');
    var todayEL = document.getElementById('today-weather');
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    var apiKey = "5aadfd79fd19d11b2113d15158a883eb";
//function for the fetch request for city weather
    function weather(cityName) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +apiKey;
        fetch(queryURL).then(function (response){
           if(response.ok){ 
            response.json().then(function (data) {
            todayEL.classList.remove("d-none");
             //todays weather data
            var todayDate = new Date(data.dt * 1000);
            var year = todayDate.getFullYear();
            var month = todayDate.getMonth() +1;
            var day = todayDate.getDate();

            cityNameEL.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
            console.log(data.dt); 
            console.log(data.name);
            let wPicture = data.weather[0].icon;
            console.log(document.getElementById('weather-picture'));
            pictureEL.setAttribute("src","https://openweathermap.org/img/wn/" + wPicture +".png");
            tempEL.innerHTML = "Temperature: " + k2f(data.main.temp) + " &#176F";
            humdiyEL.innerHTML = "Humidity: " + data.main.humidity + "%";
            windEL.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";


            let lat = data.coord.lat;
            let lon = data.coord.lon;

            let uvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
            fetch(uvUrl).then(function(response){
                response.json().then(function (data) {

                let uvIndex = document.createElement("span");
                if (data[0].value < 4){
                    uvIndex.setAttribute("class", "badge badge-success");
                }
                else if (data[0].value < 8){
                    uvIndex.setAttribute("class", "badge badge-warning");
                }
                else {
                    uvIndex.setAttribute("class", "badge badge-danger");
                }
                uvIndex.innerHTML = data[0].value;
                uvEL.innerHTML = "UV Index";
                uvEL.append(uvIndex);
            })
            });
            //fetch for the 5 day forecast
            let cityID = data.id;
            let fiveCastUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
            fetch(fiveCastUrl).then(function (response){
                response.json().then(function (data) {
                
                fiverEl.classList.remove("d-none");
                var fiveCastEL = $(".fivecast");
                for (i = 0; i < fiveCastEL.length; i++){
                    fiveCastEL[i].innerHTML = "";
                    const fiveCastIndex = i * 8 + 4;
                            var fiveCastDate = new Date(data.list[fiveCastIndex].dt * 1000);
                            var fiveCastDay = fiveCastDate.getDate();
                            var fiveCastMonth = fiveCastDate.getMonth() + 1;
                            var fiveCastYear = fiveCastDate.getFullYear();
                            var fiveCastDateEl = document.createElement("p");
                            fiveCastDateEl.setAttribute("class","mt-3 mb-0 five-cast-date");
                            fiveCastDateEl.innerHTML = fiveCastMonth + "/" + fiveCastDay + "/" + fiveCastYear;
                            fiveCastEL[i].append(fiveCastDateEl);

                            var fiveCastIconW = document.createElement("img");
                            fiveCastIconW.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[fiveCastIndex].weather[0].icon + "@2x.png");
                            fiveCastEL[i].append(fiveCastIconW);

                            var fivecastTemp = document.createElement("p");
                            fivecastTemp.innerHTML = "Temp: " + k2f(data.list[fiveCastIndex].main.temp) + "&#176F";
                            fiveCastEL[i].append(fivecastTemp);

                            var fivecastHumid = document.createElement("p");
                            fivecastHumid.innerHTML = "Humidity: " + data.list[fiveCastIndex].main.humidity + "%";
                            fiveCastEL[i].append(fivecastHumid);

                }
            })
            })


        });
        
    } else{
        return; 
    }
     })
    }
    searchBtnEL.addEventListener("click", function(){
        var searchEntry = cityEL.value;
        weather(searchEntry);
        searchHistory.push(searchEntry);
        localStorage.setItem("search", JSON.stringify(searchEntry));
        loadSearchHistory();

    })
    searchCLearEL.addEventListener("click", function(){
        localStorage.clear();
        searchHistory = [];
        loadSearchHistory();
    })
    //need to convert temp value to F
    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }
//local storage function for search entry
    function loadSearchHistory(){
        searchHistoryEL.innerHTML = "";
        for (i = 0; i < searchHistory.length; i++){
            var searchItem = document.createElement("input");
            searchItem.setAttribute("type","text");
            searchItem.setAttribute("readonly",true);
            searchItem.setAttribute("class","form-control d-block bg-white");
            searchItem.setAttribute("value",searchHistory[i]);
            searchItem.addEventListener("click", function(){
                weather(searchItem.value);
            })
            searchHistoryEL.append(searchItem);
        }
    }
    loadSearchHistory();
    if (searchHistory.length > 0){
        weather(searchHistory[searchHistory.length - 1]);
    }
         
}
loadPage(); 