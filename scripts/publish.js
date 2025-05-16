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

console.log('Start to publish packages...');

// 检查环境变量中是否有NPM_TOKEN
if (!process.env.NPM_TOKEN) {
  console.warn('Warning: NPM_TOKEN environment variable not found');
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
    console.warn(`Package ${packageName} does not exist in path ${packagePath}`);
    return;
  }

  console.log(`Building ${packageName}...`);
  try {
    execSync('pnpm build', { cwd: packagePath, stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to build ${packageName}`);
    process.exit(1);
  }

  console.log(`Publishing ${packageName}...`);
  try {
    // 使用NPM_TOKEN进行发布
    const publishCommand = 'pnpm publish --no-git-checks';
    execSync(publishCommand, { 
      cwd: packagePath, 
      stdio: 'inherit',
      env: { ...process.env } // 确保所有环境变量都传递给子进程，包括NPM_TOKEN
    });
  } catch (error) {
    console.error(`Failed to publish ${packageName}`);
    process.exit(1);
  }
});

console.log('All packages published successfully!'); 