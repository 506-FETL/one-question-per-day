import { ProblemAnswer, ProblemDescription, Problems } from '../../layout'
import Description from './README.mdx'

export default function Problem() {
  return (
    <Problems>
      <ProblemDescription>
        <Description />
      </ProblemDescription>
      <ProblemAnswer>
        {/* Your answer goes here */}
        <div>Answer</div>
      </ProblemAnswer>
    </Problems>
  )
}
