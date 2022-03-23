import './App.css';
import React from "react";

const api = {
  key: "5f826a580f1290aece38d4df9e0499eb",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = React.useState("")
  const [weather, setWeather] = React.useState({})
  const [currentLocation, setCurrentLocation] = React.useState("")

  //get user location data
  React.useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then(res => res.json())
      .then(data => setCurrentLocation(data.country_name))
  }, [])

  //display weather from user location
  React.useEffect(() => {
    fetch(`${api.base}weather?q=${currentLocation}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery("")
    })
  }, [currentLocation])

  //display weather on "Enter" press
  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery("")
        })
    }
  }

  //build current-date component
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm" : "app") : "app"}>
      <main>
        <div className='search-box'>
          <input 
            type="text"
            className='search-bar'
            placeholder='search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>  
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
