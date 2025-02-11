import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'
import { Logos } from '../components/Logos'
import { Footer } from '../components/Footer'
import { DevContainer } from '../components/DevContainer'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

export function ResultPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const highestN = location.state?.highestN
  const experimenteeId = searchParams.get('id')

  useEffect(() => {
    if (!experimenteeId || !highestN) {
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
          <p>
            Sie haben es heute bis zum Rückblick auf {highestN} Durchgänge zuvor
            geschafft.
          </p>
          <br />
          <p>Sie können das Fenster jetzt schließen.</p>
          <br />
          <p>
            Bei Fragen oder Anmerkungen wenden Sie sich gerne an Lena Klein via{' '}
            <a
              href={'mailto:klein.for@uni-due.de'}
              className={'cursor-pointer text-blue-500 underline'}
            >
              klein.for@uni-due.de
            </a>
            .
          </p>
        </Card>
        <DevContainer
          className={
            'absolute bottom-6 right-4 flex -translate-y-full flex-col gap-2'
          }
        >
          <button
            className={
              'w-full rounded-md bg-blue-500 p-8 py-2 text-white hover:bg-blue-600'
            }
            onClick={() => navigate('/')}
          >
            <ArrowPathIcon className={'size-10 text-white'} />
          </button>
        </DevContainer>
      </CenteringContainer>
      <Footer />
    </>
  )
}
