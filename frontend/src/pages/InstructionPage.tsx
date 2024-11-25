import { CenteringContainer } from '../components/CenteringContainer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { InstructionPage1 } from '../components/instructions/InstructionPage1'
import { InstructionPage2 } from '../components/instructions/InstructionPage2'

export function InstructionPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (!experimenteeId) {
      navigate(`/`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CenteringContainer className={'flex flex-col'}>
      {page === 0 ? (
        <InstructionPage1 onNextClick={() => setPage(1)} />
      ) : (
        <InstructionPage2
          onNextClick={() => navigate(`/game?id=${experimenteeId}`)}
          onPreviousClick={() => setPage(0)}
        />
      )}
    </CenteringContainer>
  )
}
