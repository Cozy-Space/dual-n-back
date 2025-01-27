import { CenteringContainer } from '../components/CenteringContainer'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Footer } from '../components/Footer'

export function ImprintPage() {
  const navigate = useNavigate()

  return (
    <>
      <CenteringContainer className={'flex-col'}>
        <Card>
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Impressum
          </h1>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Fachgebiet Allgemeine Psychologie: Kognition
              <br /> Universität Duisburg-Essen
              <br /> Forsthausweg 2, 47057 Duisburg
            </p>
            <p>
              Vertreten durch:
              <br /> Benjamin Boll
              <br /> Lena Klein
              <br /> Elisa Wegmann
            </p>
            <p>
              Kontakt:
              <br /> Telefon: 0203 379 - 2519
              <br /> E-Mail: klein.for[at]uni-due.de
            </p>
            <p className={'text-center'}>
              <a
                href={'https://www.uni-due.de/kognitionspsychologie/'}
                className={'text-blue-600 underline'}
              >
                https://www.uni-due.de/kognitionspsychologie/
              </a>
            </p>
          </div>
        </Card>
        <div>
          <button
            className={
              'mt-2 w-full rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600'
            }
            onClick={() => navigate('/')}
          >
            Zurück
          </button>
        </div>
      </CenteringContainer>
      <Footer />
    </>
  )
}
