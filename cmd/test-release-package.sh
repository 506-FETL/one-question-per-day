#!/bin/bash

# 测试发布包创建逻辑

set -e

echo "📦 测试发布包创建功能"
echo "====================="
echo ""

# 模拟版本号
VERSION="v2.1.0-test"
TOTAL_DAYS=18
CONTRIBUTORS=6

echo "🔧 模拟参数:"
echo "- 版本号: $VERSION"
echo "- 题目数: $TOTAL_DAYS"
echo "- 贡献者: $CONTRIBUTORS"
echo ""

# 创建临时目录用于打包
TEMP_DIR="release-temp"
PACKAGE_NAME="506-lab-daily-questions-$VERSION"

echo "📁 创建打包目录: $TEMP_DIR/$PACKAGE_NAME"

# 清理可能存在的临时目录
rm -rf "$TEMP_DIR" || true

# 创建打包目录结构
mkdir -p "$TEMP_DIR/$PACKAGE_NAME"

# 检查 problems 目录是否存在
if [ ! -d "problems" ]; then
    echo "❌ problems 目录不存在，请在项目根目录运行此脚本"
    exit 1
fi

# 复制 problems 目录
echo "📋 复制 problems 目录..."
cp -r problems "$TEMP_DIR/$PACKAGE_NAME/"

# 创建包信息文件
echo "📄 创建 README.md..."
cat > "$TEMP_DIR/$PACKAGE_NAME/README.md" << EOF
# 506实验室每日一题 - $VERSION

📚 **题目总数**: $TOTAL_DAYS 题  
👥 **贡献者**: $CONTRIBUTORS 人  
📅 **发布日期**: $(date +%Y-%m-%d)  

## 📁 目录结构

\`\`\`
problems/
├── days/           # 每日题目
│   ├── Day 01/     # 第1天题目
│   ├── Day 02/     # 第2天题目
│   └── ...
└── review/         # 复习总结
    ├── 01.md       # 第1天复习
    ├── 02.md       # 第2天复习  
    └── ...
\`\`\`

## 🚀 使用说明

1. 每个 Day 目录包含：
   - \`README.md\` - 题目描述
   - \`answer.js\` - 参考答案
   - 题目相关的 JavaScript 文件
   - 对应的测试文件 (\`*.spec.js\`)
   - \`ts/\` 目录 - TypeScript 版本实现

2. review 目录包含每天的复习总结

## 🌐 项目地址

- GitHub: https://github.com/506-FETL/one-question-per-day
- 完整项目包含测试环境、开发工具等，请访问 GitHub 获取

---

**506实验室** - 让学习成为习惯 ✨
EOF

echo "📦 创建压缩包..."

# 创建压缩包
cd "$TEMP_DIR"
tar -czf "../$PACKAGE_NAME.tar.gz" "$PACKAGE_NAME"
zip -r "../$PACKAGE_NAME.zip" "$PACKAGE_NAME" >/dev/null 2>&1
cd ..

# 计算文件大小和哈希
TAR_SIZE=$(du -h "$PACKAGE_NAME.tar.gz" | cut -f1)
ZIP_SIZE=$(du -h "$PACKAGE_NAME.zip" | cut -f1)
TAR_SHA256=$(shasum -a 256 "$PACKAGE_NAME.tar.gz" | cut -d' ' -f1)
ZIP_SHA256=$(shasum -a 256 "$PACKAGE_NAME.zip" | cut -d' ' -f1)

echo ""
echo "✅ 发布包创建完成:"
echo "📦 $PACKAGE_NAME.tar.gz ($TAR_SIZE)"
echo "📦 $PACKAGE_NAME.zip ($ZIP_SIZE)"
echo ""
echo "🔐 SHA256 校验码:"
echo "tar.gz: $TAR_SHA256"
echo "zip: $ZIP_SHA256"
echo ""

# 显示包内容结构
echo "📂 包内容预览:"
echo "-------------------"
tar -tzf "$PACKAGE_NAME.tar.gz" | head -20
if [ $(tar -tzf "$PACKAGE_NAME.tar.gz" | wc -l) -gt 20 ]; then
    echo "... (还有 $(($(tar -tzf "$PACKAGE_NAME.tar.gz" | wc -l) - 20)) 个文件)"
fi
echo "-------------------"
echo ""

# 显示生成的表格格式
echo "📋 GitHub Release 表格格式:"
echo ""
echo "| 格式 | 文件名 | 大小 | SHA256 |"
echo "|------|--------|------|--------|"
echo "| ZIP | \`$PACKAGE_NAME.zip\` | $ZIP_SIZE | \`$ZIP_SHA256\` |"
echo "| TAR.GZ | \`$PACKAGE_NAME.tar.gz\` | $TAR_SIZE | \`$TAR_SHA256\` |"
echo ""

# 询问是否清理测试文件
echo "🗑️ 是否清理测试生成的文件? (y/N)"
read -r CLEANUP

if [[ "$CLEANUP" =~ ^[Yy]$ ]]; then
    rm -rf "$TEMP_DIR"
    rm -f "$PACKAGE_NAME.tar.gz" "$PACKAGE_NAME.zip"
    echo "✅ 清理完成"
else
    echo "💾 文件保留在当前目录"
fi

echo ""
echo "✅ 测试完成!"
