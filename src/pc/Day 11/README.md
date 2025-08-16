# 【算法题】Fiber 树的副作用处理

## 题目背景

你正在实现一个 UI 渲染库的核心部分，它采用了类似 React 的 Fiber 架构。在这个架构中，UI 元素通过一种特殊的链表结构（Fiber 树）连接起来：

- `child`: 指向第一个子节点
- `sibling`: 指向下一个兄弟节点
- `return`: 指向父节点(需要自己设置,初始的树没有return,只有child,sibling)

每个 Fiber 节点可能标记有不同的"副作用"(effects)，表示该节点需要进行的 DOM 操作（插入、更新或删除）。

## 问题描述

实现一个函数 `processEffects`，该函数从根 Fiber 节点开始，查找并处理所有标记了副作用的节点。处理需要遵循"深度优先"的顺序，并且要确保先父节点后子节点的执行顺序。

你需要实现一个遍历算法，遵循以下基本框架:
从根节点开始,对每个节点执行一次onCommitUnmount操作来模拟react中收集副作用的过程

## 节点定义

```typescript
class FiberNode {
  key: number;
  child: FiberNode | null; // 第一个子节点
  sibling: FiberNode | null; // 下一个兄弟节点
  return: FiberNode | null; // 父节点

  constructor(tag: number, stateNode: any) {
    this.child = null;
    this.sibling = null;
    this.return = null;
  }
}
```

## 示例 Fiber 树结构

```
       A
      /
     B - C
    /
   D - E
```

使用 Fiber 链表表示为:

- A.child = B
- B.sibling = C
- B.child = D
- D.sibling = E
