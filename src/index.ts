// 506实验室每日一题 - 构建入口文件
// 此文件用于 Vite 构建配置，实际的构建逻辑在 vite.config.ts 中

import { readFileSync } from 'fs'
import { join } from 'path'

// 动态读取 package.json 中的版本号
const packageJsonPath = join(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

export default {
  name: '506实验室每日一题',
  version: packageJson.version,
  description: '每日一题发布包构建工具',
}
