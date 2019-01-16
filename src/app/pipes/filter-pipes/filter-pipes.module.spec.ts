import { FilterPipesModule } from './filter-pipes.module';

describe('FilterPipesModule', () => {
  let filterPipesModule: FilterPipesModule;

  beforeEach(() => {
    filterPipesModule = new FilterPipesModule();
  });

  it('should create an instance', () => {
    expect(filterPipesModule).toBeTruthy();
  });
});
