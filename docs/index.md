---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: OneQuestionPerDay
  text: 506 · 每日一题
  tagline: 聚焦数据结构 / 算法 / JS 基础实现 / 工程化实践。坚持小步快跑，统一测试驱动，持续版本发布与复盘。
  image:
    light: /hero.svg
    dark: /hero-dark.svg
    alt: 每日一题
    width: 620  # 自定义属性（主题不识别也无妨，仅做文档标注）
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /days
    - theme: alt
      text: 📂 目录结构
      link: /#项目结构
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
    details: problems/Day xx 规范存放题目、答案、规格与 TS 版本，方便检索复盘。
  - title: 🧪 TS 迁移实践
    details: 逐步为核心题目补全 TypeScript 类型，积累范式与最佳实践。
  - title: 🔄 自动化发布
    details: 利用 release-it + Conventional Commits 生成版本与 CHANGELOG，并产出题目压缩包。
  - title: 👥 多成员协作
    details: 按成员目录 (src/{id}/Day xx) 记录个人实现，对比不同思路。
  - title: 📚 知识复盘
    details: problems/review 下集中整理阶段性复盘与难点解析。

---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
import { useData } from 'vitepress'

const { isDark } = useData()
const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/87215099?v=4',
    name: 'lll',
    title: '斯人若彩虹，遇上方知有',
    links: [
      { icon: 'github', link: 'https://github.com/seaeam' },
      {icon: 'bilibili', link: 'https://space.bilibili.com/158284800?spm_id_from=333.1007.0.0'},
      {icon: 'x', link: 'https://x.com/wozhenbenz5112'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/104177657?v=4',
    name: 'peng chang',
    title: '好想进大厂',
    links: [{ icon: 'github', link: 'https://github.com/pcppp' },]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/74220172?v=4',
    name: 'Gong Che Yu',
    title: 'xiersiki',
    links: [{ icon: 'github', link: 'https://github.com/xiersiki' },]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/103992756?v=4',
    name: 'Dc9309',
    title: 'Dc9309',
    links: [{ icon: 'github', link: 'https://github.com/Dc9309' },]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/105473589?v=4',
    name: 'Peng Liang',
    title: 'I am a graduate student from Chongqing University of Posts and Telecommunications, majoring in computer science and technology',
    links: [{ icon: 'github', link: 'https://github.com/notshine' },]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/126050206?v=4',
    name: 'wang-danni',
    title: 'Chongqing University of Posts and Telecommunications major in computer technology',
    links: [{ icon: 'github', link: 'https://github.com/wang-danni' },]
  }
]

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "root",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "ui",
            children: [
              { id: "4", isSelectable: true, name: "Button.vue" },
              { id: "5", isSelectable: true, name: "Card.vue" },
              { id: "6", isSelectable: true, name: "Input.vue" },
            ],
          },
          { id: "7", isSelectable: true, name: "Header.vue" },
          { id: "8", isSelectable: true, name: "Footer.vue" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: "composables",
        children: [
          { id: "10", isSelectable: false, name: "useAuth.ts" },
          { id: "11", isSelectable: true, name: "useTheme.ts" },
        ],
      },
      {
        id: "12",
        isSelectable: true,
        name: "layouts",
        children: [
          { id: "13", isSelectable: true, name: "default.vue" },
          { id: "14", isSelectable: false, name: "auth.vue" },
        ],
      },
      {
        id: "15",
        isSelectable: true,
        name: "pages",
        children: [
          { id: "16", isSelectable: true, name: "index.vue" },
          { id: "17", isSelectable: true, name: "about.vue" },
          {
            id: "18",
            isSelectable: false,
            name: "auth",
            children: [
              { id: "19", isSelectable: true, name: "login.vue" },
              { id: "20", isSelectable: true, name: "register.vue" },
            ],
          },
        ],
      },
      { id: "21", isSelectable: true, name: "app.vue" },
      { id: "22", isSelectable: true, name: "nuxt.config.ts" },
    ],
  },
];
</script>

## 项目结构

```
one-question-per-day/
├── problems/          # 题目与复习资料
│   ├── Day xx/          # 每日挑战题目实现
│   └── ...
├── src/               # 成员个人解法目录
│   ├── [成员名]/      # 各成员的解题实现
│   └── ...
├── scripts/           # 工具脚本
├── assets/           # 项目资源文件
├── docs/             # 项目文档
└── coverage/         # 测试覆盖率报告
```

## 使用说明

### 1. 获取每日题目

每日题目会更新到 `problems/` 目录中，每个 `Day XX` 文件夹包含：

- 题目实现文件
- 对应的单元测试
- README.md 详细题目描述

