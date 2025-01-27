import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'

export function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const errorCode: string = location.state?.errorCode
  const experimenteeId: string = location.state?.experimenteeId

  useEffect(() => {
    if (!errorCode) {
      navigate(`/`)
    }
  }, [errorCode, navigate])

  return (
    <CenteringContainer>
      <Card>
        <p>
          Ein Fehler ist aufgetreten. Bitte kopieren Sie folgende Nachricht und
          schicken Sie sie an die Email-Adresse:{' '}
          <a
            className={'text-blue-500 underline'}
            href={`mailto:klein.for@uni-due.de?subject=Errormeldung in der eWMT&body=Ein Fehler bei der eWMT ist aufgetreten. ErrorCode: ${errorCode} - Experimentee ID: ${experimenteeId}`}
          >
            klein.for[at]uni-due.de
          </a>
        </p>
        <br />
        <p className={'bg-gray-200 text-center'}>
          Error occurred! Code: {errorCode}
          <br />
          Experimentee ID: {experimenteeId}
        </p>
        <br />
        <p>
          Bitte rufen Sie den Link erneut auf, kehren zur Startseite zurück und
          beginnen Sie die Aufgabe von vorne.
        </p>
        <br />
        <p>Vielen Dank!</p>
      </Card>
    </CenteringContainer>
  )
}
