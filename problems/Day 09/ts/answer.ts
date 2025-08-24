export class Node {
  value: number
  left: Node | null
  right: Node | null
  constructor(val: number) {
    this.value = val
    this.left = null
    this.right = null
  }
}

interface LineNodeMeta {
  value: number
  deep: number
  parentLine: number
}

export default function traverse(root: Node | null): number[] {
  if (root === null)
    return []

  // key: line 偏移; value: 该列上的节点元信息数组
  const tramap: Record<number, LineNodeMeta[]> = {}
  const result: number[] = []

  function dfs(node: Node | null, line: number, deep: number, parentLine: number) {
    if (node === null)
      return

    if (!Object.hasOwn(tramap, line)) {
      tramap[line] = []
    }

    tramap[line].push({ value: node.value, deep, parentLine })

    dfs(node.left, line + 1, deep + 1, line)
    dfs(node.right, line - 1, deep + 1, line)
  }

  dfs(root, 0, 0, 0)

  Object.keys(tramap)
    .map(Number)
    .sort((a, b) => b - a) // line 从大到小
    .forEach((key) => {
      tramap[key]
        .sort((a, b) => a.deep - b.deep || b.parentLine - a.parentLine)
        .forEach(meta => result.push(meta.value))
    })

  return result
}
