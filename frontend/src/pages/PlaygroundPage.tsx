import { CenteringContainer } from '../components/CenteringContainer'
import { Feedback } from '../components/Feedback'

export function PlaygroundPage() {
  return (
    <CenteringContainer>
      <Feedback feedback={'positive'} muted={false} />
    </CenteringContainer>
  )
}
