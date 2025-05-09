import traverse from './traverse'
import { describe, it, expect } from 'vitest'

describe('traverse', () => {
  it('应该返回空数组，当根节点为null时', () => {
    expect(traverse(null)).toEqual([])
  })

  it('应该正确处理只有一个节点的树', () => {
    const root = new Node(1)
    expect(traverse(root)).toEqual([1])
  })

  it('应该正确处理左子树', () => {
    const root = new Node(1)
    root.left = new Node(2)
    expect(traverse(root)).toEqual([2, 1])
  })

  it('应该正确处理右子树', () => {
    const root = new Node(1)
    root.right = new Node(3)
    expect(traverse(root)).toEqual([1, 3])
  })

  it('应该正确处理复杂的树结构', () => {
    const root = new Node(1)
    root.left = new Node(2)
    root.right = new Node(3)
    root.left.left = new Node(4)
    root.left.right = new Node(5)
    root.right.left = new Node(6)
    root.right.right = new Node(7)

    expect(traverse(root)).toEqual([4, 2, 1, 6, 3, 7])
  })

  it('应该正确处理具有相同值的节点', () => {
    const root = new Node(1)
    root.left = new Node(1)
    root.right = new Node(1)
    expect(traverse(root)).toEqual([1, 1, 1])
  })
})
