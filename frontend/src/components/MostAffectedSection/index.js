import React from 'react'
import { Statistic, Typography } from 'antd'

// Styled Components
import { Section } from '../../ui/styled/Section'
import { CardContainer, StyledCard } from './styled'

// Hooks
import { useMostAffectedCountries } from '../../hooks/useMostAffectedCountries'

export const MostAffectedSection = () => {
  // Custom hooks
  const { mostAffectedCountries } = useMostAffectedCountries()

  return (
    <Section>
      <Typography.Title level={2}>Most affected countries</Typography.Title>
      <CardContainer>
        {mostAffectedCountries.map((affectedCountry) => (
          <StyledCard hoverable title={affectedCountry.countryRegion} key={affectedCountry.id}>
            <Statistic title="Confirmed cases" value={affectedCountry.confirmed} />
            <Statistic title="Recovered cases" value={affectedCountry.recovered} />
            <Statistic title="Deaths cases" value={affectedCountry.deaths} />
          </StyledCard>
        ))}
      </CardContainer>
    </Section>
  )
}
