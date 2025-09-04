import { ProblemAnswer, ProblemDescription, Problems } from '../../layout'
import Button from './Button'
import Description from './README.mdx'

export default function Problem() {
  return (
    <Problems>
      <ProblemDescription>
        <Description />
      </ProblemDescription>
      <ProblemAnswer>
        {/* Your answer goes here */}
        <Button />
      </ProblemAnswer>
    </Problems>
  )
}
