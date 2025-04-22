import { readdirSync, readFileSync, renameSync, rmdirSync, rmSync, statSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import degit from 'degit';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.resolve(__dirname, '../../templates');

const config = JSON.parse(
  readFileSync(new URL('../../template.config.json', import.meta.url))
);

function emptyDir(path) {
  const files = readdirSync(path);
  files.forEach(file => {
    const filePath = `${path}/${file}`;
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      emptyDir(filePath);
    }
    else {
      unlinkSync(filePath);
    }
  });
}

function rmEmptyDir(path, level = 0) {
  const files = readdirSync(path);
  if (files.length > 0) {
    let tempFile = 0;
    files.forEach(file => {
      tempFile++;
      rmEmptyDir(`${path}/${file}`, 1);
    });
    if (tempFile === files.length && level !== 0) {
      rmdirSync(path);
    }
  }
  else {
    level !== 0 && rmdirSync(path);
  }
}

function clearDir(path) {
  emptyDir(path);
  rmEmptyDir(path);
}

function extractRepoValues() {
  const result = [];
  function recursiveExtract(currentObj) {
    for (const key in currentObj) {
      if (key === 'repo') {
        result.push({
          repo: currentObj[key],
          title: currentObj.title
        });
      }
      else if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
        recursiveExtract(currentObj[key]);
      }
    }
  }
  recursiveExtract(config);
  return result;
}

async function cloneTasks() {
  const repos = extractRepoValues(config);
  clearDir(templatePath);
  const spinner = ora();
  for await (const item of repos) {
    const emitter = degit(item.repo, {
      cache: false,
      force: true,
      verbose: false,
    });
    try {
      spinner.start('Synchronizing...');
      const projectTempPath = path.resolve(templatePath, `./${item.title}`);
      await emitter.clone(projectTempPath);
      renameSync(path.resolve(projectTempPath, '.gitignore'), path.resolve(projectTempPath, '_gitignore'));
      rmSync(path.resolve(projectTempPath, 'pnpm-lock.yaml'));
      spinner.succeed(`${item.title} synchronization successful!`);
    }
    catch (error) {
      spinner.fail(`${item.title} synchronization failed`);
      throw new Error(error);
    }
  }
}

cloneTasks();
