# 📦 Problems 压缩包功能

## 🎯 功能概述

从现在开始，每次 Release 都会自动生成一个只包含 `problems` 文件夹的压缩包，方便用户单独下载题目和复习资料，而无需下载整个项目。

## ✨ 主要特性

### 1. 🤖 自动生成

- 每次执行 `pnpm run release` 时自动创建
- 文件名格式：`problems-v{版本号}.zip`
- 自动上传到 GitHub Release

### 2. 📁 包含内容

压缩包只包含 `problems/` 文件夹，其中包括：

```
problems/
├── days/              # 每日题目
│   ├── Day 01/       # 归并排序
│   ├── Day 02/       # 生成器转异步
│   ├── Day 03/       # Vue 响应式
│   ├── ...           # 更多题目
│   └── Day 18/       # 最新题目
└── review/           # 技术复习资料
    ├── 01.md         # 对应的技术知识点
    ├── 02.md
    ├── ...
    └── 18.md
```

### 3. 🚫 排除内容

压缩包会自动排除：

- `.DS_Store` 文件（macOS 系统文件）
- `node_modules/` 目录
- `.git/` 目录
- 其他项目配置文件

## 🛠️ 使用方式

### 自动生成（推荐）

作为发布流程的一部分，压缩包会自动生成：

```bash
# 完整发布流程，包含压缩包生成
pnpm run release
```

### 手动生成

如果需要单独生成压缩包：

```bash
# 使用 Vite 构建生成 problems 压缩包
pnpm run create-problems-archive
```

> 💡 **技术实现**: 使用 Vite 构建工具和自定义插件实现，支持自动清理和高效压缩。

### 下载使用

用户可以从 GitHub Release 页面下载：

1. **完整项目压缩包** - GitHub 自动生成的源码包
2. **Problems 压缩包** - `problems-v{版本}.zip`，仅包含题目文件

## 📋 发布流程集成

### 发布时的自动化步骤

1. **运行测试** - 确保代码质量
2. **生成版本号** - 根据 conventional commits
3. **生成 CHANGELOG** - 自动生成更改日志
4. **生成发布说明** - 格式化的 release notes
5. **📦 创建 Problems 压缩包** - 新增步骤
6. **创建 Git 标签** - 版本标记
7. **推送到 GitHub** - 同步代码
8. **创建 GitHub Release** - 包含压缩包附件

### 发布说明格式

发布说明会自动包含下载说明：

```markdown
## 📥 下载

- **📦 完整项目**: 通过 GitHub Release 自动生成的源码压缩包
- **📁 题目合集**: `problems-v1.2.0.zip` - 仅包含每日题目和复习资料
- **🔗 在线浏览**: 直接浏览仓库获取最新内容

> 💡 **推荐**: 如果你只需要题目文件，下载 `problems-v1.2.0.zip` 即可。
```

## 🔧 技术实现

### 核心文件

```
vite.config.problems.ts        # Vite 配置文件（压缩包生成）
.release-it.json               # 包含压缩包配置
package.json                   # 包含相关脚本
```

### 配置详情

在 `.release-it.json` 中的配置：

```json
{
  "github": {
    "assets": ["dist/problems-v${version}.zip"]
  },
  "hooks": {
    "after:bump": [
      "node scripts/generate-release-notes.js",
      "pnpm run create-problems-archive"
    ]
  }
}
```

### Vite 插件实现

使用 Vite 自定义插件实现压缩包生成：

```typescript
// vite.config.problems.ts
export default defineConfig({
  plugins: [
    {
      name: 'problems-archiver',
      async buildStart() {
        // 1. 清理 dist 目录
        // 2. 检查 problems 文件夹
        // 3. 使用 archiver 创建 ZIP
        // 4. 排除不必要文件
      },
    },
  ],
})
```

### Vite 构建特性

- **🧹 自动清理** - 构建前自动清理 `dist/` 目录
- **📦 高效压缩** - 使用 archiver 库实现高效 ZIP 压缩
- **🎯 智能排除** - 自动排除系统文件和不必要的内容
- **📊 构建报告** - 显示压缩包大小和包含内容
- **⚡ 快速构建** - 基于 Vite 的高性能构建流程

## 📊 使用统计

每次生成压缩包时会显示：

```
📦 正在创建 problems 文件夹压缩包...
✅ 压缩包已创建: /path/to/problems-v1.2.0.zip
📁 包含内容: problems/ 文件夹
📊 压缩包大小: 176K
```

## 🎯 用户场景

### 学习者

- 只需要题目和复习资料
- 不关心项目构建和配置
- 希望快速获取学习内容

### 贡献者

- 需要完整项目进行开发
- 可以选择下载完整源码
- 使用 git clone 获取最新代码

### 教师/培训师

- 批量分发题目给学员
- 不包含项目配置，避免混淆
- 专注于学习内容本身

## 🔍 故障排除

### 常见问题

1. **压缩包生成失败**

   - 确保系统有 `zip` 命令
   - 检查 `problems/` 文件夹是否存在
   - 确保有写入 `dist/` 目录的权限

2. **GitHub Release 上传失败**

   - 检查 GitHub Token 权限
   - 确保压缩包文件存在
   - 查看 release-it 日志

3. **压缩包过大**
   - 检查是否包含了不必要的文件
   - 验证排除规则是否正确工作

### 调试命令

```bash
# 手动测试压缩包生成
pnpm run create-problems-archive

# 检查生成的文件
ls -la dist/

# 查看压缩包内容
unzip -l dist/problems-v*.zip

# 解压到临时目录验证
mkdir temp && cd temp
unzip ../dist/problems-v*.zip
ls -la
```

## 📈 未来计划

- 支持多种压缩格式（tar.gz, 7z）
- 添加压缩包内容校验
- 支持自定义排除规则
- 添加压缩包完整性检查
