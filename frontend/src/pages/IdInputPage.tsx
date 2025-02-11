import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'
import { DevContainer } from '../components/DevContainer'
import { Footer } from '../components/Footer'
import { Logos } from '../components/Logos'

export function IdInputPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [experimenteeId, setExperimenteeId] = useState('')
  const paramId = searchParams.get('id')

  useEffect(() => {
    if (paramId) {
      navigate(`/prepare?id=${paramId}`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/prepare?id=${experimenteeId}`)
  }

  return (
    <>
      <CenteringContainer className={'flex-col gap-8'}>
        <Logos />
        <Card>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="userId"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Proband:innen-ID:
            </label>
            <input
              type="text"
              id="userId"
              value={experimenteeId}
              onChange={(e) => setExperimenteeId(e.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="'test' ist keine gültige id ;)"
            />
            <button
              type="submit"
              className={
                'w-full rounded-md bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600'
              }
            >
              Weiter
            </button>
          </form>
          <DevContainer className={'mt-4 flex flex-col gap-2'}>
            <button
              className={
                'w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600'
              }
              onClick={() => navigate('/prepare?id=test_test_test')}
            >
              Weiter, aber mit ID
            </button>
            <button
              className={
                'w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600'
              }
              onClick={() => navigate('/game?id=test_test_test')}
            >
              Weiter, aber direkt zum Spiel
            </button>
            <button
              className={
                'w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600'
              }
              onClick={() => navigate('/playground')}
            >
              Playground
            </button>
            <button
              className={
                'w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600'
              }
              onClick={() =>
                navigate(`/error`, {
                  state: { errorCode: 2005, experimenteeId: 'blablablaöäöü' }
                })
              }
            >
              ErrorPage
            </button>
          </DevContainer>
        </Card>
      </CenteringContainer>
      <Footer version={'v0.10.1-alpha'} />
    </>
  )
}
