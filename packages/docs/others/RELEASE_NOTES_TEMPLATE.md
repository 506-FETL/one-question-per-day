# Release Notes Template

这个文件提供了发布说明的模板和最佳实践。

## 自动生成发布说明

项目已经配置了自动生成发布说明的功能：

### 1. 使用方式

每次运行 `pnpm run release` 时，系统会：

1. **自动生成 CHANGELOG.md** - 基于 conventional commits 从 git 历史中提取更改
2. **生成格式化的发布说明** - 从 CHANGELOG.md 提取当前版本的内容并格式化
3. **在 GitHub Release 中自动使用** - 发布说明会自动用于 GitHub Release

### 2. 手动生成发布说明

如果需要预览或手动生成发布说明：

```bash
# 生成发布说明（保存到 RELEASE_NOTES.md）
pnpm run generate-release-notes

# 查看生成的发布说明
cat RELEASE_NOTES.md
```

### 3. 自定义发布说明

如果需要自定义发布说明，可以：

1. 在发布前手动编辑 `RELEASE_NOTES.md` 文件
2. 或者修改 `scripts/generate-release-notes.js` 中的模板

### 4. 提交规范

为了生成高质量的发布说明，请遵循 Conventional Commits 规范：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式化
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建过程或辅助工具的变动

### 5. 发布说明格式

生成的发布说明包含：

- 🎉 版本标题
- 🐛 Bug 修复列表
- ✨ 新功能列表
- ⚡ 性能改进
- 💥 破坏性更改
- 📚 文档更新
- 🧪 测试改进
- 🔧 其他更改
- 💡 完整更改日志链接
- 📦 安装说明
- 🐛 问题反馈链接

### 6. 配置文件

相关配置文件：

- `.release-it.json` - Release-it 配置
- `scripts/generate-release-notes.js` - 发布说明生成脚本
- `scripts/get-release-notes.js` - GitHub Release 发布说明获取脚本

## 示例发布说明

以下是一个示例发布说明：

```markdown
## 🎉 Release v1.2.0

✨ **Features**

- 每日一题-- myFrom 函数，支持类数组对象和可迭代对象的转换
- 每日一题--生成器函数转换为异步函数
- 完成 Day 08-实现 Promise

🐛 **Bug Fixes**

- 修复 ts 错误
- 修正 ESLint 配置中的路径别名和 lint、format 脚本
- 更新深拷贝函数，增强对Symbol和方法的处理能力

📚 **Documentation**

- 更新项目文档，添加每日一题描述文件，优化代码结构和测试用例

---

💡 **完整更改日志**: [CHANGELOG.md](./CHANGELOG.md)
📦 **安装**: `git clone` 或下载最新版本
🐛 **发现问题?** 请提交 [Issue](../../issues)
```
