function refreshWeatherInfo(response) {
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = response.data.temperature.current
    let temperature=response.data.temperature.current
    let cityElement = document.querySelector("#city")


   cityElement.innerHTML= response.data.city
    temperatureElement.innerHTML= Math.round(temperature)
    

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
