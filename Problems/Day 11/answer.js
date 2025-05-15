export function commitNestedComponent(root, onCommitUnmount) {
  // 深度优先遍历整个子树
  let node = root

  // 使用循环代替递归，遵循 Fiber 树的特殊遍历方式
  while (node !== null) {
    // 对当前节点执行卸载回调
    onCommitUnmount(node)

    // 如果有子节点，先处理子节点
    if (node.child !== null) {
      node = node.child
      continue
    }

    // 如果已经到达根节点的最深处，开始回溯
    if (node === root) {
      return
    }

    // 没有子节点了，处理兄弟节点
    while (node.sibling === null) {
      // 如果没有兄弟节点，返回父节点
      if (node.return === null || node.return === root) {
        return
      }
      node = node.return
    }

    // 处理下一个兄弟节点
    node = node.sibling
  }
}
