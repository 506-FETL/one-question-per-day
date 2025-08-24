import { describe, expect, it } from 'vitest'
import traverse, { Node } from './traverse'

describe('traverse', () => {
  it('当根节点为空时应返回空数组', () => {
    expect(traverse(null)).toEqual([])
  })

  it('对于单节点树应返回单节点值', () => {
    const root = new Node(1)
    expect(traverse(root)).toEqual([1])
  })

  it('应遍历一棵左斜树', () => {
    const root = new Node(1)
    root.left = new Node(2)
    root.left.left = new Node(3)
    expect(traverse(root)).toEqual([3, 2, 1])
  })

  it('应遍历一棵右斜树', () => {
    const root = new Node(1)
    root.right = new Node(2)
    root.right.right = new Node(3)
    expect(traverse(root)).toEqual([1, 2, 3])
  })

  it('应遍历平衡树', () => {
    //      1
    //     / \
    //    2   3
    //   /   / \
    //  4   5   6
    const root = new Node(1)
    root.left = new Node(2)
    root.right = new Node(3)
    root.left.left = new Node(4)
    root.right.left = new Node(5)
    root.right.right = new Node(6)
    expect(traverse(root)).toEqual([4, 2, 1, 5, 3, 6])
  })

  it('应能处理含有重复值的树', () => {
    //      1
    //     / \
    //    2   2
    //   /     \
    //  3       3
    const root = new Node(1)
    root.left = new Node(2)
    root.right = new Node(2)
    root.left.left = new Node(3)
    root.right.right = new Node(3)
    expect(traverse(root)).toEqual([3, 2, 1, 2, 3])
  })

  it('应处理更复杂的树结构', () => {
    //        10
    //       /  \
    //      5    15
    //     / \     \
    //    3   7     18
    //         \
    //          8
    const root = new Node(10)
    root.left = new Node(5)
    root.right = new Node(15)
    root.left.left = new Node(3)
    root.left.right = new Node(7)
    root.left.right.right = new Node(8)
    root.right.right = new Node(18)
    expect(traverse(root)).toEqual([3, 5, 10, 7, 15, 8, 18])
  })

  const node = v => new Node(v)
  it('无敌连环绕', () => {
    const root = node(1)
    root.left = node(2)
    root.left.right = node(4)
    root.left.right.right = node(7)
    root.left.right.right.left = node(9)
    root.left.right.right.left.left = node(10)
    root.right = node(3)
    root.right.left = node(5)
    root.right.left.left = node(6)
    root.right.left.left.right = node(8)
    root.right.left.left.right.right = node(11)
    expect(traverse(root)).toEqual([2, 6, 10, 1, 4, 5, 8, 9, 3, 7, 11])
  })

  it('无敌叉起绕', () => {
    const root = node(1)
    root.left = node(2)
    root.left.right = node(4)
    root.left.right.left = node(5)
    root.left.right.left.left = node(7)
    root.left.right.right = node(9)
    root.left.right.right.left = node(11)
    root.left.right.right.left.left = node(12)
    root.right = node(3)
    root.right.left = node(6)
    root.right.left.left = node(8)
    root.right.left.left.right = node(10)
    root.right.left.left.right.right = node(13)
    expect(traverse(root)).toEqual([7, 2, 5, 8, 12, 1, 4, 6, 10, 11, 3, 9, 13])
  })
})
