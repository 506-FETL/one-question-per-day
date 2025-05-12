/* eslint-disable no-prototype-builtins */
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
  // Base case
  if (!root) return []

  let nodes = {}
  let minimum = 0,
    maximum = 0 // Keep track of min, max x coordinate

  // DFS so we explore the leftmost side to ensure sorted
  function dfs(node, x, y, parent) {
    if (!nodes.hasOwnProperty(x)) {
      nodes[x] = [[node.value, y, parent]]
    } else {
      nodes[x].push([node.value, y, parent])
    }

    minimum = Math.min(minimum, x)
    maximum = Math.max(maximum, x)

    if (node.left) {
      dfs(node.left, x - 1, y + 1, x)
    }
    if (node.right) {
      dfs(node.right, x + 1, y + 1, x)
    }
  }
  dfs(root, 0, 0)
  let res = []
  for (let i = minimum; i <= maximum; i++) {
    // Sort by y-value first, then parents' position
    nodes[i].sort((n1, n2) => {
      return n1[1] - n2[1] || n1[2] - n2[2]
    })
    res = res.concat(nodes[i].map((e) => e[0]))
  }
  return res
}
