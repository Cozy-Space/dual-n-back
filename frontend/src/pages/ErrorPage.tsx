import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'

export function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const errorCode: string = location.state?.errorCode

  useEffect(() => {
    if (!errorCode) {
      navigate(`/`)
    }
  }, [errorCode, navigate])

  return (
    <CenteringContainer>
      <Card>
        <span>An Error occurred! Code: {errorCode}</span>
      </Card>
    </CenteringContainer>
  )
}
