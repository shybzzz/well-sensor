export const dataSeparator = '\n';

export function str2ArrayBuffer(...message: string[]): ArrayBuffer {
  const str = message.join(dataSeparator);
  const length = str.length;
  const buffer = new ArrayBuffer(length + 3);
  const packet = new Uint8Array(buffer);
  packet[0] = 3;
  // tslint:disable-next-line:no-bitwise
  packet[1] = length << 8;
  // tslint:disable-next-line:no-bitwise
  packet[2] = length & 0xff;
  for (let lc = 0; lc < length; lc++) {
    packet[3 + lc] = str.charCodeAt(lc);
  }
  return buffer;
}

export function arrayBuffer2Str(buffer: ArrayBuffer): string[] {
  let str = '';
  const ui8 = new Uint8Array(buffer);
  for (let i = 0; i < ui8.length; i++) {
    str = str + String.fromCharCode(ui8[i]);
  }
  return str.split(dataSeparator);
}

export const ArrayConverter = { str2ArrayBuffer, arrayBuffer2Str };
