import { readFileSync, writeFileSync } from 'node:fs';
import path, { resolve } from 'node:path';
import minimist from 'minimist';

export function parseArg() {
  const argv = minimist(process.argv.slice(2));
  return {
    projectName: argv._[0],
    template: argv.t || argv.template
  };
}
export function getPkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) {
    return;
  }

  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function getPkgInfo() {
  const pkgInfo = getPkgFromUserAgent(process.env.npm_config_user_agent);
  return pkgInfo;
}

export function getPkgManager() {
  const pkgInfo = getPkgInfo();
  return pkgInfo ? pkgInfo.name : 'npm';
}

export function printActionsInfo(targetDir: string) {
  const pkgManager = getPkgManager();
  console.log();
  console.log(`  cd ${targetDir}`);
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn');
      console.log('  yarn dev');
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

export function renamePackageName(projectName: string, targetPath: string) {
  if (!projectName)
    return;

  const pkg = JSON.parse(
    readFileSync(resolve(targetPath, 'package.json'), 'utf-8')
  );

  pkg.name = toValidPackageName(projectName);

  writeFileSync(path.resolve(targetPath, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
}
