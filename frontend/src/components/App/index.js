import React from 'react'

// Styled Components
import { Layout } from './styled'

// Components
import { CountrySection } from '../CountrySection'
import { MostAffectedSection } from '../MostAffectedSection'

const App = () => (
  <Layout>
    <CountrySection />
    <MostAffectedSection />
  </Layout>
)

export default App
