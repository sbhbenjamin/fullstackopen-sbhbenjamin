import React, { useState, useEffect } from "react"
import axios from "axios"

const WeatherInfo = ({ countryName, weather }) => {
  // const { main, wind } = weather
  return (
    <>
      <h3>Weather in {countryName}</h3>
      <p>
        <b>temperature:</b> {weather.main.temp} Celsius
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>
        <b>wind:</b> {weather.wind.speed} mph {weather.wind.deg} degrees
      </p>
    </>
  )
}

const CountryInfo = ({ country, weather }) => {
  const { name, capital, population, languages, flags } = country
  return (
    <>
      <h2>{name.common}</h2>
      <p>capital {capital[0]}</p>
      <p>population {population}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={flags.png} alt={name.common} />

      {weather && <WeatherInfo countryName={name.common} weather={weather} />}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [display, setDisplay] = useState(false)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (searchQuery.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then((response) => {
          if (response.data.length > 10) {
            setDisplay(false)
            setCountry(null)
            setWeather(null)
          } else if (response.data.length === 1) {
            setDisplay(true)
            setCountry(response.data[0])
            setCountries([])
          } else {
            setDisplay(true)
            setCountry(null)
            setWeather(null)
            setCountries(response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [searchQuery])

  useEffect(() => {
    if (country != null) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((weather) => {
          setWeather(weather.data)
        })
    }
  }, [country])

  return (
    <>
      <div>
        find countries{" "}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {display ? (
          countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setCountry(country)}>show</button>
            </div>
          ))
        ) : (
          <div>Too many matches, specify another filter</div>
        )}
      </div>
      {country && <CountryInfo country={country} weather={weather} />}
    </>
  )
}

export default App
