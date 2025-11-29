import * as React from 'react'
import { ProblemAnswer, ProblemDescription, Problems } from '../../layout'
import Description from './README.mdx'

function index() {
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

export default index
