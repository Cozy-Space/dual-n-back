import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'

export function ResultPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const statistics = location.state?.statistics
  const experimenteeId = searchParams.get('id')

  useEffect(() => {
    if (!experimenteeId || !statistics) {
      navigate(`/`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CenteringContainer>
      <Card>
        <span>experimenteeId: {experimenteeId}</span>
        <br />
        <span>statistics: {JSON.stringify(statistics)}</span>
      </Card>
    </CenteringContainer>
  )
}
