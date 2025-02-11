interface InstructionPage1Props {
  onNextClick: () => void
}

export function InstructionPage1(props: InstructionPage1Props) {
  return (
    <div className={'flex w-4/5 flex-col'}>
      <div className={'flex flex-row gap-2'}>
        <div className={'flex w-2/3 flex-1 flex-col justify-center'}>
          <p className={'mb-3 text-3xl'}>Anleitung (1/3)</p>
          <ul className={'list-outside list-disc text-xl leading-loose'}>
            <li>
              Im Folgenden werden Sie ein 4x4 großes Feld mit weißen Quadraten
              sehen.
            </li>
            <li>
              Sie werden in aufeinander folgenden Durchgängen jeweils ein Bild
              eines Gesichts sehen und ein gesprochenes Wort hören.
            </li>
            <li>
              Sie sollen auf die <b>Positionen</b> der Gesichter und auf die{' '}
              <b>Wörter</b> achten.
            </li>
            <li>
              Ihre Aufgabe ist es, zu erkennen, ob die Position des Gesichtes
              des aktuellen Durchgangs mit der Position des Gesichtes aus dem
              vorherigen Durchgang übereinstimmt.
            </li>
            <li>
              Gleichzeitig sollen Sie auch erkennen, ob das gesprochene Wort des
              aktuellen Durchgangs mit dem gesprochenen Wort des vorherigen
              Durchgangs übereinstimmt.
            </li>
            <li>Sie erhalten regelmäßig neue Anweisungen.</li>
          </ul>
        </div>
        <div className={'flex w-1/3 flex-1 items-center justify-center'}>
          <img
            className={'h-full border-2 border-blue-500 object-contain'}
            src={'images/instructions1.jpg'}
            alt={''}
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
