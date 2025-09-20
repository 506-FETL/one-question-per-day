// This is the class for the node
// you can use this directly as it is bundled with your code

class Node {
  value
  left
  right
  constructor(val) {
    this.value = val
    this.left = null
    this.right = null
  }
}

/**
 * @param {Node} root
 * @return {string}
 */
export function serialize(root) {
  if (!root)
    return []

  const res = []
  const queue = [root]

  while (queue.length > 0) {
    const node = queue.shift()

    if (node) {
      res.push(node.value)
      queue.push(node.left)
      queue.push(node.right)
    }
    else {
      res.push('null')
    }
  }

  while (res[res.length - 1] === 'null') {
    res.pop()
  }

  return res.join(',')
}

/**
 * @param {string} str
 * @return {Node}
 */
export function deserialize(str) {
  if (!str || str.length === 0)
    return null

  const root = new Node(str[0])
  const queue = [root]
  let i = 1

  while (i < str.length) {
    const parent = queue.shift()

    // 左孩子
    if (i < str.length && str[i] !== null) {
      parent.left = new Node(str[i])
      queue.push(parent.left)
    }
    i++

    // 右孩子
    if (i < str.length && str[i] !== null) {
      parent.right = new Node(str[i])
      queue.push(parent.right)
    }
    i++
  }

  return root
}
