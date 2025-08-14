# 🚀 新的 Release 工作流使用指南

## 📋 概览

现在你的项目已经完全配置好了使用 Vite 的新 Release 工作流！主要特点：

✅ **自动化构建** - 使用 Vite 构建 `problems` 目录压缩包  
✅ **集成到开发流程** - `dev` 命令最后自动运行构建  
✅ **智能清理** - 每次构建前清空 `dist` 目录  
✅ **完整 Release Notes** - 自动生成包含文件信息的发布说明  
✅ **GitHub Actions 集成** - Release 时自动使用 `dist` 中的文件

## 🔄 新的工作流程

### 1. 日常开发流程

```bash
# 完整开发流程（包含最后的构建）
pnpm dev

# 等价于依次执行：
# pnpm lint      # 代码检查
# pnpm type-check # 类型检查
# pnpm format    # 代码格式化
# pnpm test      # 运行测试
# pnpm build     # 构建发布包 ⭐ 新增
```

### 2. 单独构建发布包

```bash
# 仅构建发布包
pnpm build
```

**构建结果** (保存在 `dist/` 目录):

- `506-lab-daily-questions-v{version}.tar.gz` - TAR 压缩包
- `506-lab-daily-questions-v{version}.zip` - ZIP 压缩包
- `release-notes-v{version}.md` - Release Notes

### 3. Release 发布流程

**GitHub Actions 手动发布**（推荐）:

1. 运行完整开发流程确保 `dist` 目录是最新的
2. 访问 [GitHub Actions](https://github.com/506-FETL/one-question-per-day/actions)
3. 选择 "手动 Release" 工作流
4. 选择版本类型并触发
5. 等待 PR 创建，审核并合并
6. 自动创建包含 `dist` 文件的 GitHub Release

## 📦 构建输出说明

### 发布包内容

构建的压缩包只包含 `problems` 目录：

```
506-lab-daily-questions-v{version}/
├── problems/
│   ├── days/           # 所有题目 (Day 01-18)
│   └── review/         # 复习总结
└── README.md           # 使用说明
```

### 生成的文件

- **TAR.GZ**: 适合 Linux/macOS 用户，体积更小 (~135KB)
- **ZIP**: 适合 Windows 用户，兼容性更好 (~183KB)
- **Release Notes**: 包含版本信息、统计数据、下载链接和 SHA256 校验码

## 🔧 Vite 配置特点

新的 `vite.config.ts` 实现了：

1. **智能清理**: 每次构建前清空 `dist` 目录
2. **自动复制**: 递归复制整个 `problems` 目录
3. **统计信息**: 自动统计题目数量和贡献者
4. **压缩打包**: 同时生成 TAR.GZ 和 ZIP 格式
5. **校验码生成**: 自动计算 SHA256 校验码
6. **Release Notes**: 自动生成完整的发布说明

## 📁 目录结构变化

```
项目根目录/
├── dist/                    # 🆕 构建输出目录 (git ignored)
│   ├── *.tar.gz            # TAR 压缩包
│   ├── *.zip               # ZIP 压缩包
│   └── release-notes-*.md  # Release Notes
├── src/
│   └── index.ts            # 🆕 Vite 构建入口文件
├── vite.config.ts          # 🆕 Vite 构建配置
└── package.json            # ✏️ 更新了 scripts
```

## 🎯 优势对比

| 特性          | 之前                    | 现在              |
| ------------- | ----------------------- | ----------------- |
| 构建工具      | GitHub Actions 实时创建 | Vite 本地/CI 构建 |
| 开发集成      | 分离的流程              | 集成到 `dev` 命令 |
| 本地验证      | 无法本地验证            | 可本地构建测试    |
| 构建速度      | 较慢 (每次重新打包)     | 快速 (Vite 优化)  |
| 文件管理      | 临时文件                | 持久化在 `dist`   |
| Release Notes | GitHub Actions 生成     | Vite 构建时生成   |

## 🚀 最佳实践

1. **每次提交前运行 `pnpm dev`** 确保代码质量和构建成功
2. **发布前检查 `dist` 目录** 确认生成的文件正确
3. **使用 GitHub Actions 发布** 获得最完整的自动化流程
4. **保持 `dist` 目录在 `.gitignore`** 避免提交构建产物

## 🔍 故障排除

**构建失败？**

- 检查 `problems` 目录是否存在
- 确认有足够的磁盘空间
- 运行 `pnpm install` 确保依赖完整

**Release 包不对？**

- 重新运行 `pnpm build`
- 检查 `package.json` 中的版本号
- 确认 `problems` 目录内容正确

**GitHub Actions 失败？**

- 检查是否运行了 `pnpm dev` 或 `pnpm build`
- 确认 `dist` 目录存在且包含必要文件

---

🎉 **恭喜！** 现在你有了一个完全自动化、高效的 Release 工作流！
