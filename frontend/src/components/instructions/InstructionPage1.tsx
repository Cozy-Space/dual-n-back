interface InstructionPage1Props {
  onNextClick: () => void
}

export function InstructionPage1(props: InstructionPage1Props) {
  return (
    <div className={'flex w-4/5 flex-col'}>
      <div className={'flex flex-row gap-2'}>
        {/*TextContainer*/}
        <div className={'flex w-2/3 flex-1 flex-col justify-center'}>
          <p className={'mb-3 text-3xl'}>Anleitung:</p>
          <ul className={'list-outside list-disc text-xl leading-loose'}>
            <li>
              Im Folgenden werden Sie ein 4 mal 4 Feld mit weißen Quadraten
              sehen.
            </li>
            <li>
              Sie werden in aufeinander folgenden Durchgängen jeweils ein
              Gesicht und ein Geräusch in Form eines gesprochenen Wortes hören.
            </li>
            <li>
              Sie sollen auf die <b>Positionen</b> der Gesichter und auf die{' '}
              <b>Wörter</b> zu achten.
            </li>
            <li>
              Ihre Aufgabe ist es, zu erkennen, ob die Position des Gesichtes
              des aktuellen Durchgangs mit der Position des Gesichtes aus dem
              vorherigen Durchgang übereinstimmt. Das Gleiche gilt für das
              gesprochene Wort.
            </li>
            <li>
              Reagieren Sie pro Durchgang wie folgt:
              <ul className={'list-outside list-disc pl-4 text-lg'}>
                <li>
                  Wenn die <b>Position</b> übereinstimmt, drücken Sie den Knopf
                  mit dem <b>Augen-Symbol</b>.
                </li>
                <li>
                  Wenn das gehörte <b>Wort</b> übereinstimmt, drücken Sie den
                  Knopf mit dem <b>Lautsprecher-Symbol</b>.
                </li>
                <li>
                  Wenn <b>beides</b>, also sowohl die Position des Bildes als
                  auch das gehörte Geräusch, übereinstimmt, den Knopf mit{' '}
                  <b>beiden Symbolen</b>.
                </li>
                <li>
                  Wenn <b>nichts</b> übereinstimmt, drücken Sie <b>keinen</b>{' '}
                  Knopf.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={'flex w-1/3 flex-1 items-center justify-center'}>
          <img
            className={'h-full border-2 border-blue-500 object-contain'}
            src={'images/instructions1.jpg'}
            alt={'Screenshot'}
          />
        </div>
      </div>
      <div className={'mt-8 flex flex-row justify-center gap-2'}>
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