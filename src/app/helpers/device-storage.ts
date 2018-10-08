export function generateId() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

export const deviceList = 'devices';

export const DeviceStorage = { generateId, deviceList };
