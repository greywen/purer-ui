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

// 检查包版本是否已经发布
function isVersionPublished(packageName, version) {
  try {
    const result = execSync(`npm view ${packageName}@${version} version`, { encoding: 'utf8' }).trim();
    console.log(`Version ${result} already published for ${packageName}`);
    return true;
  } catch (error) {
    // 如果版本不存在，npm view 会返回错误
    return false;
  }
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

    // 读取包的版本信息
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;

    // 检查版本是否已发布
    if (isVersionPublished(packageName, version)) {
      console.log(`Skipping ${packageName}@${version} as it is already published`);
      continue;
    }

    // 安装依赖
    console.log(`Installing dependencies for ${packageName}...`);
    try {
      execSync('pnpm install', { cwd: packagePath, stdio: 'inherit' });
    } catch (error) {
      console.error(`Failed to install dependencies for ${packageName}`);
      process.exit(1);
    }

    console.log(`Building ${packageName}@${version}...`);
    try {
      execSync('pnpm build', { cwd: packagePath, stdio: 'inherit' });
    } catch (error) {
      console.error(`Failed to build ${packageName}`);
      process.exit(1);
    }

    console.log(`Publishing ${packageName}@${version}...`);

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
  }

  console.log('All packages published successfully!');
}

publishPackages().catch(err => {
  console.error('Publishing process failed:', err);
  process.exit(1);
}); 