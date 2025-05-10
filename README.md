# 506 实验室每日一题

## 项目简介

本仓库是 506 实验室每日一题的代码仓库，旨在通过每日编程题目提升实验室成员的编程能力和解决问题的能力。每位成员需要根据每日更新的题目完成自己的解法，并通过对应的单元测试后提交代码。

---

## 项目结构

```markdown
one-question-per-day/
├── src/ # 每位成员的解法文件夹
│ ├── member1/ # 成员 1 的解法
│ ├── member2/ # 成员 2 的解法
│ └── ... # 其他成员的解法
├── **SPEC**/ # 测试以及题目答案文件
│ ├── [题目].js # 每日题目(包含答案)
│ ├── [题目].spec.js # 单元测试
│ └── README.md # 题目描述
├── Problems/ # 每日题目汇总
│ ├── [题目].js # 每日题目(不包含答案)
│ ├── [题目].spec.js # 单元测试
│ └── README.md # 题目描述
├── package.json # 项目配置文件
├── pnpm-lock.yaml # pnpm 依赖锁定文件
└── README.md # 项目说明文档
```

---

## 使用说明

### 1. 获取每日题目

每日题目会更新到 `Problems` 文件中，并且 `对应的readme` 中会有详细的题目描述与要求，所有成员需要根据该文件中的题目完成自己的解法。

### 2. 提交解法

每位成员在 `src/` 文件夹下维护自己的文件夹，并在其中完成每日题目的解法。例如在 2 月 12 日完成：

```
src/
├── member1 # 成员 1 维护的文件夹
│ ├── Day [date] # 每日一题文件
│ │  ├── [题目].js # 完成题目
│ │  ├── [题目].spec.js # 复制 __SPEC__ 文件中对应的测试文件
│ └── ... # 其他日期文件
└──
```

### 3. 单元测试

每日题目的单元测试文件位于 `Problems/[对应日期]/[题目].spec.js` 中。所有成员需要将该测试文件引入到自己的测试集中，并确保过所有测试后才能提交代码，如果有感觉测试情况覆盖不全，可以在自己的测试中自行添加额外测试。

单独运行测试：

```bash
pnpm test
```

**建议不要只单独运行测试脚本，最好直接运行 `pnpm dev`，这个会在运行测试之前进行代码检查和格式化**

### 4. 提交代码

所有新成员需要在自己的分支上进行更改，禁止直接在 `main` 分支上修改代码。

#### 推荐分支管理与提交流程

