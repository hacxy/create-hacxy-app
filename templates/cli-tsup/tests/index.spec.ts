import { describe, expect, it } from 'vitest';
import { bootstrap } from '../src';

describe('cli', () => {
  it('bootstrap', () => {
    expect(bootstrap).toBeTypeOf('function');
  });
});

