export const dataSeparator = '\n';

export function str2ArrayBuffer(...message: string[]): ArrayBuffer {
  const str = message.join(dataSeparator);
  const length = str.length;
  const buffer = new ArrayBuffer(length + 4);
  const packet = new Uint8Array(buffer);
  packet[0] = 255;
  packet[1] = 3;
  // tslint:disable-next-line:no-bitwise
  packet[2] = length << 8;
  // tslint:disable-next-line:no-bitwise
  packet[3] = length & 0xff;
  for (let lc = 0; lc < length; lc++) {
    packet[4 + lc] = str.charCodeAt(lc);
  }
  return buffer;
}

export function arrayBuffer2Response(
  buffer: ArrayBuffer
): { responseType: number; data: string } {
  let data = '';
  const ui8 = new Uint8Array(buffer);
  const responseType = ui8[0];
  for (let i = 1; i < ui8.length; i++) {
    data = data + String.fromCharCode(ui8[i]);
  }
  return { responseType, data };
}

export const ArrayConverter = { str2ArrayBuffer, arrayBuffer2Response };
