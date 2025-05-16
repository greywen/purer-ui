#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const basePackagePath = path.join(__dirname, '../packages/components');
const packages = [
    '@purer-ui/button',
    '@purer-ui/input',
];

console.log('Start to publish components packages...');

if (!process.env.NPM_TOKEN) {
    console.warn('Warning: NPM_TOKEN environment variable not found');
}

function isVersionPublished(packageName, version) {
    try {
        const result = execSync(`npm view ${packageName}@${version} version`, { encoding: 'utf8' }).trim();
        console.log(`Version ${result} already published for ${packageName}`);
        return true;
    } catch (error) {
        return false;
    }
}

let publishPackageList = [];

async function checkPackages() {
    for (const packageName of packages) {
        const shortName = packageName.split('/')[1];
        const packagePath = path.join(
            basePackagePath,
            shortName
        );

        if (!fs.existsSync(packagePath)) {
            console.warn(`Package ${packageName} does not exist in path ${packagePath}`);
            continue;
        }

        const packageJsonPath = path.join(packagePath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const version = packageJson.version;

        if (isVersionPublished(packageName, version)) {
            console.log(`Skipping ${packageName}@${version} as it is already published`);
            continue;
        }

        publishPackageList.push(packageName);
    }
}

async function publishPackages() {
    if (publishPackageList.length === 0) {
        console.log('No packages to publish');
        return;
    }

    console.log('publishPackageList', publishPackageList.join());

    const publishCommand = `pnpm publish --no-git-checks --access public --filter ${publishPackageList.join(' --filter ')}`;
    
    console.log('publishCommand', publishCommand);

    execSync(publishCommand, {
        cwd: __dirname,
        stdio: 'inherit',
        env: { ...process.env }
    });
}

checkPackages().then(() => {
    publishPackages().catch(err => {
        console.error('Publishing process failed:', err);
        process.exit(1);
    });
}); 