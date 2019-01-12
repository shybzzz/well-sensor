import { SensorTypeModule } from './sensor-type.module';

describe('SensorTypeModule', () => {
  let sensorTypeModule: SensorTypeModule;

  beforeEach(() => {
    sensorTypeModule = new SensorTypeModule();
  });

  it('should create an instance', () => {
    expect(sensorTypeModule).toBeTruthy();
  });
});
