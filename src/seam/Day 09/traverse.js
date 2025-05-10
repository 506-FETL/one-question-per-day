// This is the class for the node
// you can use this directly as it is bundled with your code
export class Node {
  constructor(val) {
    this.value = val
    this.left = null
    this.right = null
  }
}
/**
 * @param {Node} root
 * @returns {number[]}
 */
export default function traverse(root) {
  if (root === null) return []

  const tramap = {}
  const result = []

  function dfs(root, line, deep, parentLine) {
    if (root === null) return

    const value = root.value
    if (!Object.hasOwn(tramap, line)) {
      tramap[line] = []
    }

    tramap[line].push({ value, deep, parentLine })

    dfs(root.left, line + 1, deep + 1, line)
    dfs(root.right, line - 1, deep + 1, line)
  }

  dfs(root, 0, 0, 0)

  Object.keys(tramap)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach((key) => {
      tramap[key]
        .sort((a, b) => a.deep - b.deep || b.parentLine - a.parentLine)
        .forEach((node) => {
          result.push(node.value)
        })
    })

  return result
}
