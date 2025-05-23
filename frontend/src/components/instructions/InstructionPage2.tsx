interface InstructionPage2Props {
  onNextClick: () => void
  onPreviousClick: () => void
}

export function InstructionPage2(props: InstructionPage2Props) {
  return (
    <div className={'flex w-4/5 flex-col'}>
      <div className={'flex flex-row gap-2'}>
        <div className={'flex w-2/3 flex-1 flex-col justify-center'}>
          <p className={'mb-3 text-3xl'}>Ihre Aufgabe (2/3)</p>
          <ul className={'list-outside list-disc text-xl leading-loose'}>
            <li>
              Wenn ausschließlich die <b>Position</b> des Gesichts
              übereinstimmt, drücken Sie den Knopf mit dem <b>Augen-Symbol</b>.
            </li>
            <li>
              Wenn ausschließlich das gesprochene <b>Wort</b> übereinstimmt,
              drücken Sie den Knopf mit dem <b>Lautsprecher-Symbol</b>.
            </li>
            <li>
              Wenn <b>beides</b>, also sowohl die Position des Gesichts als auch
              das gesprochene Wort, übereinstimmt, drücken Sie den Knopf mit{' '}
              <b>beiden Symbolen</b>.
            </li>
            <li>
              Wenn <b>nichts</b> übereinstimmt, drücken Sie <b>keinen</b> Knopf.
            </li>
            <li>
              Reagieren Sie immer direkt, nachdem Ihnen das Bild angezeigt wurde
              und Sie das Wort gehört haben.
            </li>
          </ul>
        </div>
        <div className={'flex w-1/3 flex-1 items-center justify-center'}>
          <img
            className={'h-full border-2 border-blue-500 object-contain'}
            src={'images/instructions2.jpg'}
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
          Weiter
        </button>
      </div>
    </div>
  )
}
