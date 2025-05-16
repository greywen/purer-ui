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

// 在包之间发布添加延迟函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 为每个包进行构建和发布
async function publishPackages() {
  for (const packageName of PACKAGE_ORDER) {
    const shortName = packageName.split('/')[1];
    const packagePath = path.join(
      __dirname, 
      '../packages', 
      ROOT_PACKAGES.includes(shortName) ? shortName : `components/${shortName}`
    );
    
    if (!fs.existsSync(packagePath)) {
      console.warn(`Package ${packageName} does not exist in path ${packagePath}`);
      continue;
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
      
      // 在发布包之间添加延迟，给NPM注册表处理时间
      console.log(`Waiting for NPM registry to process ${packageName}...`);
      await sleep(10000); // 10秒延迟
      
    } catch (error) {
      console.error(`Failed to publish ${packageName}`);
      console.error('Error details:', error.message);
      
      // 询问是否继续发布
      if (process.env.CI) {
        // 在CI环境中直接退出
        process.exit(1);
      } else {
        console.log('Continuing with next package...');
      }
    }
  }

  console.log('All packages published successfully!');
}

publishPackages().catch(err => {
  console.error('Publishing process failed:', err);
  process.exit(1);
}); 