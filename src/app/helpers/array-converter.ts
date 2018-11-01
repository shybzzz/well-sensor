import { SUCCESS_RESPONSE_HEADER } from '../definitions';

export const dataSeparator = '\n';

export function str2ArrayBuffer(...message: string[]): ArrayBuffer {
  const str = message.join(dataSeparator);
  const length = str.length;
  const buffer = new ArrayBuffer(length + 1);
  const packet = new Uint8Array(buffer);
  packet[0] = 1;
  for (let lc = 0; lc < length; lc++) {
    packet[1 + lc] = str.charCodeAt(lc);
  }
  return buffer;
}

export function arrayBuffer2Response(
  buffer: ArrayBuffer
): { responseResult: number; data: string; responseType: number } {
  let data = '';
  const uint8 = new Uint8Array(buffer);
  const responseResult = uint8[0];
  let responseType;
  if (responseResult === SUCCESS_RESPONSE_HEADER) {
    responseType = uint8[1];
    for (let i = 1; i < uint8.length; i++) {
      data = data + String.fromCharCode(uint8[i]);
    }
  }
  return { responseResult, data, responseType };
}

export const ArrayConverter = { str2ArrayBuffer, arrayBuffer2Response };
