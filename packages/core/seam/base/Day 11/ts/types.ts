export interface FiberNode {
  child: FiberNode | null
  sibling: FiberNode | null
  return: FiberNode | null
  [key: string]: any
}
