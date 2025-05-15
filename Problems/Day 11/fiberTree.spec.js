import { describe, expect, it, beforeEach } from 'vitest'
import { commitNestedComponent } from './fiberTree.js'

// The arr array is module-level in answer.js, we need to access it
// Since it's not exported, we'll reset it indirectly before each test
// by importing the module fresh each time or by manipulating it directly
export class FiberNode {
  constructor(key) {
    // 节点标识
    this.key = key

    // Fiber 树结构必要属性
    this.child = null // 第一个子节点
    this.sibling = null // 下一个兄弟节点
    this.return = null // 父节点引用
  }

  // 添加子节点
  addChild(childNode) {
    if (!childNode) return this

    childNode.return = this

    if (!this.child) {
      // 如果没有子节点，直接添加
      this.child = childNode
    } else {
      // 如果已有子节点，添加为最后一个兄弟
      let lastChild = this.child
      while (lastChild.sibling) {
        lastChild = lastChild.sibling
      }
      lastChild.sibling = childNode
    }

    return childNode
  }
}

describe('Day 11 - Fiber Tree Traversal', () => {
  // Reset the global arr before each test
  beforeEach(() => {
    // Since arr is not exported, we'll create a new fiber tree and check
    // if the traversal result matches our expectations
    const testFiber = new FiberNode('reset')
    commitNestedComponent(testFiber)

    // This will run the traversal and set arr to ['reset']
    // We can verify this to ensure we're starting with a clean state
  })

  it('should traverse a single node tree correctly', () => {
    const root = new FiberNode('root')
    commitNestedComponent(root)

    // Import the module again to access the updated arr
    // This is a workaround since arr is not directly exported
    const resultKeys = getTraversalResult(root)
    expect(resultKeys).toEqual(['root'])
  })

  it('should traverse a simple tree in DFS order', () => {
    const root = new FiberNode('A')
    const child1 = new FiberNode('B')
    const child2 = new FiberNode('C')

    root.addChild(child1)
    root.addChild(child2)

    const resultKeys = getTraversalResult(root)
    expect(resultKeys).toEqual(['A', 'B', 'C'])
  })

  it('should traverse a complex tree in correct DFS order', () => {
    // Create tree:
    //       A
    //     / | \
    //    B  C  D
    //   /      /\
    //  E      F  G

    const nodeA = new FiberNode('A')
    const nodeB = new FiberNode('B')
    const nodeC = new FiberNode('C')
    const nodeD = new FiberNode('D')
    const nodeE = new FiberNode('E')
    const nodeF = new FiberNode('F')
    const nodeG = new FiberNode('G')

    nodeA.addChild(nodeB)
    nodeA.addChild(nodeC)
    nodeA.addChild(nodeD)
    nodeB.addChild(nodeE)
    nodeD.addChild(nodeF)
    nodeD.addChild(nodeG)

    const resultKeys = getTraversalResult(nodeA)
    expect(resultKeys).toEqual(['A', 'B', 'E', 'C', 'D', 'F', 'G'])
  })

  it('should handle a deeply nested tree correctly', () => {
    // Create a deep path: A -> B -> C -> D -> E
    const nodeA = new FiberNode('A')
    const nodeB = new FiberNode('B')
    const nodeC = new FiberNode('C')
    const nodeD = new FiberNode('D')
    const nodeE = new FiberNode('E')

    nodeA.addChild(nodeB)
    nodeB.addChild(nodeC)
    nodeC.addChild(nodeD)
    nodeD.addChild(nodeE)

    const resultKeys = getTraversalResult(nodeA)
    expect(resultKeys).toEqual(['A', 'B', 'C', 'D', 'E'])
  })

  it('should handle complex sibling relationships', () => {
    // Create tree:
    //     A
    //    /|\
    //   B C D
    //      /|\
    //     E F G
    const nodeA = new FiberNode('A')
    const nodeB = new FiberNode('B')
    const nodeC = new FiberNode('C')
    const nodeD = new FiberNode('D')
    const nodeE = new FiberNode('E')
    const nodeF = new FiberNode('F')
    const nodeG = new FiberNode('G')

    nodeA.addChild(nodeB)
    nodeA.addChild(nodeC)
    nodeA.addChild(nodeD)
    nodeD.addChild(nodeE)
    nodeD.addChild(nodeF)
    nodeD.addChild(nodeG)

    const resultKeys = getTraversalResult(nodeA)
    expect(resultKeys).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  })
})

// Helper function to get traversal result
function getTraversalResult(root) {
  // We need to clear any previous results and run a new traversal
  // Create a dummy node first to reset the array
  const arr = []
  function cbFunc(node) {
    arr.push(node.key)
  }
  // Now run the actual test traversal
  commitNestedComponent(root, cbFunc)
  return arr
}
