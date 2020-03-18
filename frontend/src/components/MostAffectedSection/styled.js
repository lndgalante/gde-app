import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)`
  ~ .ant-card {
    margin-left: 6px;
  }

  .ant-statistic ~ .ant-statistic {
    margin-top: 12px;
  }
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`
