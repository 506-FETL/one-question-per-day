#!/bin/bash

# 506实验室每日一题 - 手动发布脚本
# 使用方法: ./scripts/release.sh [patch|minor|major|custom] [自定义版本号]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印彩色信息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否在正确的目录
if [ ! -f "package.json" ] || [ ! -d ".git" ]; then
    print_error "请在项目根目录执行此脚本"
    exit 1
fi

# 检查是否在 main 分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "当前不在 main 分支 (当前: $CURRENT_BRANCH)"
    read -p "是否切换到 main 分支? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout main
        git pull origin main
    else
        print_error "请切换到 main 分支后再执行"
        exit 1
    fi
fi

# 检查工作区是否干净
if [ -n "$(git status --porcelain)" ]; then
    print_error "工作区有未提交的更改，请先提交或储藏"
    git status --short
    exit 1
fi

# 获取当前版本
CURRENT_VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
print_info "当前版本: $CURRENT_VERSION"

# 解析版本号
VERSION_NUM=${CURRENT_VERSION#v}
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION_NUM"

# 确定新版本号
VERSION_TYPE=${1:-"patch"}
CUSTOM_VERSION=$2

case "$VERSION_TYPE" in
    "major")
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        NEW_VERSION="v${MAJOR}.${MINOR}.${PATCH}"
        ;;
    "minor")
        MINOR=$((MINOR + 1))
        PATCH=0
        NEW_VERSION="v${MAJOR}.${MINOR}.${PATCH}"
        ;;
    "patch")
        PATCH=$((PATCH + 1))
        NEW_VERSION="v${MAJOR}.${MINOR}.${PATCH}"
        ;;
    "custom")
        if [ -z "$CUSTOM_VERSION" ]; then
            read -p "请输入自定义版本号 (格式: v1.2.3): " CUSTOM_VERSION
        fi
        if [[ ! $CUSTOM_VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            print_error "版本号格式不正确，应为 v1.2.3"
            exit 1
        fi
        NEW_VERSION="$CUSTOM_VERSION"
        ;;
    *)
        print_error "无效的版本类型: $VERSION_TYPE"
        echo "用法: $0 [patch|minor|major|custom] [自定义版本号]"
        exit 1
        ;;
esac

print_info "新版本: $NEW_VERSION"

# 确认发布
read -p "确认发布版本 $NEW_VERSION? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "发布已取消"
    exit 0
fi

# 运行测试
print_info "运行测试..."
if ! npm run test; then
    print_error "测试失败，发布终止"
    exit 1
fi

# 统计项目信息
print_info "统计项目信息..."
TOTAL_DAYS=$(find problems/days -type d -name "Day *" | wc -l | tr -d ' ')
CONTRIBUTORS=$(git shortlog -sn --all | wc -l | tr -d ' ')

print_info "项目统计:"
echo "  - 总题目数量: $TOTAL_DAYS 天"
echo "  - 贡献者数量: $CONTRIBUTORS 人"

# 更新 package.json 版本号
print_info "更新 package.json..."
VERSION_NUMBER=${NEW_VERSION#v}
npm version $VERSION_NUMBER --no-git-tag-version

# 生成 Release Notes
print_info "生成 Release Notes..."
RELEASE_NOTES_FILE="release-notes-temp.md"

cat > $RELEASE_NOTES_FILE << EOF
# 📚 506实验室每日一题 Release $NEW_VERSION

## 🎯 本次更新概览

EOF

# 查找最新的更新文档
LATEST_UPDATE=$(find updates -name "*.md" -not -name "README.md" | sort -r | head -1)
if [ -f "$LATEST_UPDATE" ]; then
    echo "" >> $RELEASE_NOTES_FILE
    echo "## 📝 详细更新内容" >> $RELEASE_NOTES_FILE
    echo "" >> $RELEASE_NOTES_FILE
    cat "$LATEST_UPDATE" >> $RELEASE_NOTES_FILE
    echo "" >> $RELEASE_NOTES_FILE
fi

# 添加项目统计
cat >> $RELEASE_NOTES_FILE << EOF
## 📊 项目统计

- 📚 总题目数量: **$TOTAL_DAYS** 天
- 👥 贡献者数量: **$CONTRIBUTORS** 人

## 🛠️ 技术栈

- **语言**: JavaScript, TypeScript
- **测试**: Vitest
- **代码质量**: ESLint, Prettier
- **包管理**: pnpm

## 🚀 快速开始

\`\`\`bash
# 克隆项目
git clone https://github.com/506-FETL/one-question-per-day.git

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 开发模式（包含代码检查、格式化、测试）
pnpm dev
\`\`\`

## 🤝 参与贡献

欢迎加入506实验室每日一题！请查看 [README.md](https://github.com/506-FETL/one-question-per-day/blob/main/README.md) 了解详细的参与指南。
EOF

# 更新 CHANGELOG.md
print_info "更新 CHANGELOG.md..."
update_changelog() {
    local version="$1"
    local date=$(date +%Y-%m-%d)
    local latest_update="$2"
    
    # 创建临时文件
    local temp_changelog="changelog-temp.md"
    
    # 读取当前 CHANGELOG
    if [ -f "CHANGELOG.md" ]; then
        # 查找 [未发布] 行的位置
        local unreleased_line=$(grep -n "## \[未发布\]" CHANGELOG.md | cut -d: -f1)
        
        if [ -n "$unreleased_line" ]; then
            # 复制文件头部分到临时文件
            head -n $((unreleased_line + 5)) CHANGELOG.md > $temp_changelog
            
            # 添加新版本条目
            echo "" >> $temp_changelog
            echo "## [$version] - $date" >> $temp_changelog
            echo "" >> $temp_changelog
            
            # 如果有最新更新文档，解析其内容
            if [ -f "$latest_update" ]; then
                # 提取更新文档中的分类内容
                if grep -q "## 新增功能" "$latest_update"; then
                    echo "### 新增功能" >> $temp_changelog
                    sed -n '/## 新增功能/,/## /p' "$latest_update" | sed '1d;$d' | grep '^-' >> $temp_changelog
                    echo "" >> $temp_changelog
                fi
                
                if grep -q "## 修改内容" "$latest_update"; then
                    echo "### 修改内容" >> $temp_changelog
                    sed -n '/## 修改内容/,/## /p' "$latest_update" | sed '1d;$d' | grep '^-' >> $temp_changelog
                    echo "" >> $temp_changelog
                fi
                
                if grep -q "## 问题修复\|## 修复问题" "$latest_update"; then
                    echo "### 问题修复" >> $temp_changelog
                    sed -n '/## 问题修复\|## 修复问题/,/## /p' "$latest_update" | sed '1d;$d' | grep '^-' >> $temp_changelog
                    echo "" >> $temp_changelog
                fi
            else
                # 如果没有更新文档，添加通用条目
                echo "### 新增功能" >> $temp_changelog
                echo "- 项目更新和改进" >> $temp_changelog
                echo "" >> $temp_changelog
            fi
            
            # 添加其余内容
            tail -n +$((unreleased_line + 6)) CHANGELOG.md >> $temp_changelog
            
            # 替换原文件
            mv $temp_changelog CHANGELOG.md
        else
            print_warning "CHANGELOG.md 格式不标准，跳过自动更新"
        fi
    else
        print_warning "CHANGELOG.md 不存在，跳过自动更新"
    fi
}

# 调用更新 CHANGELOG 函数
update_changelog "$NEW_VERSION" "$LATEST_UPDATE"

# 提交版本更新
print_info "提交版本更新..."
git add package.json CHANGELOG.md
git commit -m "chore: bump version to $NEW_VERSION

- 更新 package.json 版本号
- 更新 CHANGELOG.md 添加 $NEW_VERSION 版本记录"

# 创建并推送 tag
print_info "创建 Git tag..."
git tag -a $NEW_VERSION -m "Release $NEW_VERSION"

print_info "推送到远程仓库..."
git push origin main
git push origin $NEW_VERSION

print_success "版本 $NEW_VERSION 发布成功！"
print_info "Release Notes 已保存到: $RELEASE_NOTES_FILE"
print_info "请访问 GitHub 页面查看 Release: https://github.com/506-FETL/one-question-per-day/releases"

# 清理临时文件
rm -f $RELEASE_NOTES_FILE

print_success "发布流程完成！"
