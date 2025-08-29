# 506 实验室 · 每日一题 🚀

一个围绕 数据结构 / 算法 / JS 基础实现 / 工程化实践 的“日更式”练习与复盘项目。我们追求：小步快跑、测试先行、持续复盘、渐进式类型增强。🧪📈

![diagram](/assets/diagram.png)

## 🥅 核心目标

- 📌 形成高频、低负担的编程训练节奏
- 🧠 积累可复用的实现范式与边界用例
- 🔍 借助测试快速验证 & 回归
- 🧾 通过复盘文档沉淀知识、记录演进
- 🧱 逐步引入 TypeScript，提高类型表达力

## 📁 目录结构（精简视图）

```
one-question-per-day/
├── problems/                # 每日题库（Day 01..N）
│   ├── Day 01/
│   │   ├── README.md        # 题目说明
│   │   ├── answer.js        # 参考答案（可多解）
│   │   ├── <topic>.js       # 可选：题目主文件
│   │   ├── <topic>.spec.js  # 测试（Vitest）
│   │   └── ts/              # 逐步补充的 TS 实现 / 类型演练
│   └── ...
├── src/                     # （按需）成员个性化实现对比
│   └── <member>/Day XX/
├── docs/                    # 文档站 (VitePress)
│   ├── days/                # 每日题目索引 / 汇总
│   ├── review/              # 阶段复盘 & 思路拆解
│   └── others/              # 发布说明模板 / 辅助文档
├── scripts/                 # 辅助脚本（发布 / 归档等）
├── assets/                  # 静态资源
├── coverage/                # 测试覆盖率报告（生成产物）
├── CHANGELOG.md             # 版本变更日志（自动生成）
└── README.md
```

> 🔎 提示：只想“练 + 看解 + 复盘” → 关注 `problems/` 与 `docs/review/` 即可。

## 🔄 一题生命周期

| 阶段    | 说明                                                   |
| ------- | ------------------------------------------------------ |
| 📥 获取 | 新建或查看 `problems/Day XX/` 内容                     |
| 🧠 理解 | 题目 README + 相关复盘文档（如有）                     |
| ✍️ 实现 | 编写解法；可新增多种策略对比                           |
| ✅ 测试 | 运行 Vitest：`pnpm test` / `pnpm dev`（含格式 & 检查） |
| 📊 观察 | 覆盖率、性能（必要时添加基准）                         |
| 🧾 复盘 | 在 `docs/review/` 追加要点 / 踩坑 / 优化方向           |

## ⚡ 快速上手

```bash
pnpm install   # 安装依赖
pnpm dev       # Lint + Format + Test 统一执行
# 或，仅运行测试
pnpm test
```

## 🧩 题目文件夹示例（单日）

```
Day 05/
├── README.md         # 题干 & 约束 & 示例 & 扩展思考
├── answer.js         # 参考实现（可放多个导出）
├── sum.js            # 题目主体（有时与 answer 合并）
├── sum.spec.js       # 测试用例（不可或缺）
└── ts/               # TS 版 / 类型体操 / 泛型推导实验
```

## 🧪 质量保障

- Vitest：单元级快速反馈 ✅
- ESLint + 格式化：提交前统一风格 🧹
- TypeScript（渐进）：类型表达 / 收敛契约 🧬
- 覆盖率报告：聚焦未测路径 🔦

## 📖 复盘内容

集中收录在：

- `docs/review/`：阶段总结、共性错误、优化策略
- `docs/days/`：题目索引 / 进度概览

> 🧠 建议：复盘时写下 “初始直觉 → 复杂点 → 最终取舍”。

## 🛠️ 渐进式 TS 策略

- 优先为“高复用 / 高抽象”题目补类型
- 以测试反推类型边界
- 引入必要的工具类型（不滥造）

## 🙌 贡献方式

1. 选一天题目 / 新增题目文件夹
2. 写解法 & 跑测试
3. 如有启发，补一句复盘

## 贡献者

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/seaeam">
                    <img src="https://avatars.githubusercontent.com/u/87215099?v=4" width="100;" alt="seaeam"/>
                    <br />
                    <sub><b>lll</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/pcppp">
                    <img src="https://avatars.githubusercontent.com/u/104177657?v=4" width="100;" alt="pcppp"/>
                    <br />
                    <sub><b>peng chang</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/xiersiki">
                    <img src="https://avatars.githubusercontent.com/u/74220172?v=4" width="100;" alt="xiersiki"/>
                    <br />
                    <sub><b>Gong Che Yu</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Dc9309">
                    <img src="https://avatars.githubusercontent.com/u/103992756?v=4" width="100;" alt="Dc9309"/>
                    <br />
                    <sub><b>Dc9309</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/notshine">
                    <img src="https://avatars.githubusercontent.com/u/105473589?v=4" width="100;" alt="notshine"/>
                    <br />
                    <sub><b>Peng Liang</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/wang-danni">
                    <img src="https://avatars.githubusercontent.com/u/126050206?v=4" width="100;" alt="wang-danni"/>
                    <br />
                    <sub><b>wang-danni</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->
