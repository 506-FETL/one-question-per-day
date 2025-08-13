# 更新日志

所有值得注意的项目更改都将记录在此文件中。

本项目的版本格式遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## [未发布]

### 新增功能

-


## [v2.0.0] - 2025-08-13

### 修改内容

-

### 问题修复

-

## [1.1.0] - 2025-08-13

### 新增功能

- ✅ 添加完整的 TypeScript 支持
- ✅ 配置 TypeScript ESLint 规则
- ✅ 添加类型检查命令
- ✅ 配置自动化 Release 功能
- ✅ 添加手动发布脚本

### 修改内容

- 📦 更新依赖包，添加 TypeScript 相关包
- ⚙️ 重构 ESLint 配置使用 `defineConfig` 格式
- 🔧 优化文件检查范围，只检查指定文件
- 📝 更新 package.json 脚本命令

### 问题修复

- 🐛 修复 TypeScript 编译器文件覆盖问题
- 🐛 解决 ESLint jiti 库缺失问题
- 🐛 修复 TypeScript ESLint 插件配置兼容性问题

## [1.0.0] - 项目初始版本

### 新增功能

- 📚 建立每日一题项目结构
- ✅ 配置 Vitest 测试框架
- 🔧 设置 ESLint 和 Prettier 代码规范
- 📖 完善项目文档和使用说明
- 🎯 完成 Day 01 - Day 18 题目

### 技术栈

- **语言**: JavaScript
- **测试**: Vitest
- **代码质量**: ESLint, Prettier
- **包管理**: pnpm

---

## 版本说明

- **[主版本]** - 重大功能更新、架构变更
- **[次版本]** - 新功能、技术栈升级、批量题目更新
- **[修订版本]** - 小的改进、bug修复、少量题目更新

## 链接格式

[未发布]: https://github.com/506-FETL/one-question-per-day/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/506-FETL/one-question-per-day/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/506-FETL/one-question-per-day/releases/tag/v1.0.0
