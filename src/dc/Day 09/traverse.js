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
  let map = {}
  let result = []
  dfs(root, 0, 0, null, map)
  Object.keys(map)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((level) => {
      const arr = map[level]
      arr
        .sort((a, b) => a.deep - b.deep || a.pid.value - b.pid.value)
        .forEach((node) => result.push(node.value))
      // result = [...result, ...arr]
    })
  return result
}

function dfs(root, level, deep, pid, map) {
  if (root === null) {
    return
  }
  if (!Object.hasOwn(map, level)) {
    map[level] = []
  }
  root.deep = deep
  root.pid = pid
  map[level].push(root)
  dfs(root.left, level - 1, deep + 1, root, map)
  dfs(root.right, level + 1, deep + 1, root, map)
}
