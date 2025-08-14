#!/bin/bash

# 测试简化的 CHANGELOG 更新逻辑

set -e

echo "🧪 测试简化的 CHANGELOG 更新逻辑"
echo "================================="
echo ""

# 模拟 GitHub Actions 环境变量
VERSION="v2.1.0"

# 获取最新的更新文档
LATEST_UPDATE=$(find updates -name "*.md" -not -name "README.md" | sort -r | head -1)
echo "📄 最新更新文档: $LATEST_UPDATE"

if [ -f "$LATEST_UPDATE" ]; then
    echo ""
    echo "📋 更新文档标题:"
    head -1 "$LATEST_UPDATE" | sed 's/^# //'
    echo ""
    
    echo "📝 提取的主要章节:"
    sed -n '/## /,$p' "$LATEST_UPDATE" | head -20 | grep -E '^- |^## ' | sed 's/^## /#### /'
    echo ""
fi

# 测试 CHANGELOG 更新
if [ -f "CHANGELOG.md" ]; then
    echo "🔄 模拟 CHANGELOG 更新过程:"
    
    # 备份原文件
    cp CHANGELOG.md CHANGELOG.md.backup
    
    # 获取当前日期
    CURRENT_DATE=$(date +%Y-%m-%d)
    
    # 创建临时文件
    temp_changelog="changelog-temp.md"
    
    # 查找 [未发布] 行的位置
    unreleased_line=$(grep -n "## \[未发布\]" CHANGELOG.md | cut -d: -f1)
    
    if [ -n "$unreleased_line" ]; then
        echo "✅ 找到 [未发布] 章节在第 $unreleased_line 行"
        
        # 复制文件头部分
        head -n $((unreleased_line + 5)) CHANGELOG.md > $temp_changelog
        
        # 添加新版本条目
        echo "" >> $temp_changelog
        echo "## [$VERSION] - $CURRENT_DATE" >> $temp_changelog
        echo "" >> $temp_changelog
        
        # 如果有最新更新文档，直接添加其内容
        if [ -f "$LATEST_UPDATE" ]; then
            echo "### 更新内容" >> $temp_changelog
            echo "" >> $temp_changelog
            # 获取更新文档的标题
            echo "**$(head -1 "$LATEST_UPDATE" | sed 's/^# //')**" >> $temp_changelog
            echo "" >> $temp_changelog
            # 添加更新概述（跳过标题和元信息，提取主要内容）
            sed -n '/## /,$p' "$LATEST_UPDATE" | head -20 | grep -E '^- |^## ' | sed 's/^## /#### /' >> $temp_changelog
            echo "" >> $temp_changelog
            echo "详细信息请查看: [更新文档]($LATEST_UPDATE)" >> $temp_changelog
            echo "" >> $temp_changelog
        else
            # 如果没有更新文档，添加通用条目
            echo "### 更新内容" >> $temp_changelog
            echo "- 手动发布版本 $VERSION" >> $temp_changelog
            echo "" >> $temp_changelog
        fi
        
        # 添加其余内容
        tail -n +$((unreleased_line + 6)) CHANGELOG.md >> $temp_changelog
        
        echo "✅ 生成的新 CHANGELOG 预览:"
        echo "----------------------------"
        head -50 $temp_changelog
        echo "----------------------------"
        
        # 询问是否应用更改
        echo ""
        echo "🤔 是否要应用这些更改到 CHANGELOG.md? (y/N)"
        read -r APPLY_CHANGES
        
        if [[ "$APPLY_CHANGES" =~ ^[Yy]$ ]]; then
            mv $temp_changelog CHANGELOG.md
            echo "✅ CHANGELOG.md 已更新"
        else
            rm -f $temp_changelog
            echo "❌ 更改已取消"
        fi
        
        # 恢复备份
        if [ -f "CHANGELOG.md.backup" ]; then
            echo "💾 备份文件: CHANGELOG.md.backup"
        fi
    else
        echo "❌ 未找到 [未发布] 章节"
    fi
else
    echo "❌ CHANGELOG.md 不存在"
fi

echo ""
echo "✅ 测试完成!"
