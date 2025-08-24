---
tags: [Fiber,深度遍历]
difficulty: medium
---

# Day 11

# Fiber 树遍历（提交阶段副作用收集模拟）

## 🧠 背景

在类 React 架构中，UI 更新会经历 _render_（生成 Fiber 树）与 _commit_（应用副作用）两个阶段。Fiber 采用一套**链式指针结构**来表示一棵树：

| 指针      | 含义                                       |
| --------- | ------------------------------------------ |
| `child`   | 第一个子节点（相当于普通树的 children[0]） |
| `sibling` | 下一个兄弟节点（相当于同层的下一个）       |
| `return`  | 指向父节点（回溯用）                       |

本题聚焦于 **“从根开始，按照先序（父 → 子 → 兄弟）深度优先”** 遍历整棵 Fiber 树，并对每个节点调用一次回调 `onCommitUnmount(node)`（题意以 _unmount_ 命名，实质上只是一次副作用处理的模拟）。

## 🎯 任务

实现函数：

```ts
export function commitNestedComponent(
  root: FiberNode | null,
  onCommitUnmount: (node: FiberNode) => void
): void
```

要求：

1. 若 `root` 为 `null`，直接返回。
2. 对**每一个节点恰好调用一次** `onCommitUnmount`，包含根节点。
3. 遍历顺序：
   - 先访问当前节点
   - 优先进入 `child` 链
   - 没有子节点则尝试 `sibling`
   - 若也没有，则不断沿 `return` 回溯，直到找到某个祖先的未访问兄弟；若没有则结束。
4. 期望用**迭代**实现（可选），避免递归栈（可用递归但要在说明中写出复杂度）。

## 🧩 FiberNode 结构（测试中示例）

（测试文件里会动态构建树，你无需改动测试里的类定义；下面是简化示意）

```ts
class FiberNode {
  key: string
  child: FiberNode | null = null
  sibling: FiberNode | null = null
  return: FiberNode | null = null
  constructor(key: string) { this.key = key }
  // 测试里提供了 addChild 辅助方法
}
```

## 🔍 示例

树形（兄弟从左到右添加）：

```
       A
     / | \
    B  C  D
   /      /\
  E      F  G
```

指针关系（部分）：

```
A.child = B
B.sibling = C
C.sibling = D
B.child = E
D.child = F
F.sibling = G
```

期望遍历顺序（先序 + 兄弟横向）：

```
A → B → E → C → D → F → G
```

## 🛠 思路提示（迭代版）

```ts
let current: FiberNode | null = root
while (current) {
  onCommitUnmount(current)

  if (current.child) {            // 1. 先深入子节点
    current = current.child
    continue
  }

  // 2. 没子节点，寻找同层兄弟或向上回溯
  while (current && !current.sibling) {
    current = current.return       // 回溯
  }
  if (current) current = current.sibling // 兄弟继续
}
```

## ⏱ 复杂度

| 实现 | 时间 | 额外空间           |
| ---- | ---- | ------------------ |
| 迭代 | O(N) | O(1)               |
| 递归 | O(N) | O(H)（H 为树高度） |

## ✅ 判定标准

通过测试需满足：

1. 顺序正确（与题目 DFS 先序 + 兄弟左→右一致）
2. 不重复、不遗漏节点
3. 空树能安全返回

## 🔄 可扩展思考

真实 React 提交阶段还会：

- 处理不同 effect 标志（Placement / Update / Deletion 等）
- 分离“挂载副作用”和“卸载副作用”阶段
  你可以在节点上加一个 `flags` 字段，在遍历时分类处理。

## 🧪 建议自测用例

1. 单节点
2. 只有一条向左/向右的链
3. 多兄弟 + 部分兄弟有子
4. 不规则“瘸腿”结构（有的节点只有第二个/第三个孙）

现在，在 `fiberTree.js` 中补全 `commitNestedComponent` 的实现即可。

## 测试代码

```js
import { beforeEach, describe, expect, it } from 'vitest'
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
    if (!childNode)
      return this

    childNode.return = this

    if (!this.child) {
      // 如果没有子节点，直接添加
      this.child = childNode
    }
    else {
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

describe('day 11 - Fiber Tree Traversal', () => {
  // Reset the global arr before each test
  beforeEach(() => {
    // Since arr is not exported, we'll create a new fiber tree and check
    // if the traversal result matches our expectations
    const arr = []
    function cbFunc(node) {
      arr.push(node.key)
    }
    const testFiber = new FiberNode('reset')
    commitNestedComponent(testFiber, cbFunc)

    // This will run the traversal and set arr to ['reset']
    // We can verify this to ensure we're starting with a clean state
  })

  it('should traverse a single node tree correctly', () => {
    const root = new FiberNode('root')
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

```

## 答案

| 类型    | 路径                                                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/days/Day 11/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2011/answer.js)       |
| TS 版本 | [problems/days/Day 11/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2011/ts/answer.ts) |
| Review  | [11.md](/review/11)                                                                                                                 |
