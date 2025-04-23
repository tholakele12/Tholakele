function refreshWeatherInfo(response) {
    let temperatureElement = document.querySelector("#temperature")
    let temperature=response.data.temperature.current;
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windSpeedElement= document.querySelector("#wind-speed")
    let timeElement= document.querySelector("#time")
    let date= new Date(response.data.time * 1000)
    let iconElement = document.querySelector("#icon");
    

console.log(response.data.condition.description)


   cityElement.innerHTML= response.data.city
   timeElement.innerHTML= formatDate(date)
   descriptionElement.innerHTML=response.data.condition.description
   humidityElement.innerHTML=`${response.data.temperature.humidity}%`
   windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`
   temperatureElement.innerHTML= Math.round(temperature)
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city)

    

}
function formatDate(date) {
    
    let minutes=date.getMinutes()
    let hours=date.getHours()
    let  days=  [
        "Monday",
        "Tuesday",

        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    let day = days[date.getDay()]
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }

    return `${day} ${hours}:${minutes}`
}



function searchCity(city) {
    let apiKey = "cbt861e044733a3cdofadb63b63182c9"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    console.log(apiUrl);
    axios.get(apiUrl).then(refreshWeatherInfo)




}



function handleSearchSubmit(event) {
   event.preventDefault() 
   let searchInput = document.querySelector("#search-form-input")
   console.log(searchInput.value)
   
   searchCity(searchInput.value)
}


let searchFormElement = document.querySelector("#search-form")
console.log(searchFormElement)
searchFormElement.addEventListener("submit",handleSearchSubmit)

searchCity("Paris")

function displayForecast(response) {
    console.log(response.data)


  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {

   
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
    }
    

  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function formatDay(timeStamp) {
let date= new Date(timeStamp * 1000)
let days = ["Sun",  "Mon", "Tue", "Wen", "Thur", "Fri", "Sat"]

return days [date.getDay()]
}

function getForecast(city) {
    let apiKey= "cbt861e044733a3cdofadb63b63182c9"
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios(apiUrl).then(displayForecast)
    console.log(apiUrl)


}