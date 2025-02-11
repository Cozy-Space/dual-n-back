interface InstructionPage3Props {
  onNextClick: () => void
  onPreviousClick: () => void
}

export function InstructionPage3(props: InstructionPage3Props) {
  const startLK = 'Starten'

  return (
    <div className={'flex w-4/5 flex-col'}>
      <div className={'flex flex-row gap-2'}>
        {/*TextContainer*/}
        <div className={'flex w-2/3 flex-1 flex-col justify-center'}>
          <p className={'mb-3 text-3xl'}>Feedback (3/3)</p>
          <ul className={'list-outside list-disc text-xl leading-loose'}>
            <li>
              Wenn Sie <b className={'text-green-700'}>richtig</b> reagiert
              haben, sehen Sie einen <b className={'text-green-700'}>grünen</b>{' '}
              Smiley und hören zwei hohe Töne.
            </li>
            <li>
              Wenn Sie <b className={'text-red-700'}>falsch</b> reagiert haben,
              sehen Sie einen <b className={'text-red-700'}>roten</b> Smiley und
              hören einen kurzen, tiefen Ton.
            </li>
            <li>Mit dem Klick auf &#34;{startLK}&#34; startet das Spiel.</li>
          </ul>
        </div>
        <div className={'flex w-1/3 flex-1 items-center justify-center'}>
          <img
            className={'h-full border-2 border-blue-500 object-contain'}
            src={'images/instructions3.jpg'}
            alt={''}
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
          {startLK}
        </button>
      </div>
    </div>
  )
}
