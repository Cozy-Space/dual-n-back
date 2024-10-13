import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'

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
    <CenteringContainer>
      <Card>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="userId"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Probanden-ID:
          </label>
          <input
            type="text"
            id="userId"
            value={experimenteeId}
            onChange={(e) => setExperimenteeId(e.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12-654"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Weiter
          </button>
        </form>
      </Card>
    </CenteringContainer>
  )
}
