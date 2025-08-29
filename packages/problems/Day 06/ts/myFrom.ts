// 类型定义
interface ArrayLike<T> {
  readonly length: number
  readonly [n: number]: T
}

type MapFunction<T, U> = (value: T, index: number) => U

/**
 * 自定义实现 Array.from 方法，将类数组对象或可迭代对象转换为数组。
 *
 * @param arrayLike - 类数组对象或可迭代对象。
 * @param mapFn - 可选的映射函数，用于对每个元素进行处理。
 * @param thisArg - 可选的上下文对象，用于绑定 `mapFn` 的 `this` 值。
 * @returns 返回一个新数组，包含从 `arrayLike` 转换而来的元素。
 * @throws 如果 `arrayLike` 为 null 或 undefined，抛出类型错误。
 * @throws 如果提供的 `mapFn` 不是函数，抛出类型错误。
 */
export default function myFrom<T, U = T>(
  arrayLike: ArrayLike<T> | Iterable<T> | null | undefined,
  mapFn?: MapFunction<T, U>,
  thisArg?: any,
): U[] {}
