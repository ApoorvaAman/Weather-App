import { useLazyQuery } from '@apollo/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import * as dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GET_CURRENT_WEATHER from '../graphql/currentWeatherQuery'
import Loading from './Loading'
import Error from './Error'

const Weather = (): JSX.Element => {
  const [city, setCity] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setCity(e.target.value)
    }, 1500)
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
  const date = new Date(1000 * data?.getCityByName?.weather?.timestamp)
  const currentTime = dayjs.default(date).format('ddd D, hh:mm A')

  return (
    <div className="container">
      <form>
        <input type="text" placeholder="London" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {data?.getCityByName !== null &&
        data?.getCityByName?.weather?.summary?.icon !== undefined &&
        currentTime &&
        Number(data?.getCityByName?.weather?.temperature?.actual) && (
          <div className="weather-card">
            <div className="details">
              <h1 className="city">
                {data?.getCityByName?.name}, {data?.getCityByName?.country}
              </h1>
              <h2 className="temp">
                {Math.round(
                  data?.getCityByName?.weather?.temperature?.actual - 273.15,
                )}{' '}
                &#8451;
              </h2>
              <h3 className="desc">
                {data?.getCityByName?.weather?.summary?.description}
              </h3>
              <div className="time">{currentTime}</div>
            </div>

            <img
              src={`http://openweathermap.org/img/wn/${data?.getCityByName?.weather?.summary?.icon}@4x.png`}
              alt="Weather Icon"
            />
          </div>
        )}

      {loading && <Loading />}
      {error && <Error />}
    </div>
  )
}

export default Weather
