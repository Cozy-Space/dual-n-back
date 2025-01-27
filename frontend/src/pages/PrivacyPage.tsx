import { CenteringContainer } from '../components/CenteringContainer'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'

export function PrivacyPage() {
  const navigate = useNavigate()

  return (
    <>
      <CenteringContainer className={'flex-col'}>
        <div>
          <button
            className={
              'mb-2 w-full rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600'
            }
            onClick={() => navigate('/')}
          >
            Zurück
          </button>
        </div>
        <div className={'rounded-lg bg-white p-6 shadow-md'}>
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Datenschutzerklärung
          </h1>
          <p className={'font-bold'}>1. Hinweise zur Datenverarbeitung</p>
          <p>
            Entsprechend Art. 13 der Datenschutz-Grundverordnung (DSGVO)
            informieren wir Sie über die Verarbeitung Ihrer personenbezogenen
            Daten (Art. 4 Abs. 1 DSGVO).
          </p>
          <p className={'mt-2 font-bold'}>Rechtsgrundlage</p>
          <p>
            Rechtsgrundlage für die Verarbeitung Ihrer personenbezogenen Daten
            ist Ihre Einwilligung nach Art. 6 Abs. 1a) DSGVO. Ihre Teilnahme ist
            freiwillig. Wir behandeln alle erhobenen Daten streng vertraulich
            und entsprechend der gesetzlichen Datenschutzvorschriften.
          </p>
          <p className={'mt-2 font-bold'}>Art der Speicherung</p>
          <p>
            Alle Angaben, die Sie im Rahmen dieser Untersuchung tätigen, werden{' '}
            <b>pseudonymisiert</b> (Art. 4 Abs. 5 DSGVO), d.h. mittels eines
            Ihnen zugewiesenen Pseudonyms (Codes) in Papierform und/oder
            elektronisch gespeichert. Das Pseudonym ermöglicht uns, die in der
            Studie erhobenen Daten (z.B. aus Fragebögen und Computer-Aufgaben)
            miteinander in Beziehung zu setzen, ohne einen direkten Rückschluss
            auf Ihre Person ziehen zu können. Das heißt, dass die in der Studie
            erhobenen Daten nicht eindeutig Ihrer Person zugeordnet werden
            können. Ihre personenbezogenen Daten, die zur Kontaktaufnahme mit
            Ihnen dienen (z.B. Ihre E-Mailadresse zur Terminvereinbarung), sowie
            die von Ihnen ausgefüllte Einwilligungserklärung werden getrennt von
            den Studiendaten aufbewahrt bzw. gespeichert.{' '}
          </p>
          <p className={'mt-2 font-bold'}>Zweck</p>
          <p>
            Die erhobenen Daten werden ausschließlich zu{' '}
            <b>wissenschaftlichen Zwecken</b> verwendet (siehe Art. 89 DSGVO).
            Die in der Studie erhobenen Daten können für wissenschaftliche
            Darstellungen und Veröffentlichungen verwendet und anderen
            Wissenschaftler*innen zur Verfügung gestellt werden. Dies geschieht
            dann ausschließlich in <b>anonymisierter</b> Form, d.h. dass{' '}
            <b>kein Rückschluss auf Ihre Person</b> mehr möglich ist.
            Einzelfallauswertungen werden nicht vorgenommen.
          </p>
          <p>
            Zugriff auf Ihre{' '}
            <span className={'underline'}>personenbezogenen</span> Daten haben
            ausschließlich Studiendurchführende und Mitarbeitende des
            Fachgebiets Allgemeine Psychologie: Kognition.{' '}
            <b>
              Ihre <span className={'underline'}>personenbezogenen</span> Daten
              werden <span className={'underline'}>nicht</span> an Dritte
              weitergegeben!
            </b>
          </p>
          <p className={'mt-2 font-bold'}>Rechtsbelehrung</p>
          <p>
            Sie haben das Recht, Auskunft über Herkunft, Empfänger und Zweck
            Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
            außerdem das Recht, die nachträgliche Berichtigung, Löschung,
            Widerrufung oder Einschränkung der Verarbeitung dieser Daten zu
            verlangen (Art. 15-18 DSGVO). Um von diesen Rechten Gebrauch zu
            machen, nutzen Sie bitte die oben angegebene Kontaktmöglichkeit. Da
            die in der Studie erhobenen Daten nicht eindeutig Ihrer Person
            zugeordnet werden können, ist die nachträgliche Auskunft, Löschung,
            Berichtigung, Widerrufung und Einschränkung der Verarbeitung dieser
            Daten nicht möglich.
          </p>
          <p className={'mt-2 font-bold'}>Kriterien für die Speicherdauer</p>
          <p>
            Die im Rahmen der Studie erhobenen Daten werden solange gespeichert,
            wie sie für die fortlaufende Forschung relevant sind (Art.13 Abs. 2a
            & Art.15 Abs.1d DSGVO). In der Regel werden sämtliche im Rahmen
            wissenschaftlicher Studien erhobene Daten für zehn Jahre nach
            Abschluss des jeweiligen Projekts aufbewahrt – entsprechend der
            „Leitlinien zur Sicherung guter wissenschaftlicher Praxis“ der
            Deutschen Forschungsgesellschaft DFG (
            <a
              className={'text-blue-500 underline'}
              href={
                'https://www.dfg.de/foerderung/grundlagen_rahmenbedingungen/gwp/index.html'
              }
            >
              www.dfg.de/foerderung/grundlagen_rahmenbedingungen/gwp/index.html
            </a>
            ). Bitte beachten Sie, dass eine Löschung von Daten, die bereits in
            wissenschaftlichen Veröffentlichungen berichtet oder auf
            wissenschaftlichen Datenbanken hochgeladen sind, nachträglich nicht
            mehr erfolgen kann, da durch die erfolgte Anonymisierung die
            Zuordnung der Daten zu bestimmten Personen nicht mehr möglich ist.
          </p>
          <p className={'mt-2 font-bold'}>Verantwortliche</p>
          <p>
            Verantwortlich im Sinne der DSGVO ist der Lehrstuhl Allgemeine
            Psychologie: Kognition (Prof. Dr. Matthias Brand) der Universität
            Duisburg-Essen mit den o.a. Kontaktdaten. Datenschutzbeauftragter
            der Universität Duisburg-Essen ist Dr. Kai-Uwe Loser (
            <a
              className={'text-blue-500 underline'}
              href={'mailto:kai-uwe.loser@uni-due.de'}
            >
              kai-uwe.loser@uni-due.de
            </a>
            ). Weitere Informationen zum Thema Datenschutz an der Universität
            Duisburg-Essen finden Sie unter{' '}
            <a
              className={'text-blue-500 underline'}
              href={'https://www.uni-due.de/verwaltung/datenschutz'}
            >
              www.uni-due.de/verwaltung/datenschutz
            </a>
            . Weiterhin besteht für Sie ein Beschwerderecht bei einer beliebigen
            Aufsichtsbehörde, zum Beispiel beim Landesbeauftragten für
            Datenschutz und Informationsfreiheit Nordrhein-Westfalen (
            <a
              className={'text-blue-500 underline'}
              href={'https://www.ldi.nrw.de'}
            >
              www.ldi.nrw.de
            </a>
            ) (Art.13 Abs. 2d & Art. 77 DSGVO).
          </p>
          <p className={'mt-2 font-bold'}>2. Hinweise zur Studienteilnahme</p>
          <p className={'mt-2 font-bold'}>Freiwilligkeit</p>
          <p>
            An dieser Untersuchung nehmen Sie <b>freiwillig</b> teil. Ihr
            Einverständnis können Sie jederzeit und ohne Angabe von Gründen
            widerrufen. Ein eventueller Widerruf hat keinerlei negative
            Auswirkungen für Sie.
          </p>
          <p className={'mt-2 font-bold'}>Versicherung</p>
          <p>
            Es liegt kein Versicherungsschutz vor. Wir weisen darauf hin, dass
            Sie für die direkten Wege zum und vom Studienzentrum nicht
            unfallversichert sind. Das heißt, für Schäden, die auf dem Weg zum
            Untersuchungsort und auf dem Rückweg entstehen, haften Sie als
            Studienteilnehmer*in selbst. Die Teilnahme erfolgt ebenfalls auf
            eigene Gefahr. Die Universität haftet in keinem Fall bei
            unverschuldeten Gesundheitsschäden oder Sachschäden. Sofern Sie als
            studienteilnehmende Person der Universität einen Schaden vorsätzlich
            zufügen, haften Sie für die von Ihnen verursachten Schäden gegenüber
            der Universität (bspw. im Rahmen einer Privathaftpflicht). Einen
            Schaden, der Ihrer Meinung nach auf dieses Forschungsprojekt
            zurückzuführen ist (z.B. aufgrund von Unterweisungsfehlern), melden
            Sie uns bitte unverzüglich, damit ein potentielles Mitverschulden
            der Universität geprüft werden kann.
          </p>
        </div>
      </CenteringContainer>
      <Footer />
    </>
  )
}
