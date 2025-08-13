#!/bin/bash

# CHANGELOG 自动更新功能演示脚本

echo "📝 CHANGELOG 自动更新功能演示"
echo "================================"

# 创建一个测试的更新文档
cat > test-update.md << 'EOF'
# 测试更新 - 2025-08-13

## 新增功能
- ✅ 添加自动 CHANGELOG 更新功能
- ✅ 支持从更新文档自动解析内容
- 🤖 集成到 GitHub Actions 和手动发布脚本

## 修改内容
- 📝 优化 Release Notes 生成逻辑
- 🔧 改进版本管理流程

## 问题修复
- 🐛 修复 CHANGELOG 格式解析问题
- 🐛 解决版本号同步问题
EOF

echo "✅ 创建测试更新文档: test-update.md"

# 模拟 CHANGELOG 更新过程
echo ""
echo "🔄 模拟 CHANGELOG 更新过程..."

# 假设的版本信息
NEW_VERSION="v1.2.0"
CURRENT_DATE=$(date +%Y-%m-%d)

# 检查当前 CHANGELOG
if [ -f "CHANGELOG.md" ]; then
    echo "📋 找到现有 CHANGELOG.md"
    
    # 创建备份
    cp CHANGELOG.md CHANGELOG.md.backup
    echo "💾 创建备份: CHANGELOG.md.backup"
    
    # 查找 [未发布] 行的位置
    unreleased_line=$(grep -n "## \[未发布\]" CHANGELOG.md | cut -d: -f1)
    
    if [ -n "$unreleased_line" ]; then
        echo "🎯 找到 [未发布] 标记在第 $unreleased_line 行"
        
        # 创建临时文件
        temp_changelog="changelog-demo.md"
        
        # 复制文件头部分
        head -n $((unreleased_line + 5)) CHANGELOG.md > $temp_changelog
        
        # 添加新版本条目
        echo "" >> $temp_changelog
        echo "## [$NEW_VERSION] - $CURRENT_DATE" >> $temp_changelog
        echo "" >> $temp_changelog
        
        # 解析测试更新文档内容
        if grep -q "## 新增功能" test-update.md; then
            echo "### 新增功能" >> $temp_changelog
            sed -n '/## 新增功能/,/## /p' test-update.md | sed '1d;$d' | grep '^-' >> $temp_changelog
            echo "" >> $temp_changelog
        fi
        
        if grep -q "## 修改内容" test-update.md; then
            echo "### 修改内容" >> $temp_changelog
            sed -n '/## 修改内容/,/## /p' test-update.md | sed '1d;$d' | grep '^-' >> $temp_changelog
            echo "" >> $temp_changelog
        fi
        
        if grep -q "## 问题修复" test-update.md; then
            echo "### 问题修复" >> $temp_changelog
            sed -n '/## 问题修复/,/## /p' test-update.md | sed '1d;$d' | grep '^-' >> $temp_changelog
            echo "" >> $temp_changelog
        fi
        
        # 添加其余内容
        tail -n +$((unreleased_line + 6)) CHANGELOG.md >> $temp_changelog
        
        echo "✅ 生成演示版本: $temp_changelog"
        
        # 显示差异
        echo ""
        echo "📊 更新前后对比:"
        echo "--- 原始版本 ---"
        head -n 20 CHANGELOG.md
        echo ""
        echo "--- 更新版本 ---"
        head -n 30 $temp_changelog
        
        # 询问是否应用更改
        echo ""
        read -p "🤔 是否将演示更改应用到实际 CHANGELOG.md? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mv $temp_changelog CHANGELOG.md
            echo "✅ CHANGELOG.md 已更新！"
        else
            echo "❌ 演示更改未应用，保持原文件不变"
            rm -f $temp_changelog
        fi
        
        # 清理备份文件
        read -p "🗑️ 是否删除备份文件? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -f CHANGELOG.md.backup
            echo "🗑️ 备份文件已删除"
        else
            echo "💾 备份文件保留: CHANGELOG.md.backup"
        fi
        
    else
        echo "⚠️ 未找到 [未发布] 标记，CHANGELOG 格式可能不标准"
    fi
else
    echo "❌ 未找到 CHANGELOG.md 文件"
fi

# 清理测试文件
rm -f test-update.md

echo ""
echo "🎉 CHANGELOG 自动更新功能演示完成！"
echo ""
echo "📋 功能说明:"
echo "  • ✅ 自动解析 updates/ 文件夹中的最新更新文档"
echo "  • ✅ 智能提取 '新增功能'、'修改内容'、'问题修复' 等分类"
echo "  • ✅ 按照 Keep a Changelog 格式自动插入版本条目"
echo "  • ✅ 保持 [未发布] 区域用于下次更新"
echo "  • ✅ 集成到手动发布脚本和 GitHub Actions"
echo ""
echo "🚀 使用方式:"
echo "  • 手动发布时会自动更新 CHANGELOG"
echo "  • GitHub Actions 自动发布时也会更新"
echo "  • 确保 updates/ 文件夹中有格式正确的更新文档"
