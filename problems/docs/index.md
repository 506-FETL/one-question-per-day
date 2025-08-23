---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: one-question-per-day
  text: 506 实验室 · 每日一题
  tagline: 聚焦数据结构 / 算法 / JS 基础实现 / 工程化实践。坚持小步快跑，统一测试驱动，持续版本发布与复盘。
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /#🏁-快速开始
    - theme: alt
      text: 📂 目录结构
      link: /#📂-目录结构
    - theme: alt
      text: 📝 更新日志
      link: https://github.com/506-FETL/one-question-per-day/blob/main/CHANGELOG.md
    - theme: alt
      text: 📦 Release 下载
      link: https://github.com/506-FETL/one-question-per-day/releases

features:
  - title: ✅ 严格测试驱动 (Vitest)
    details: 每道题配套测试，提交前先本地跑通，保障解法正确性与回归稳定性。
  - title: 📅 按日归档
    details: problems/days/Day xx 规范存放题目、答案、规格与 TS 版本，方便检索复盘。
  - title: 🧪 TS 迁移实践
    details: 逐步为核心题目补全 TypeScript 类型，积累范式与最佳实践。
  - title: 🔄 自动化发布
    details: 利用 release-it + Conventional Commits 生成版本与 CHANGELOG，并产出题目压缩包。
  - title: 👥 多成员协作
    details: 按成员目录 (src/{id}/Day xx) 记录个人实现，对比不同思路。
  - title: 📚 知识复盘
    details: problems/review 下集中整理阶段性复盘与难点解析。

---

## 🏁 快速开始

```bash
git clone https://github.com/506-FETL/one-question-per-day.git
cd one-question-per-day
pnpm install
pnpm test              # 运行全部测试
pnpm test path/to/spec # 运行某个题目的测试
```

新增题目流程：

1. 在 `problems/days/Day XX/` 复制前一天模板或创建 `README.md / answer.js / *.spec.js / ts/` 目录
2. 编写实现（若有 TS 版本放入 `ts/`）
3. 补/改测试用例
4. `pnpm test` 通过
5. 使用 Conventional Commit 提交：`feat: xxx` / `fix: xxx`
6. 需要发版时执行 `pnpm release`（交互选择版本号，自动生成 tag / CHANGELOG / Release 资产）

## 📂 目录结构

```
problems/
  days/
    Day 01/                # 每日题目目录
      README.md            # 题目描述
      answer.js            # JS 实现
      *.spec.js            # 测试文件
      ts/                  # 可选：TS 版本实现
src/                       # 各成员个人实现（对照 & 探索）
scripts/                   # 发布与生成辅助脚本
CHANGELOG.md               # 基于 commit 自动生成
RELEASE_NOTES.md           # 发布说明(自定义)
```

## 🧠 题目类型

| 分类     | 示例                      | 说明                       |
| -------- | ------------------------- | -------------------------- |
| 数据结构 | 链表 / 树 / 堆 / 图       | 基础操作 + 变体场景        |
| 算法范式 | 递归 / 回溯 / DP / 贪心   | 拆分解题思路，锻炼抽象能力 |
| JS 原理  | Promise / 深拷贝 / 响应式 | 还原底层机制，掌握语言本质 |
| 工程实践 | 中间件 / 发布流程         | 结合工具链与自动化         |

## 🔄 版本与发布

采用 Semantic Versioning：`MAJOR.MINOR.PATCH`

触发发版：

- `feat:` -> MINOR
- `fix:` -> PATCH
- `feat!` / `BREAKING CHANGE:` -> MAJOR

发布时自动：

1. 计算新版本 & 更新 `package.json`
2. 生成 / 更新 `CHANGELOG.md`
3. 读取 `RELEASE_NOTES.md` 作为 Release 描述
4. 打包题目 zip 并上传到 GitHub Release

## 🤝 贡献约定

| 约定     | 说明                             |
| -------- | -------------------------------- |
| 命名     | 统一 `Day XX`（两位数）          |
| 提交信息 | 使用 Conventional Commits        |
| 测试优先 | 未加测试的实现视为不完整         |
| TS 推进  | 适合抽象的题目优先补类型         |
| 复盘     | 有代表性的解题思路写入 `review/` |

## 🧩 常见命令

```bash
pnpm test              # 运行所有测试
pnpm test problems/days/Day\ 08/*.spec.js
pnpm release           # 交互式发布
pnpm run build:problems # 生成打包资产
```

## 📦 下载与资源

- 最新题目压缩包：GitHub Release 资产 `problems.zip`
- 完整源码：Release Source Code Tarball/Zip
- 历史版本：见 [Releases](https://github.com/506-FETL/one-question-per-day/releases)

## 🗺 后续规划

- 补充更多 TS & 测试覆盖
- 增加题目标签与难度标识
- 引入性能基准（bench）
- 生成自动题目索引页

---

坚持每日一题，构建长期势能。欢迎加入或提出改进建议！
