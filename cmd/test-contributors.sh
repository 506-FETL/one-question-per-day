#!/bin/bash

# 测试贡献者统计脚本
# 用于验证 mailmap 配置和贡献者去重逻辑

set -e

echo "🧪 测试贡献者统计功能"
echo "=========================="
echo ""

# 进入项目根目录
cd "$(dirname "$0")/.."

echo "📍 当前目录: $(pwd)"
echo ""

echo "1️⃣ 原始贡献者统计（未去重）:"
echo "----------------------------"
git shortlog -sn --all
echo ""
echo "总数: $(git shortlog -sn --all | wc -l | tr -d ' ') 人"
echo ""

echo "2️⃣ 详细贡献者信息（包含邮箱）:"
echo "------------------------------"
git shortlog -sne --all
echo ""

echo "3️⃣ 过滤机器人账户后的统计:"
echo "----------------------------"
git shortlog -sne --all | grep -v -E "(GitHub Action|action@github\.com|xier164.*gitee\.com)"
echo ""
echo "去重后总数: $(git shortlog -sne --all | grep -v -E "(GitHub Action|action@github\.com|xier164.*gitee\.com)" | wc -l | tr -d ' ') 人"
echo ""

echo "4️⃣ 检查 .mailmap 配置:"
echo "----------------------"
if [ -f ".mailmap" ]; then
    echo "✅ .mailmap 文件存在"
    echo "配置内容:"
    cat .mailmap | grep -v "^#" | grep -v "^$"
else
    echo "❌ .mailmap 文件不存在"
fi
echo ""

echo "5️⃣ 统计题目数量:"
echo "-----------------"
TOTAL_DAYS=$(find problems/days -type d -name "Day *" | wc -l | tr -d ' ')
echo "总题目数: $TOTAL_DAYS 天"
echo ""

echo "6️⃣ 模拟 GitHub Actions 统计结果:"
echo "--------------------------------"
CONTRIBUTORS=$(git shortlog -sne --all | grep -v -E "(GitHub Action|action@github\.com|xier164.*gitee\.com)" | wc -l | tr -d ' ')
echo "📚 总题目数量: $TOTAL_DAYS 题"
echo "👥 贡献者数量: $CONTRIBUTORS 人"
echo ""

echo "✅ 测试完成!"
echo ""
echo "💡 如果贡献者数量不正确，请检查 .mailmap 配置或过滤规则"
