import { ProblemAnswer, ProblemDescription, Problems } from '../../layout'
import Button from './Button'
import Description from './README.mdx'

export default function Problem() { // default | outline | text
  return (
    <Problems>
      <ProblemDescription>
        <Description />
      </ProblemDescription>
      <ProblemAnswer>
        {/* Your answer goes here */}
        <Button variant="default" loading={true}> Click Me</Button>
      </ProblemAnswer>
    </Problems>
  )
}
