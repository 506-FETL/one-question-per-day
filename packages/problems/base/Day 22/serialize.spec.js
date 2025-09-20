import { describe, expect, it } from 'vitest'
import { deserialize, serialize } from './serialize'

// Helper to build plain tree nodes (since Node class not exported)
function node(value, left = null, right = null) {
  return { value, left, right }
}

describe('serialize / deserialize (Day 22)', () => {
  it('serialize(null) 应返回空数组 [] (符合当前实现)', () => {
    expect(serialize(null)).toEqual([])
  })

  it('序列化单节点', () => {
    const tree = node('A')
    expect(serialize(tree)).toBe('A')
  })

  it('序列化不平衡二叉树并去除尾部多余 null', () => {
    //    A
    //   /
    //  B
    // /
    // C
    const tree = node('A', node('B', node('C'), null), null)
    const s = serialize(tree)
    expect(s).toBe('A,B,null,C')
    expect(s.endsWith('null')).toBe(false)
  })

  it('序列化完整两层 (数字值)', () => {
    //    1
    //   / \
    //  2   3
    const tree = node(1, node(2), node(3))
    expect(serialize(tree)).toBe('1,2,3')
  })

  it('deserialize 空字符串返回 null', () => {
    expect(deserialize('')).toBeNull()
  })

  it('deserialize 纯字符序列 (无逗号) 能正确构建完全二叉树前三个节点', () => {
    const root = deserialize('ABC')
    expect(root.value).toBe('A')
    expect(root.left?.value).toBe('B')
    expect(root.right?.value).toBe('C')
    // 由于长度耗尽，不再生成更多节点
    expect(root.left.left).toBeNull()
  })

  it('serialize 与 deserialize 不兼容的缺陷: round-trip 失败 (暴露当前逻辑问题)', () => {
    const tree = node('A', node('B', node('C'), null), null)
    const s1 = serialize(tree) // 'A,B,null,C'
    const rebuilt = deserialize(s1) // 逐字符解析
    const s2 = serialize(rebuilt)
    expect(s2).not.toBe(s1) // 证明当前实现不匹配
  })

  it('deserialize(serialize(单节点)) 结果并非期望的同构树 (因逗号处理问题)', () => {
    const original = node('X')
    const s = serialize(original) // 'X'
    const rebuilt = deserialize(s)
    // 这里恰好还能匹配 (单字符无逗号)：
    expect(rebuilt.value).toBe('X')
    expect(rebuilt.left).toBeNull() // deserialize 不会主动补 null
    expect(rebuilt.right).toBeNull()
  })

  it('deserialize 解析包含逗号的序列时会把逗号当作节点值 (验证缺陷)', () => {
    const s = 'A,B' // 这并不是 serialize 输出 (缺少逗号分隔逻辑支持)
    const root = deserialize(s)
    // root: 'A', left: ',', right: 'B'
    expect(root.value).toBe('A')
    expect(root.left?.value).toBe(',')
    expect(root.right?.value).toBe('B')
  })
})
