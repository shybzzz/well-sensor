import { DepthModule } from './depth.module';

describe('DepthModule', () => {
  let depthModule: DepthModule;

  beforeEach(() => {
    depthModule = new DepthModule();
  });

  it('should create an instance', () => {
    expect(depthModule).toBeTruthy();
  });
});