此外，`problems/docs/review/` 目录提供对应的技术知识点复习文档，包含详细的原理解析和最佳实践。

### 2. 提交解法

每位成员在 `src/` 文件夹下维护自己的文件夹，并在其中完成每日题目的解法。例如在 2 月 12 日完成：

```
src/
├── [member1] # 成员 1 维护的文件夹
│ ├── Day [date] # 每日一题文件
│ │  ├── [题目].js # 完成题目
│ │  ├── [题目].spec.js # 复制 __SPEC__ 文件中对应的测试文件
│ └── ... # 其他文件
└──
```

### 3. 单元测试

每日题目的单元测试文件位于 `problems/[对应日期]/[题目].spec.js` 中。所有成员需要将该测试文件引入到自己的测试集中，并确保通过所有测试后才能提交代码。如果觉得测试覆盖不全，可以在自己的测试中自行添加额外测试。

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

### 6.提供每日一题要求

1. 首先需要在 `problems` 文件夹中新建当日题目文件夹
2. 题目文件夹中包含 `README.md` `answer.js` `[题目].js` `[题目].spec.js` 以及其他相关的文件
3. `README.md` 详细解释题目要求以及注意事项，`answer.js` 给出本题答案，`[题目].js`质保函每日题目的初始化模版(跟 leetcode 上面给出的题目类似)，并且导出到测试中

---

## 依赖管理

本项目使用 `pnpm` 进行依赖管理。安装依赖：

```bash
pnpm install
```

## 项目脚本

### 基础开发命令

- **运行测试**：`pnpm test`
- **格式化代码**: `pnpm format`
- **代码检查**: `pnpm lint`
- **类型检查**: `pnpm type-check`
- **运行**: `pnpm dev`（包含代码检查、格式化、测试）

### Release 发布命令

- **手动发布**: `pnpm release`（交互式选择版本类型）
- **补丁版本**: `pnpm release:patch`（bug修复，如 v1.0.0 → v1.0.1）
- **次要版本**: `pnpm release:minor`（新功能，如 v1.0.0 → v1.1.0）
- **主要版本**: `pnpm release:major`（重大更新，如 v1.0.0 → v2.0.0）
- **自定义版本**: `pnpm release:custom`（手动指定版本号）
- **发布前检查**: `pnpm pre-release`（运行所有质量检查）

### 手动 Release 策略

**为适应多人协作环境，项目采用手动 Release 策略：**

- 🚫 **已禁用自动触发**: 避免每次提交到 main 分支都触发发布
- 🎯 **手动控制**: 只有指定人员可以在合适时机手动发布版本
- 👥 **协作友好**: 团队成员可以自由提交代码，不用担心意外触发发布
- 📋 **两种方式**:
  - GitHub Actions 页面手动触发（推荐）
  - 本地脚本发布 (`pnpm release`)

> 💡 **提示**: 查看 [Release 文档](./others/RELEASE_NOTES_TEMPLATE.md) 了解详细的版本管理流程。

### 🚀 自动发布说明

项目已配置完整的自动发布说明生成系统：

- **🤖 自动生成**: 基于 conventional commits 自动生成格式化的发布说明
- **📝 结构化内容**: 包含新功能、Bug 修复、文档更新等分类
- **🎨 表情符号**: 使用表情符号使发布说明更易读
- **🔗 GitHub 集成**: 自动用于 GitHub Release

```bash
# 完整发布流程（包含自动发布说明生成）
pnpm run release

# 仅生成发布说明预览
pnpm run generate-release-notes
```

> 📚 **详细文档**: 查看 [自动发布说明文档](./others/AUTO_RELEASE_NOTES.md) 了解完整使用指南。

### 📦 Problems 压缩包

每次发布都会自动生成一个只包含题目的压缩包：

- **🎯 专注内容**: 仅包含 `problems/` 文件夹，无其他项目文件
- **📁 完整题库**: 包含所有每日题目和技术复习资料
- **🚀 自动生成**: 发布时自动创建并上传到 GitHub Release
- **💾 轻量下载**: 相比完整项目更小，下载更快

```bash
# 手动生成 problems 压缩包
pnpm run create-problems-archive
```

> 📚 **详细说明**: 查看 [Problems 压缩包文档](./others/PROBLEMS_ARCHIVE.md) 了解完整功能。

## 注意事项

1. **代码规范**：请确保代码风格一致，遵循项目的 ESLint 规则。
2. **测试通过**：提交代码前，必须确保所有单元测试通过。
3. **每日更新**：请及时完成每日题目，保持代码仓库的活跃性。

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Solver
    </template>
    <template #lead>
      由 506 实验室多位成员协作维护
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members />
</VPTeamPage>
