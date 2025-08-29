import { describe, expect, it } from 'vitest'
import myExpect from './myExpect'

describe('day18-myExpect', () => {
  const theSameObject = {}

  it.each([
    [3, 3, true],
    [1, 1, true],
    [Symbol(1), Symbol(1), false],
    [Symbol.for('1'), Symbol.for('1'), true],
    [+0, -0, false],
    [{}, {}, false],
    [theSameObject, theSameObject, true],
  ])('myExpect(%s).toBe(%s) 的结果应为 %s', (received, expected, result) => {
    expect(myExpect(received).toBe(expected)).toBe(result)
  })

  it.each([
    [3, 3, false],
    [1, 1, false],
    [Symbol(1), Symbol(1), true],
    [+0, -0, true],
    [Symbol.for('1'), Symbol.for('1'), false],
    [{}, {}, true],
    [theSameObject, theSameObject, false],
  ])(
    'myExpect(%s).not.toBe(%s) 的结果应为 %s',
    (received, expected, result) => {
      expect(myExpect(received).not.toBe(expected)).toBe(result)
    },
  )
})
