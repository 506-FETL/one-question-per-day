#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * 生成 problems 文件夹的压缩包
 * 用于 GitHub Release 的附件
 */

const getCurrentVersion = () => {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('无法读取 package.json:', error.message);
    process.exit(1);
  }
};

const createProblemsArchive = () => {
  console.log('📦 正在创建 problems 文件夹压缩包...');
  
  const version = getCurrentVersion();
  const archiveName = `problems-v${version}.zip`;
  const outputDir = 'dist';
  
  // 确保输出目录存在
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // 检查 problems 文件夹是否存在
  if (!existsSync('problems')) {
    console.error('❌ problems 文件夹不存在');
    process.exit(1);
  }
  
  try {
    // 创建压缩包，只包含 problems 文件夹
    const zipCommand = `zip -r "${outputDir}/${archiveName}" problems/ -x "*.DS_Store" "*/node_modules/*" "*/.git/*"`;
    
    console.log(`🔧 执行命令: ${zipCommand}`);
    execSync(zipCommand, { stdio: 'inherit' });
    
    const archivePath = join(process.cwd(), outputDir, archiveName);
    console.log(`✅ 压缩包已创建: ${archivePath}`);
    console.log(`📁 包含内容: problems/ 文件夹`);
    
    // 显示压缩包信息
    try {
      const sizeOutput = execSync(`du -h "${archivePath}"`, { encoding: 'utf8' });
      const size = sizeOutput.split('\t')[0];
      console.log(`📊 压缩包大小: ${size}`);
    } catch {
      console.log('📊 无法获取压缩包大小信息');
    }
    
    return archivePath;
  } catch (error) {
    console.error('❌ 创建压缩包时出错:', error.message);
    process.exit(1);
  }
};

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  createProblemsArchive();
}

export { createProblemsArchive };
