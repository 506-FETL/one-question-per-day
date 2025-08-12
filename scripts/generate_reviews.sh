#!/bin/bash

# 批量生成复习文档的脚本
# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DAYS_DIR="$SCRIPT_DIR/Problems/days"
REVIEW_DIR="$SCRIPT_DIR/Problems/review"

# 创建 review 目录（如果不存在）
mkdir -p "$REVIEW_DIR"

# 遍历每一天的文件夹
for day_folder in "$DAYS_DIR"/Day*; do
    if [ -d "$day_folder" ]; then
        # 提取天数（如 "Day 01" -> "01"）
        day_num=$(basename "$day_folder" | sed 's/Day //')
        
        # 检查是否已存在复习文档
        review_file="$REVIEW_DIR/${day_num}.md"
        
        if [ ! -f "$review_file" ]; then
            echo "创建 Day $day_num 的复习文档..."
            
            # 读取题目信息
            readme_file="$day_folder/README.md"
            answer_file="$day_folder/answer.js"
            
            # 创建基础的复习文档模板
            cat > "$review_file" << EOF
# Day $day_num 复习

## 📚 题目描述
$(if [ -f "$readme_file" ]; then cat "$readme_file" | head -20; else echo "请补充题目描述"; fi)

## 🎯 核心知识点
- 待补充关键知识点

## 💻 实现代码
\`\`\`javascript
$(if [ -f "$answer_file" ]; then cat "$answer_file"; else echo "// 请补充实现代码"; fi)
\`\`\`

## 🧠 算法分析
### 核心思路
- 待补充算法思路

### 时间复杂度
- 待分析

### 空间复杂度
- 待分析

## 🔍 关键技术点
- 待补充技术要点

## 🧪 使用示例
\`\`\`javascript
// 待补充使用示例
\`\`\`

## 💡 关键记忆点
- 待补充记忆要点

## 🤔 扩展思考
- 待补充扩展内容

## 📝 复习要点
- [ ] 待补充复习检查项
EOF
            echo "✅ 已创建 $review_file"
        else
            echo "⏭️  $review_file 已存在，跳过"
        fi
    fi
done

echo "🎉 批量生成完成！"
