import { SUCCESS_RESPONSE_RESULT } from '../definitions';

export const dataSeparator = '\n';

export function str2ArrayBuffer(
  messageType: string,
  ...message: string[]
): ArrayBuffer {
  const str = message.join(dataSeparator);
  const length = str.length;
  const buffer = new ArrayBuffer(length + 1);
  const packet = new Uint8Array(buffer);
  packet[0] = messageType.charCodeAt(0);
  for (let lc = 0; lc < length; lc++) {
    packet[1 + lc] = str.charCodeAt(lc);
  }
  return buffer;
}

export function arrayBuffer2Response(
  buffer: ArrayBuffer
): { responseResult: string; data: string; responseType: string } {
  let data = '';
  const ar = new Uint8Array(buffer);
  const responseResult = String.fromCharCode(ar[0]);
  const responseType = String.fromCharCode(ar[1]);
  for (let i = 2; i < ar.length; i++) {
    data = data + String.fromCharCode(ar[i]);
  }
  return { responseResult, data, responseType };
}

export const ArrayConverter = { str2ArrayBuffer, arrayBuffer2Response };
