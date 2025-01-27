import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'
import { Logos } from '../components/Logos'
import { Footer } from '../components/Footer'

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
    <>
      <CenteringContainer className={'flex-col gap-8'}>
        <Logos />
        <Card>
          <p>Vielen Dank für Ihre Teilnahme an dieser Aufgabe!</p>
          <br />
          <p>Sie können das Fenster jetzt schließen.</p>
          <br />
          <p>
            Bei Fragen oder Anmerkungen wenden Sie sich gerne an Lena Klein via{' '}
            <a
              href={'mailto:klein.for@uni-due.de'}
              className={'cursor-pointer text-blue-500 underline'}
            >
              klein.for[at]uni-due.de
            </a>
            .
          </p>
        </Card>
      </CenteringContainer>
      <Footer />
    </>
  )
}
