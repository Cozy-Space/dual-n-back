import { CenteringContainer } from '../components/CenteringContainer'
import { Feedback } from '../components/Feedback'

export function PlaygroundPage() {
  return (
    <CenteringContainer>
      <Feedback
        feedback={{
          visual: 'positive',
          auditory: 'positive'
        }}
        muted={false}
      />
    </CenteringContainer>
  )
}
