# TypeScript 使用指南

本项目已完全支持 TypeScript，你可以在任何地方使用 `.ts` 或 `.tsx` 文件。

## 📦 已安装的依赖

- `typescript` - TypeScript 编译器
- `@types/node` - Node.js 类型定义
- `@typescript-eslint/eslint-plugin` - TypeScript ESLint 插件
- `@typescript-eslint/parser` - TypeScript ESLint 解析器

## 🛠️ 配置文件

- `tsconfig.json` - TypeScript 编译配置
- `eslint.config.js` - ESLint 配置（支持 TypeScript）
- `vitest.config.ts` - Vitest 测试配置（支持 TypeScript）

## 📝 使用方法

### 1. 创建 TypeScript 文件

```typescript
// example.ts
interface User {
  id: number
  name: string
  email: string
}

export function createUser(id: number, name: string, email: string): User {
  return { id, name, email }
}
```

### 2. 创建对应的测试文件

```typescript
// example.spec.ts
import { describe, it, expect } from 'vitest'
import { createUser } from './example'

describe('User Creation', () => {
  it('should create a user', () => {
    const user = createUser(1, '张三', 'zhangsan@example.com')
    expect(user.id).toBe(1)
  })
})
```

### 3. 类型导入/导出

```typescript
// 导出类型
export type { User }

// 导入类型（使用 type-only 导入）
import type { User } from './example'

// 导入值和类型
import { createUser } from './example'
import type { User } from './example'
```

## 🚀 可用的脚本命令

```bash
# 开发流程（包含类型检查）
pnpm dev

# 单独运行类型检查
pnpm type-check

# 运行 TypeScript 专用的 lint
pnpm lint:ts

# 运行 TypeScript 测试
pnpm test:ts

# 运行所有测试
pnpm test

# 格式化代码（包括 TypeScript）
pnpm format
```

## 🔍 VS Code 推荐设置

1. 安装推荐的扩展：

   - TypeScript Importer
   - TypeScript Hero
   - Prettier - Code formatter

2. 在 VS Code 设置中启用：
   - "typescript.preferences.includePackageJsonAutoImports": "auto"
   - "typescript.suggest.autoImports": true

## 📁 项目结构示例

```
src/
├── typescript-demo.ts          # TypeScript 示例文件
├── typescript-demo.spec.ts     # 对应的测试文件
└── your-module/
    ├── index.ts                # 模块入口
    ├── types.ts                # 类型定义
    └── utils.spec.ts           # 测试文件

problems/
└── days/
    └── Day 01/
        ├── Merge_Sort.ts       # TypeScript 实现
        └── Merge_Sort.spec.ts  # TypeScript 测试
```

## 🎯 最佳实践

1. **严格的类型检查**：项目配置了严格的 TypeScript 模式，包括：

   - `strict: true`
   - `noImplicitAny: true`
   - `strictNullChecks: true`

2. **类型导入**：使用 `import type` 进行仅类型导入

3. **泛型使用**：充分利用 TypeScript 的泛型功能

4. **接口定义**：为复杂对象定义清晰的接口

5. **工具类型**：使用 TypeScript 内置的工具类型（如 `Partial<T>`、`Record<K,V>` 等）

## 🐛 常见问题

### Q: 类型错误但代码运行正常？

A: 运行 `pnpm type-check` 查看具体的类型错误信息。

### Q: ESLint 不识别 TypeScript 语法？

A: 确认文件扩展名是 `.ts` 或 `.tsx`，并且 ESLint 配置包含了 TypeScript 规则。

### Q: 测试中的类型导入报错？

A: 使用 `import type { TypeName } from './module'` 进行仅类型导入。

## 🔗 参考资源

- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Vitest TypeScript 支持](https://vitest.dev/guide/coverage.html#typescript)