1. **每次新任务都应基于最新主分支新建分支，分支名建议为 `[成员名]-[日期]`，如 `jack-Day01`，避免历史提交混入新 PR。**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b [成员名]-[日期]
   ```

2. **在新分支上完成每日一题的开发与提交：**

   ```bash
   git add .
   git commit -m "feat: 完成[日期]每日一题"
   git push origin [成员名]-[日期]
   ```

3. **如需同步主分支最新内容，推荐使用 rebase 保持提交历史整洁：**

   ```bash
   git fetch origin
   git rebase origin/main
   ```

   > ⚠️ 不建议在旧分支上直接新建新分支，否则会导致历史提交混入新 PR。

4. **确保所有单元测试通过后，在 GitHub 上发起 Pull Request（PR），无任何问题后合并到 `main` 分支。**

5. **PR 合并后，建议删除本地和远端分支，保持分支整洁：**

   ```bash
   git checkout main
   git pull origin main
   git branch -d [日期]-[成员名]
   git push origin --delete [日期]-[成员名]
   ```

6. **一键删除所有远端已删除但本地还存在的分支（可选）：**

   新建脚本 `delete-gone-branches.sh`，内容如下：

   ```bash
   #!/bin/bash
   git fetch -p
   git branch -vv | awk '/: gone]/{print $1}' | xargs -r git branch -d
   echo "已删除所有远端已删除的本地分支。"
   ```

   赋予执行权限并运行：

   ```bash
   chmod +x delete-gone-branches.sh
   ./delete-gone-branches.sh
   ```

---

> **常见问题整理：**
>
> - **为什么 PR 会有历史提交？**  
>   因为新分支不是基于最新主分支新建，或在旧分支上直接新建，导致历史提交混入。务必每次新建分支前先 `git checkout main && git pull`。
> - **远端分支删除后，本地分支还在怎么办？**  
>   需要手动删除本地分支，或用上面的脚本一键清理。
> - **每次都要删除本地分支吗？**  
>   建议删除，保持分支整洁，防止误操作。如果不想手动删，可用脚本批量处理。
> - **可以复用本地分支吗？**  
>   不推荐。每次新任务都应新建分支，保证 PR 只包含本次内容，历史清晰。
> - **同步主分支用 merge 还是 rebase？**  
>   推荐 `rebase`，提交历史更干净。多人协作时注意冲突处理。

---

### 5.提交规范

#### 提交信息规范

1. **提交信息结构**：

   ```
   [类型]: [模块/功能] - [简要描述]
   ```

   示例：

   ```
   feat: 归并排序 - 完成基本实现
   fix: 单元测试 - 修复归并排序的边界条件问题
   docs: README - 更新使用说明
   ```

2. **提交类型**：

   - **feat**: 新功能（如新增题目解法）。
   - **fix**: 修复问题（如修复代码逻辑或测试用例）。
   - **docs**: 文档更新（如更新 README 或注释）。
   - **test**: 添加或修改测试（如新增单元测试）。
   - **refactor**: 代码重构（不影响功能的代码优化）。
   - **style**: 代码格式（如调整缩进、空格等，不影响功能）。
   - **chore**: 构建或工具变更（如更新依赖、CI 配置）。

3. **提交描述**：

   - 使用简洁明了的语言描述提交内容。
   - 如果需要详细说明，可以在标题下方添加描述：

     ```
     feat: 归并排序 - 完成基本实现

     - 实现了递归版本的归并排序
     - 添加了边界条件的处理
     - 更新了相关单元测试
     ```

#### **代码质量要求**

1. **代码风格**：

   - 遵循项目的 ESLint 规则。
   - 使用一致的命名规范（如驼峰命名）。

2. **单元测试**：

   - 每次提交前运行测试：
     ```bash
     pnpm test
     ```
   - 确保新增功能覆盖所有边界条件。

3. **文档更新**：
   - 如果更改了功能或接口，及时更新相关文档（如 README）。

#### **示例提交信息**

```plaintext
feat: 归并排序 - 添加非递归实现

- 实现了非递归版本的归并排序
- 优化了时间复杂度分析的注释
- 更新了测试用例，覆盖更多边界条件
```

---

### 6.提供每日一题要求

1. 首先在 `problem.md` 中给出问题描述
2. 在 `problem.js` 中给出题目，要求使用 JSDoc 写出代码注释，并给出答案
3. 在 `__SPEC__` 文件夹中新建当日的文件夹，其中包括题目、描述文件、测试用例，并且要将描述文档更名为 `README.md`
4. 将每日题目转录到 `Problems` 文件中,格式与 `__SPEC__` 中的格式保持一致，不给出答案
5. 本项目只会运行 src 文件夹下的测试，不会运行 `__SPEC__` 文件下的测试，目的是为了在给出题目之后，就算没有给出答案依然可以上传到远端，**但必须在未给出标答的题目文件中标注：// TODO**

---

## 依赖管理

本项目使用 `pnpm` 进行依赖管理。安装依赖：

```bash
pnpm install
```

---

## 项目脚本

- **运行测试**：`pnpm test`
- **格式化代码**: `pnpm format`
- **代码检查**: `pnpm lint`
- **运行**: `pnpm dev`

---

## 注意事项

1. **代码规范**：请确保代码风格一致，遵循项目的 ESLint 规则。
2. **测试通过**：提交代码前，必须确保所有单元测试通过。
3. **每日更新**：请及时完成每日题目，保持代码仓库的活跃性。

---

## 贡献者

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/SeaMmMm">
                    <img src="https://avatars.githubusercontent.com/u/87215099?v=4" width="100;" alt="SeaMmMm"/>
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
                <a href="https://github.com/notshine">
                    <img src="https://avatars.githubusercontent.com/u/105473589?v=4" width="100;" alt="notshine"/>
                    <br />
                    <sub><b>Peng Liang</b></sub>
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

---
