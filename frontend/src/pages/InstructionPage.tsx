import { CenteringContainer } from '../components/CenteringContainer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { InstructionPage1 } from '../components/instructions/InstructionPage1'

import { InstructionPage3 } from '../components/instructions/InstructionPage3'
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

  function renderInstructionPage() {
    if (page === 0) {
      return <InstructionPage1 onNextClick={() => setPage(1)} />
    } else if (page === 1) {
      return (
        <InstructionPage2
          onNextClick={() => setPage(2)}
          onPreviousClick={() => setPage(0)}
        />
      )
    } else {
      return (
        <InstructionPage3
          onNextClick={() => navigate(`/game?id=${experimenteeId}`)}
          onPreviousClick={() => setPage(1)}
        />
      )
    }
  }

  return (
    <CenteringContainer className={'flex flex-col'}>
      {renderInstructionPage()}
    </CenteringContainer>
  )
}
