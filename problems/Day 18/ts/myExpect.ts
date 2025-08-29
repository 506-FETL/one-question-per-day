interface ExpectResult<T> {
  toBe: (checker: T) => boolean
  readonly not: ExpectResult<T>
}

export default function myExpect<T>(input: T): ExpectResult<T> {

}
