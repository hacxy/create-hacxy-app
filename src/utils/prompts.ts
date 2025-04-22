import { select } from '@inquirer/prompts';
import consola from 'consola';
import { red } from 'kolorist';

export async function prompts(promptItem: any) {
  const choices = Object.keys(promptItem.items).map((item: string) => {
    return {
      name: item,
      description: (promptItem.items as any)[item].description,
      value: (promptItem.items as any)[item]
    };
  });

  let value;
  if (promptItem.type === 'select') {
    value = await select({
      message: promptItem.message,
      choices
    }).catch(() => {
      consola.error(red('Cancelled!'));
      process.exit(0);
    });
  }

  if (value.items) {
    return await prompts(value);
  }
  else {
    return value.title;
  }
}
