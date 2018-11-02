import { SUCCESS_RESPONSE_RESULT } from '../definitions';

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
): { responseResult: number; data: any; responseType: number } {
  let data = '';
  const ar = new Uint8Array(buffer);
  const responseResult = ar[0];
  let responseType;
  // if (responseResult === SUCCESS_RESPONSE_HEADER) {
  responseType = ar[1];
  for (let i = 2; i < ar.length; i++) {
    data = data + String.fromCharCode(ar[i]);
  }
  // }
  return { responseResult, data: { data, ar }, responseType };
}

export const ArrayConverter = { str2ArrayBuffer, arrayBuffer2Response };
