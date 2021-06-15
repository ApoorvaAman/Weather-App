import { useLazyQuery } from '@apollo/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import GET_CURRENT_WEATHER from '../graphql/currentWeatherQuery'
import Loading from './Loading'
import Error from './Error'

const Weather = (): JSX.Element => {
  const [city, setCity] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value)
  }

  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_CURRENT_WEATHER,
    {
      variables: { name: city },
    },
  )
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    return getWeather()
  }
  const currentTime = new Date(1000 * data?.getCityByName?.weather?.timestamp)

  return (
    <div className="container">
      <form>
        <input type="text" placeholder="London" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
      {data && (
        <div className="weather-card">
          <h1 className="city">
            {data?.getCityByName?.name}, {data?.getCityByName?.country}
          </h1>
          <h2 className="temp">
            {data?.getCityByName?.weather?.temperature?.actual}
          </h2>
          <h3 className="desc">
            {data?.getCityByName?.weather?.summary?.description}
          </h3>
          <img
            src={`http://openweathermap.org/img/wn/${data?.getCityByName?.weather?.summary?.icon}@4x.png`}
            alt="Weather Icon"
          />
          <div className="time">{currentTime.toString()}</div>
        </div>
      )}

      {loading && <Loading />}
      {error && <Error />}
    </div>
  )
}

export default Weather
