import type { FiberNode } from './types'

/**
 * 深度优先遍历 (DFS) 当前 fiber 子树，对每个节点执行 onCommitUnmount 回调。
 * 遍历顺序：先访问节点本身，再进入其 child，child 走到底后回溯找 sibling。
 * 与 React 内部 commitUnmount 逻辑类似的骨架：用于在卸载阶段调用清理副作用。
 *
 * @param root 根节点（遍历停止边界）
 * @param onCommitUnmount 对每个遍历到的节点调用的回调
 */
export function commitNestedComponent(
  root: FiberNode,
  onCommitUnmount: (node: FiberNode) => void,
): void {}
