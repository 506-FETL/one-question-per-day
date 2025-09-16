// This is the class for the node
// you can use this directly as it is bundled with your code
export class Node {
  constructor(val) {
    this.value = val
    this.left = null
    this.right = null
  }
}
// }
/**
 * @param {Node} root
 * @returns {number[]}
 */
export default function traverse(root) {
  if (!root)
    return []

  const nodeList = []

  function DFS(node, x, y, f) {
    if (!node)
      return

    nodeList.push({
      value: node.value,
      x,
      y,
      f,
    })

    DFS(node.left, x - 1, y - 1, x)
    DFS(node.right, x + 1, y - 1, x)
  }

  DFS(root, 0, 0)

  nodeList.sort((a, b) => {
    if (a.x !== b.x)
      return a.x - b.x
    if (a.y !== b.y)
      return b.y - a.y
    return a.f - b.f
  })

  // 返回排序后的节点值
  return nodeList.map(node => node.value)
}
