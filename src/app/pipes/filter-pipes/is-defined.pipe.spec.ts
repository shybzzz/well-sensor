import { IsDefinedPipe } from './is-defined.pipe';

describe('IsDefinedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsDefinedPipe();
    expect(pipe).toBeTruthy();
  });
});
