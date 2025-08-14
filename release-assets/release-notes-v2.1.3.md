# 📚 506实验室每日一题 Release

## 🎯 本次更新概览


## 📝 详细更新内容

# 修复贡献者统计重复问题

**更新时间**: 2025年8月14日  
**更新类型**: 修复问题  
**影响范围**: GitHub Actions 工作流、项目统计

## 主要改进

- 新增 `.mailmap` 文件来合并相同身份的贡献者
- 新增 `cmd/test-contributors.sh` 测试脚本用于验证统计准确性
- 优化 GitHub Actions 中的贡献者统计逻辑，排除机器人账户
- 修复贡献者重复统计问题（从17人修正为6人）
- 修复同一人不同邮箱被重复计算的问题
- 修复机器人账户被统计的问题

## 技术细节

### mailmap 配置示例

```
# 合并 lll 的多个身份
lll <347552878@qq.com> lll <87215099+SeaMmMm@users.noreply.github.com>
lll <347552878@qq.com> lll <87215099+seaeam@users.noreply.github.com>

# 合并彭畅的中英文身份
彭畅 <1326278155@qq.com> peng chang <104177657+pcppp@users.noreply.github.com>
```

### 过滤规则

- 排除 `GitHub Action` 机器人账户
- 排除 `action@github.com` 邮箱
- 排除 `xier164.*gitee.com` 镜像同步账户

## 验证方法

运行测试脚本验证修复效果：

```bash
./cmd/test-contributors.sh
```

## 📊 项目统计

- 📚 总题目数量: **18** 题
- 👥 贡献者数量: **1** 人

## 🛠️ 技术栈

- **语言**: JavaScript, TypeScript
- **测试**: Vitest
- **代码质量**: ESLint, Prettier
- **包管理**: pnpm

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/506-FETL/one-question-per-day.git

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 开发模式（包含代码检查、格式化、测试）
pnpm dev
```

## 🤝 参与贡献

欢迎加入506实验室每日一题！请查看 [README.md](https://github.com/506-FETL/one-question-per-day/blob/main/README.md) 了解详细的参与指南。

## 📦 发布包下载

本版本提供以下发布包（仅包含题目文件）：

| 格式 | 文件名 | 大小 | SHA256 |
|------|--------|------|--------|
| ZIP | `506-lab-daily-questions-v2.1.3.zip` | 184K | `e8c9e773368d3511dfbc1ec79b71ebf66e7a7be445c9f37bed1095fbb2240333` |
| TAR.GZ | `506-lab-daily-questions-v2.1.3.tar.gz` | 128K | `90e7cacc08d8a872ebb8a082839e34bb45b6308c2666cf02242e72e618cfd9d1` |

📁 **包含内容**：
- `problems/days/` - 所有每日题目（Day 01 - Day 18）
- `problems/review/` - 复习总结文档
- `README.md` - 使用说明和目录结构

💡 **注意**：发布包仅包含题目文件，如需完整开发环境请克隆 GitHub 仓库。

