const API_KEY = '7df13a39a90ac2b4b11aebebba30ae45'

const getInputValue = (inputId) => {
  const cityNameField = document.getElementById(inputId)
  const cityName = cityNameField.value
  cityNameField.value = ''
  return cityName ? cityName : -1
}

const getFetchUrl = (serachText) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${serachText}&appid=${API_KEY}&units=metric`
}

const fetchData = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}

const setInnerText = (id, text) => {
  document.getElementById(id).innerText = text
}

const displayData = (data) => {
  const { name, main, weather } = data && data
  const temp = weather && weather[0]
  const NOT_FOUND = 'Not Found'
  setInnerText('city-name', name ? name : NOT_FOUND)
  setInnerText('temperature', main ? main.temp : NOT_FOUND)
  setInnerText('weather-type', temp ? temp?.main : NOT_FOUND)
  const iconUrl =
    temp && `https://openweathermap.org/img/wn/${temp.icon}@2x.png`
  document.getElementById('weather-image').setAttribute('src', iconUrl)
}

const fetchAndDisplayCityWeatherData = (city) => {
  const url = getFetchUrl(city)
  const weatherData = await fetchData(url)
  displayData(weatherData)
}

const checkWeather = async () => {
  const city = getInputValue('city-name-field')
  if (city === -1) return

  fetchAndDisplayCityWeatherData(city)
}

fetchAndDisplayCityWeatherData('comilla')
