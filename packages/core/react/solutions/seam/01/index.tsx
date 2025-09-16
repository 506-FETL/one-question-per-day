import { ProblemAnswer, ProblemDescription, Problems } from '@layout/index'
import Answer from './answer.mdx'
import Description from './README.mdx'

export default function Problem() {
  return (
    <Problems>
      <ProblemDescription>
        <Description />
      </ProblemDescription>
      <ProblemAnswer>
        <Answer />
      </ProblemAnswer>
    </Problems>
  )
}
