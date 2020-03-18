import React, { useState } from 'react'
import { Statistic, Typography, Select } from 'antd'
import get from 'lodash.get'

// Styled Components
import { CountryStats } from './styled'
import { Section } from '../../ui/styled/Section'

// Hooks
import { useCountryInformation } from '../../hooks/useCountryInformation'

// Constants
import { AVAILABLE_COUNTRIES } from '../../utils/constants'

export const CountrySection = () => {
  // React hooks
  const [countryQuery, setCountryQuery] = useState('')

  // Custom hooks
  const countryInformation = useCountryInformation(countryQuery)

  // Handlers
  const handleCountryChange = (newCountry) => setCountryQuery(newCountry)

  return (
    <Section>
      <Typography.Title level={2}>Find by country</Typography.Title>
      <Select
        showSearch
        style={{ width: 200 }}
        optionFilterProp="children"
        placeholder="Choose your country"
        onChange={handleCountryChange}
      >
        {AVAILABLE_COUNTRIES.map((country) => (
          <Select.Option key={country} value={country}>
            {country}
          </Select.Option>
        ))}
      </Select>

      <CountryStats>
        <Statistic title="Confirmed cases" value={get(countryInformation, 'confirmed', 0)} />
        <Statistic title="Recovered cases" value={get(countryInformation, 'recovered', 0)} />
        <Statistic title="Deaths cases" value={get(countryInformation, 'deaths', 0)} />
      </CountryStats>
    </Section>
  )
}
