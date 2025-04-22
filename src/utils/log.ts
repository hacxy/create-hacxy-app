import consola from 'consola';
import { red } from 'kolorist';

export function errorLog(message: string) {
  consola.error(red(message));
}
