import type { FiberNode } from './types'
import { beforeEach, describe, expect, it } from 'vitest'
import { commitNestedComponent } from './fiberTree'

class TestFiberNode implements FiberNode {
  key: string
  child: FiberNode | null = null
  sibling: FiberNode | null = null
  return: FiberNode | null = null
  constructor(key: string) {
    this.key = key
  }

  // 添加子节点（返回新添加的子节点便于链式构建）
  addChild<T extends FiberNode>(childNode: T | null | undefined): T | this {
    if (!childNode)
      return this
    childNode.return = this
    if (!this.child) {
      this.child = childNode
    }
    else {
      let lastChild = this.child
      while (lastChild.sibling) lastChild = lastChild.sibling
      lastChild.sibling = childNode
    }
    return childNode
  }
}

describe('day 11 - Fiber Tree Traversal', () => {
  // Reset the global arr before each test
  beforeEach(() => {
    // Since arr is not exported, we'll create a new fiber tree and check
    // if the traversal result matches our expectations
    const arr: string[] = []
    function cbFunc(node: FiberNode) {
      arr.push(node.key)
    }
    const testFiber = new TestFiberNode('reset')
    commitNestedComponent(testFiber, cbFunc)

    // This will run the traversal and set arr to ['reset']
    // We can verify this to ensure we're starting with a clean state
  })

  it('should traverse a single node tree correctly', () => {
    const root = new TestFiberNode('root')
    // Import the module again to access the updated arr
    // This is a workaround since arr is not directly exported
    const resultKeys = getTraversalResult(root)
    expect(resultKeys).toEqual(['root'])
  })

  it('should traverse a simple tree in DFS order', () => {
    const root = new TestFiberNode('A')
    const child1 = new TestFiberNode('B')
    const child2 = new TestFiberNode('C')

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

    const nodeA = new TestFiberNode('A')
    const nodeB = new TestFiberNode('B')
    const nodeC = new TestFiberNode('C')
    const nodeD = new TestFiberNode('D')
    const nodeE = new TestFiberNode('E')
    const nodeF = new TestFiberNode('F')
    const nodeG = new TestFiberNode('G')

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
    const nodeA = new TestFiberNode('A')
    const nodeB = new TestFiberNode('B')
    const nodeC = new TestFiberNode('C')
    const nodeD = new TestFiberNode('D')
    const nodeE = new TestFiberNode('E')

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
    const nodeA = new TestFiberNode('A')
    const nodeB = new TestFiberNode('B')
    const nodeC = new TestFiberNode('C')
    const nodeD = new TestFiberNode('D')
    const nodeE = new TestFiberNode('E')
    const nodeF = new TestFiberNode('F')
    const nodeG = new TestFiberNode('G')

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
function getTraversalResult(root: FiberNode): string[] {
  // We need to clear any previous results and run a new traversal
  // Create a dummy node first to reset the array
  const arr: string[] = []
  function cbFunc(node: FiberNode) {
    arr.push(node.key)
  }
  // Now run the actual test traversal
  commitNestedComponent(root, cbFunc)
  return arr
}
