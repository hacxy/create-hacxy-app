import { describe, expect, it } from 'vitest';
import { sayHello } from '../src';

describe('library', () => {
  it('sayHello', () => {
    expect(sayHello('Hacxy')).toBe('Hello Hacxy');
  });
});

