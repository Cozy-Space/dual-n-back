import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'

export function GamePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [activeId, setActiveId] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!experimenteeId) {
      navigate(`/`)
    }
  }, [])

  function bla() {
    setActiveId(Math.round(Math.random() * 16))
  }

  return (
    <CenteringContainer>
      <div
        className={
          'flex h-screen w-screen flex-col items-center justify-center'
        }
      >
        <Matrix activeId={activeId} />
        <div>
          <button
            className={
              'mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            }
            onClick={bla}
          >
            bla
          </button>
        </div>
      </div>
    </CenteringContainer>
  )
}
