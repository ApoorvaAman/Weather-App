import { gql } from '@apollo/client'

const GET_CURRENT_WEATHER = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      name
      country
      weather {
        summary {
          description
          icon
        }
        temperature {
          actual
        }
        timestamp
      }
    }
  }
`

export default GET_CURRENT_WEATHER
