interface InstructionPage2Props {
  onNextClick: () => void
  onPreviousClick: () => void
}

export function InstructionPage2(props: InstructionPage2Props) {
  return (
    <div className={'flex w-4/5 flex-col'}>
      <div className={'flex flex-row gap-2'}>
        {/*TextContainer*/}
        <div className={'flex w-2/3 flex-1 flex-col justify-center'}>
          <p className={'mb-3 text-3xl'}>Anleitung:</p>
          <ul className={'list-outside list-disc text-xl leading-loose'}>
            <li>
              Sie erhalten Feedback, ob Sie richtig reagiert haben oder nicht.
            </li>
            <li>
              Wenn Sie richtig auf eine Positionsübereinstimmung reagiert haben,
              bekommen Sie einen grünen, glücklichen Smiley. Wenn Sie falsch
              reagiert haben, einen roten, unglücklichen Smiley.
            </li>
            <li>
              Wenn Sie richtig auf eine Wortübereinstimmung reagiert haben,
              hören Sie einen einzelnen, hohen Ton. Wenn Sie falsch reagiert
              haben, hören Sie zwei kurze, tiefe Töne.
            </li>
            <li>
              Wenn Sie richtig auf die Übereinstimmung von Beidem richtig
              reagiert haben, bekommen Sie sowohl den grünen, glücklichen
              Smiley, als auch den einzelnen, hohen Ton. Wenn Sie falsch
              reagiert haben, erhalten Sie den roten, unglücklichen Smiley und
              die zwei kurzen, tiefen Töne.
            </li>
            <li>
              Wenn Sie nichts gedrückt haben, weil es keine Übereinstimmung gab,
              erhalten Sie auch sowohl den grünen, glücklichen Smiley, als auch
              den einzelnen, hohen Ton. Wenn Sie nichts gedrückt haben, obwohl
              es eine Übereinstimmung gab, erhalten Sie den roten, unglücklichen
              Smiley und die zwei kurzen, tiefen Töne.
            </li>
          </ul>
        </div>
        <div className={'flex w-1/3 flex-1 items-center justify-center'}>
          <img
            className={'h-full border-2 border-blue-500 object-contain'}
            src={'images/instructions2.jpg'}
            alt={'Screenshot'}
          />
        </div>
      </div>
      <div className={'mt-8 flex flex-row justify-center gap-2'}>
        <button
          className={
            'rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
          }
          onClick={props.onPreviousClick}
        >
          Zurück
        </button>
        <button
          className={
            'rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
          }
          onClick={props.onNextClick}
        >
          Weiter
        </button>
      </div>
    </div>
  )
}
