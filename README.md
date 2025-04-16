# 506 实验室每日一题

## 项目简介

本仓库是 506 实验室每日一题的代码仓库，旨在通过每日编程题目提升实验室成员的编程能力和解决问题的能力。每位成员需要根据每日更新的题目完成自己的解法，并通过对应的单元测试后提交代码。

---

## 项目结构

```markdown
one-question-per-day/
├── problem.js # 每日更新的题目文件
├── src/ # 每位成员的解法文件夹
│ ├── member1/ # 成员 1 的解法
│ ├── member2/ # 成员 2 的解法
│ └── ... # 其他成员的解法
├── **SPEC**/ # 单元测试文件夹
│ ├── [对应日期的测试文件].js # 每日题目的单元测试
│ └── ... # 其他测试文件
├── package.json # 项目配置文件
├── pnpm-lock.yaml # pnpm 依赖锁定文件
└── README.md # 项目说明文档
```

---

## 使用说明

### 1. 获取每日题目

每日题目会更新到 `problem.js` 文件中，所有成员需要根据该文件中的题目完成自己的解法。

### 2. 提交解法

每位成员在 `src/` 文件夹下维护自己的文件夹，并在其中完成每日题目的解法。例如：

```
src/member1/solution.js
```

### 3. 单元测试

每日题目的单元测试文件位于 `__SPEC__/[对应日期+题目].spec.js` 中。所有成员需要将该测试文件引入到自己的测试集中，并确保过所有测试后才能提交代码。

#### 示例：

在自己的测试文件中引入 `problem.spec.js`：

```javascript
import '../__SPEC__/problem.spec.js'
```

运行测试：

```bash
pnpm test
```

### 4. 提交代码

所有新成员需要在自己的分支上进行更改，禁止直接在 `main` 分支上修改代码。

1. 确保在自己的分支上完成更改（分支名建议为 `feature/[成员名]`）。如果尚未创建分支，可以通过以下命令创建：

```bash
git checkout main
git pull
git checkout -b feature/[成员名]
```

2. 提交代码到自己的分支：

```bash
git add .
git commit -m "完成每日一题"
git push origin feature/[成员名]
```

3. 在提交前，先从 `main` 分支拉取最新版本并合并到自己的分支中，解决可能的冲突：

```bash
git checkout main
git pull
git checkout feature/[成员名]
git merge main
```

4. 确保所有单元测试通过后，创建合并请求（Pull Request），并在通过代码审查后合并到 `main` 分支。

---

## 依赖管理

本项目使用 `pnpm` 进行依赖管理。安装依赖：

```bash
pnpm install
```

---

## 项目脚本

- **开发模式**：`pnpm dev`
- **构建项目**：`pnpm build`
- **运行测试**：`pnpm test`
- **预览构建**：`pnpm preview`

---

## 注意事项

1. **代码规范**：请确保代码风格一致，遵循项目的 ESLint 规则。
2. **测试通过**：提交代码前，必须确保所有单元测试通过。
3. **每日更新**：请及时完成每日题目，保持代码仓库的活跃性。

---

## 贡献者

每位实验室成员均为本项目的贡献者，感谢大家的努力！

---
