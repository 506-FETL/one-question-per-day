## v2.3.0 (2025-09-17)

### 概览

新增多题 (Day20 lazyMan / Day21 fetchWithRetry / serialize & deserialize / deduplicate / Problem platform Day02 等)，引入 Vue & React 双站点支持与布局组件，改进样式与文档，并重构 Promise、测试与索引逻辑。

### ✨ 新增

- day-20 lazyMan
- Day21 fetchWithRetry
- serialize / deserialize 基础实现
- deduplicate（支持稀疏数组）
- Problem-platform-Day02 / vue-day-01 / layout components
- 团队组件（贡献者与 PR 统计）
- 构建工作流支持 React & Vue + Vercel 配置

### 🐛 修复

- 文档死链 / Skeleton 样式 / 组件布局与样式 / 包名 / 文档侧边栏 / 构建作业名称 / 大小写错误 / dead line / Vercel 重写配置

### 🧩 重构

- MyPromise Promise/A+ 合规
- 移除未使用 UI 组件与工具函数
- 测试脚手架（Vue Button）
- 问题列表生成逻辑
- 项目目录与 README

### 📚 文档

- 深拷贝新增写法 / Review 文档 / Button 文档增强 / Day19 清理 + Day01 Button 新增 / 多批次 README & 徽章 / 贡献者自动更新

### 💅 样式

- 表格格式统一 / 字体系列与背景初调 / do 表格样式

### 🧪 CI & Chore

- 测试脚本整合 Vue / 添加 React & Vue 依赖 / Node engine 调整 / 缓存策略 / 删除过时构建步骤 / Vercel 配置

### 已知问题

- serialize / deserialize round-trip 不完全对称
- solver + day 路由状态同步可抽象

## v2.2.0

### 概览

新增 Day19 题及下拉菜单、滚动区域组件；发布流程迭代。

### 主要

- feat: Day19 基础题目
- feat: dropdown menu / scroll area 组件

## v2.1.0

### 概览

新增 Day18 Button；修复类型与文档链接；重构层级与 tsconfig。

### 主要

- feat: Day18 Button
- fix: 按钮类型定义 / 各天文档链接
- refactor: tsconfig include / 目录层级
- docs: 站点说明 & 格式统一

## v2.0.0

### 概览

重大结构更新 (BREAKING)。

### 主要

- feat!: 项目结构与配置整体升级
- fix: review 文档

## v1.8.0

### 概览

批量补齐 TS 题目 (11,12,14, 部分 09~18) 与字体 / 文档结构优化，新增数字格式化。

### 主要

- feat: addComma / TS Day11,12,14 / Days09~18 示例
- docs: README / frontmatter Badge / 字体与导航 / 自定义字体支持
- fix: 打包产物路径 / 侧边栏目录路径 / base 设置 / 链接问题
- refactor: 文档目录结构

## v1.7.0

### 概览

文档构建与主题上线；多处站点配置修复。

### 主要

- feat: 文档构建工作流 / GitHub Pages base
- docs: 初次搭建说明 / 自定义主题 / 图标 & logo
- fix: base 路径 / 链接 / 空主题索引
- refactor: 文档结构

## v1.6.0

### 概览

新增 Review Day17 & Day18，补齐 Day09 TS 与 MyPromise TS。

### 主要

- feat(review)!: Day17/18 review / Day09 TS / MyPromise TS
- chore: release & workflow 清理

## v1.5.0

### 概览

发布策略调整：禁用 GitHub 网页发布模式。

### 主要

- feat: BREAKING 禁用 GitHub 网页发布

## v1.4.5 ~ v1.4.0

### 概览

频繁迭代 release 流程与脚本；尝试并回滚网页发布方式。

### 主要

- feat!: 启用→禁用 GitHub 网页发布
- feat: Vite 构建 & 题目资源拷贝 / 下载链接格式
- style: 切换 ESLint (antfu) 移除 Prettier
- chore: 多次 release / release-it & hooks 脚本完善 / 资产处理逻辑

## v1.3.x 系列

### 概览

聚焦自动生成题目归档与 release 自动化脚本。

### 主要

- feat: 自动 problems archive 生成
- refactor: 归档集成进 Vite build
- chore: 调整 / 清理 / 优化 hooks & 构建

## v1.2.0

### 概览

引入自动 Release Notes 生成与相关文档。

### 主要

- feat: 自动生成 release notes
- docs: auto-release notes 文档 & 格式优化

## v1.1.1

### 概览

热修复：发布消息多余链接移除。

### 主要

- fix: 移除 release URL

## 后续规划 (Roadmap 摘要)

- 统一 serialize/deserialize 协议（含 null 策略）
- 抽象 solver+day 路由状态管理
- 提升测试覆盖率 / 性能监控接入
- 精简 release 自动化脚本，减少重复 tag 流程

💡 **完整更改日志**: [CHANGELOG.md](./CHANGELOG.md)
📦 **安装**: `git clone` & `pnpm install`
🐛 **问题反馈**: 提交 [Issue](../../issues)
