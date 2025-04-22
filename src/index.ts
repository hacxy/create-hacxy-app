import { cpSync, existsSync, renameSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { confirm, input } from '@inquirer/prompts';
import consola from 'consola';
import { red } from 'kolorist';
import config from '../template.config.json';
import { parseArg, printActionsInfo, renamePackageName } from './utils/common';
import { errorLog } from './utils/log';
import { prompts } from './utils/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.resolve(__dirname, '../templates');

export async function bootstrap() {
  let { projectName, template } = parseArg();

  if (!projectName) {
    projectName = await input({ message: 'Please enter the project name:', default: 'ts-project', required: true }).catch(() => {
      consola.error(red('Cancelled!'));
      process.exit(0);
    });
  }

  if (!template) {
    template = await prompts(config);
  }

  const finalTempPath = path.resolve(templatePath, template);
  const targetPath = path.resolve(process.cwd(), projectName);

  // check dir is empty
  if (existsSync(targetPath)) {
    const isRemove = await confirm({
      message: `Target directory ${targetPath} is not empty. Remove existing files and continue?`,
      default: true
    }).catch(() => {
      errorLog('Cancelled!');
      process.exit(0);
    });

    if (isRemove) {
      rmSync(targetPath, { force: true, recursive: true });
    }
  }
  cpSync(finalTempPath, targetPath, { recursive: true });
  renameSync(path.resolve(targetPath, '_gitignore'), path.resolve(targetPath, '.gitignore'));
  renamePackageName(projectName, targetPath);
  printActionsInfo(targetPath);
}

bootstrap();
