import { ApolloProvider } from '@apollo/client'
import client from './client'
import Weather from './Components/Weather'

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Weather />
    </ApolloProvider>
  )
}

export default App
