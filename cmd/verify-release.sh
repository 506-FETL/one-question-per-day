#!/bin/bash

# Release 功能验证脚本
echo "🔍 验证 Release 功能配置..."

# 检查必要文件
echo "📁 检查配置文件..."
files=(
    ".github/workflows/manual-release.yaml"
    "scripts/release.sh"
    ".releaserc.json"
    "docs/RELEASE.md"
    "CHANGELOG.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
    fi
done

# 检查脚本权限
echo ""
echo "🔐 检查脚本权限..."
if [ -x "scripts/release.sh" ]; then
    echo "  ✅ scripts/release.sh 有执行权限"
else
    echo "  ❌ scripts/release.sh 没有执行权限"
    echo "     运行: chmod +x scripts/release.sh"
fi

# 检查 package.json 脚本
echo ""
echo "📦 检查 package.json 脚本..."
release_scripts=(
    "release"
    "release:patch" 
    "release:minor"
    "release:major"
    "release:custom"
    "pre-release"
)

for script in "${release_scripts[@]}"; do
    if grep -q "\"$script\":" package.json; then
        echo "  ✅ $script"
    else
        echo "  ❌ $script (缺失)"
    fi
done

# 检查项目统计
echo ""
echo "📊 项目统计..."
if [ -d "problems/days" ]; then
    total_days=$(find problems/days -type d -name "Day *" | wc -l | tr -d ' ')
    echo "  📚 总题目数量: $total_days 天"
else
    echo "  ❌ problems/days 目录不存在"
fi

if [ -d "updates" ]; then
    update_docs=$(find updates -name "*.md" -not -name "README.md" | wc -l | tr -d ' ')
    echo "  📝 更新文档数量: $update_docs 个"
else
    echo "  ❌ updates 目录不存在"
fi

# 检查 Git 配置
echo ""
echo "🔧 检查 Git 配置..."
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "  ✅ Git 仓库"
    current_branch=$(git branch --show-current)
    echo "  📍 当前分支: $current_branch"
    
    if git describe --tags --abbrev=0 >/dev/null 2>&1; then
        current_version=$(git describe --tags --abbrev=0)
        echo "  🏷️ 当前版本: $current_version"
    else
        echo "  ⚠️ 尚未有任何 Git tag"
    fi
else
    echo "  ❌ 不在 Git 仓库中"
fi

echo ""
echo "🎯 Release 功能验证完成！"
echo ""
echo "📋 使用指南:"
echo "  • 手动发布 (本地): pnpm release"
echo "  • 手动发布 (GitHub): Actions > 手动 Release > Run workflow"
echo "  • 查看文档: docs/RELEASE.md"
echo "  • 发布历史: CHANGELOG.md"
echo ""
echo "🤝 协作提示:"
echo "  • ✅ 已禁用自动触发，避免意外发布"
echo "  • 👥 团队成员可自由提交到 main 分支"
echo "  • 🎯 只有授权人员可手动发布版本"
