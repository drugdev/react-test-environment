import { flatMap } from '../src/utils';

describe('Utils module', () => {
  it('should return first param if Node provided has no children', () => {
    const node = {};
    expect(flatMap('', node)).toBe('');
    expect(flatMap('aaa', node)).toBe('aaa');
  });

  it('should return a flat string with all the child nodes', () => {
    const node = {
      children: [
        'aaa',
        {
          children: ['222'],
        },
        'bbb',
      ],
    };
    expect(flatMap('', node)).toBe('aaa222bbb');
  });
});
