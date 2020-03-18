import styled from 'styled-components'

export const CountryStats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  border: 1px solid #f0f0f0;
  margin-top: 24px;
  min-height: 113px;
  min-width: 389px;

  .ant-statistic ~ .ant-statistic {
    margin-left: 24px;
  }
`
