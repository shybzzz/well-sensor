export const dataSeparator = '\n';

export function str2ArrayBuffer(messageType: string, str: string): ArrayBuffer {
  const length = str.length;
  const buffer = new ArrayBuffer(length + 1);
  const packet = new Uint8Array(buffer);
  packet[0] = messageType.charCodeAt(0);
  for (let lc = 0; lc < length; lc++) {
    packet[1 + lc] = str.charCodeAt(lc);
  }
  return buffer;
}

export function arrayBuffer2Response<T>(buffer: ArrayBuffer): T {
  let res = null;
  const ar = new Uint8Array(buffer);
  if (ar.length > 1) {
    let data = '';

    for (let i = 0; i < ar.length; i++) {
      data = data + String.fromCharCode(ar[i]);
    }
    res = JSON.parse(data);
  } else {
    throw String.fromCharCode(ar[0]);
  }

  return res;
}

export const ArrayConverter = { str2ArrayBuffer, arrayBuffer2Response };
