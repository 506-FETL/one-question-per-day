# 更新说明 - 2025-08-13 (修复 GitHub Actions pnpm 支持)

## 概述

修复 GitHub Actions 工作流中的包管理器配置问题，统一使用 pnpm 而非 npm。

## 问题修复

- 🐛 **修复缓存错误**: 解决 "Dependencies lock file is not found" 错误
- 🔧 **统一包管理器**: 将所有工作流中的 npm 命令改为 pnpm
- ⚡ **优化依赖安装**: 使用 pnpm 官方 action 和正确的缓存配置

## 修改内容

- 📝 **manual-release.yaml**:

  - 添加 `pnpm/action-setup@v4` action
  - 修改缓存类型从 `npm` 到 `pnpm`
  - 将所有 `npm run` 命令改为 `pnpm run`
  - 优化 package.json 版本更新逻辑

- 📝 **run-test.yaml**:

  - 添加 `pnpm/action-setup@v4` action
  - 添加 Node.js 缓存配置
  - 移除手动安装 pnpm 的步骤
  - 统一使用 pnpm 命令

- 📝 **.releaserc.json**:
  - 将验证命令从 `npm run` 改为 `pnpm run`

## 技术改进

- ✅ **正确的缓存配置**: 使用 `cache: 'pnpm'` 和 `pnpm-lock.yaml`
- ✅ **官方 pnpm action**: 使用 `pnpm/action-setup@v4` 确保版本一致
- ✅ **更快的安装**: 利用 `--frozen-lockfile` 和缓存优化
- ✅ **版本同步**: 兼容 pnpm 的版本更新机制

## 解决的错误信息

```
Error: Dependencies lock file is not found in /home/runner/work/one-question-per-day/one-question-per-day.
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

## 现在的工作流配置

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'pnpm'

- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 10

- name: 安装依赖
  run: pnpm install
```

## 验证步骤

1. 推送代码到分支并创建 PR，检查 `run-test.yaml` 是否正常运行
2. 在 GitHub Actions 中手动触发 `manual-release` 工作流
3. 确认所有步骤都使用 pnpm 而非 npm

## 相关文件

- `.github/workflows/manual-release.yaml` - 手动发布工作流
- `.github/workflows/run-test.yaml` - PR 测试工作流
- `.releaserc.json` - Release 配置文件

## 注意事项

- 🔍 **本地开发**: 确保本地也使用 pnpm 而非 npm
- 📦 **锁文件**: 提交时包含 `pnpm-lock.yaml` 文件
- ⚙️ **一致性**: 所有环境都使用相同的包管理器
