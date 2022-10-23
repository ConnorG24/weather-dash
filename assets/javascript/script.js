function loadPage(){
    var cityEL = document.getElementById("city-input");
    var searchBtnEL = document.getElementById("search-btn");
    var searchCLearEL = document.getElementById("clear-history");
    var cityNameEL = document.getElementById("city-name");
    var pictureEL = document.getElementById("currnet-pic");
    var tempEL = document.getElementById("temp");
    var humdiyEL = document.getElementById("humdi");
    var windEL = document.getElementById("wind");
    var uvEL = document.getElementById("uv");
    var searchHistoryEL = document.getElementById("history");
    var fiverEl = document.getElementById("fiver");
    var todayEL = document.getElementById("today-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search"));
    var apiKey = "5aadfd79fd19d11b2113d15158a883eb";

    function weather(cityName) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +apiKey;
        fetch(queryURL)
        .then(function (response){
            todayEL.classList.remove("d-none");
            var todayDate = new Date(response.data.dt *1000);
            var year = todayDate.getFullYear();
            var month = todayDate.getMonth();
            var day = todayDate.getDate();

            cityNameEL.innerHTML = response.data.name + "("+ month + "/"+ day +"/"+ year +")";
            let 
        })
    }

}