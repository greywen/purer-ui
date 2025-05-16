#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 确保按照正确的顺序发布
const PACKAGE_ORDER = [
  '@purer-ui/core',
  '@purer-ui/button',
];

// 直接在packages目录下的包
const ROOT_PACKAGES = ['core'];

console.log('开始发布包...');

// 检查环境变量中是否有NPM_TOKEN
if (!process.env.NPM_TOKEN) {
  console.warn('警告：未找到NPM_TOKEN环境变量');
}

// 检查是否有必要的变更集
try {
  execSync('pnpm changeset status', { stdio: 'inherit' });
} catch (error) {
  console.error('请先创建变更集');
  process.exit(1);
}

// 为每个包进行构建和发布
PACKAGE_ORDER.forEach(packageName => {
  const shortName = packageName.split('/')[1];
  const packagePath = path.join(
    __dirname, 
    '../packages', 
    ROOT_PACKAGES.includes(shortName) ? shortName : `components/${shortName}`
  );
  
  if (!fs.existsSync(packagePath)) {
    console.warn(`包 ${packageName} 不存在于路径 ${packagePath}`);
    return;
  }

  console.log(`构建 ${packageName}...`);
  try {
    execSync('pnpm build', { cwd: packagePath, stdio: 'inherit' });
  } catch (error) {
    console.error(`构建 ${packageName} 失败`);
    process.exit(1);
  }

  console.log(`发布 ${packageName}...`);
  try {
    // 使用NPM_TOKEN进行发布
    const publishCommand = 'pnpm publish --no-git-checks';
    execSync(publishCommand, { 
      cwd: packagePath, 
      stdio: 'inherit',
      env: { ...process.env } // 确保所有环境变量都传递给子进程，包括NPM_TOKEN
    });
  } catch (error) {
    console.error(`发布 ${packageName} 失败`);
    process.exit(1);
  }
});

console.log('所有包发布完成！'); 