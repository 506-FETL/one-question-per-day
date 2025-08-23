---
next:
  text: Day 01
  link: ./Day-01
---

# 题目总览 (Days)

沉淀每日一题：聚焦「数据结构 / 算法范式 / JS 原理 / 工程模式」。建议策略：实现优先 → 测试驱动 → 次日复盘 → 标注可抽象的模式与复用点。

## 🚦 进度与状态

| 指标        | 数值                  | 说明                   |
| ----------- | --------------------- | ---------------------- |
| 已收录题目  | 18                    | 当前 Day-18 截止       |
| 已有复盘    | 18                    | 对应 `/review/` 全覆盖 |
| TS 迁移占比 | （手动统计）          | 可在后续脚本化标记     |
| 测试覆盖    | 100%（按题存在 spec） | 需结合覆盖率报告验证   |

> 后续可自动脚本：扫描 `problems/days` 生成本页 & 标记缺失项（如无测试 / 无 TS / 无复盘）。

## 📑 题目索引（基础表）

| Day | 链接               | 标题                           | 标签                 |
| --- | ------------------ | ------------------------------ | -------------------- |
| 01  | [Day 01](./Day-01) | 🎉 JS 版归并排序               | 排序 / 分治          |
| 02  | [Day 02](./Day-02) | 生成器转异步函数               | 异步封装 / generator |
| 03  | [Day 03](./Day-03) | 精简 Vue 响应式                | Proxy / 依赖收集     |
| 04  | [Day 04](./Day-04) | sum() 柯里化判断               | 柯里化 / 隐式转换    |
| 05  | [Day 05](./Day-05) | 深拷贝实现                     | 复制 / 引用处理      |
| 06  | [Day 06](./Day-06) | myFrom (Array.from)            | Polyfill / 迭代协议  |
| 07  | [Day 07](./Day-07) | middleware 机制                | 设计模式 / 控制流    |
| 08  | [Day 08](./Day-08) | Promise 实现                   | 异步 / 状态机        |
| 09  | [Day 09](./Day-09) | 二叉树垂直遍历                 | 树 / 坐标排序        |
| 10  | [Day 10](./Day-10) | call/apply/bind/new/instanceof | this / 原型链        |
| 11  | [Day 11](./Day-11) | Fiber 树遍历副作用             | Fiber / 深度遍历     |
| 12  | [Day 12](./Day-12) | compose 函数组合               | 函数式管道           |
| 13  | [Day 13](./Day-13) | add 链式数值                   | Proxy / ToPrimitive  |
| 14  | [Day 14](./Day-14) | Observable                     | 观察者模式           |
| 15  | [Day 15](./Day-15) | Function.prototype.call        | this / 绑定规则      |
| 16  | [Day 16](./Day-16) | 千位分隔符                     | 字符串格式化         |
| 17  | [Day 17](./Day-17) | 数组去重 deduplicate           | 数组 / 去重          |
| 18  | [Day 18](./Day-18) | 迷你 Jest 测试                 | 测试 / 断言          |

## 🧭 推荐学习路径

1. 快速语法 & this：Day 10 → Day 15
2. 异步掌握：Day 02 → Day 08 （扩展：事件循环）
3. 函数式抽象：Day 04 → Day 12
4. 数据结构 / 遍历：Day 01 → Day 09 → Day 11
5. 工程模式：Day 07 → Day 14 → Day 18
6. Proxy & 隐式转换：Day 13 （结合 Day 04 / 05 复盘）

## 🧪 测试驱动提示

统一在 `*.spec.js` 中：

- 给出边界输入（空数组 / null 节点 / 重复值）
- 对协议实现（Promise、Observable）添加异步断言与竞态测试
- 利用覆盖率报告（可后续整合 badge）定位未覆盖逻辑分支

## 🤝 如何新增题目

1. `problems/days/Day-XX.md`：题目描述（保持结构统一：描述 / 输入输出 / 示例 / 进阶）
2. `answer.js` + 可选 `ts/answer.ts`
3. 添加对应 `*.spec.js`（至少：正常 / 边界 / 异常）
4. 提交信息：`feat(day-xx): 题目简述`
5. 若补 TS、复盘：分开提交，方便回溯

## 🛠 后续自动化可能

| 方向         | 说明                                        |
| ------------ | ------------------------------------------- |
| 题目索引脚本 | 读取文件头部 H1 + 标签注释生成本页          |
| 标签规范化   | 约定 frontmatter: `tags: [tree, traversal]` |
| 统计面板     | 生成 JSON -> 前端可视化（完成度环形图）     |
| 缺失检测     | 标记缺失：tests / ts / review / tags        |
| 难度评估     | 基于标签 + 行数/复杂度打基础分              |

## 📌 标记规范（建议引入）

在题目 Markdown frontmatter：

```yaml
tags: [tree, traversal]
difficulty: medium
topics: [dfs, ordering]
related: [Day-01, Day-11]
```

## ⚡ 快速入口

- 回到首页：[/](/)
- 复盘索引：[/review/index](/review/index)
- 最新题目：[/days/Day-18](/days/Day-18)

> 想让此页完全脚本化？可新增脚本：`scripts/gen-days-index.mjs` 读取 `problems/days` 并写回本文件。
