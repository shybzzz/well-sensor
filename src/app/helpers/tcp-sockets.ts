declare const chrome;

export async function getTcp(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const tcp = chrome && chrome.sockets && chrome.sockets.tcp;
    tcp ? resolve(tcp) : reject({ message: 'Tcp Sockets are not supported' });
  });
}

export async function create(config = {}): Promise<number> {
  try {
    const tcp = await getTcp();
    return new Promise<number>(resolve => {
      tcp.create(config, ({ socketId }) => {
        resolve(socketId);
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function connect(
  socketId: number,
  url: string,
  port = 80
): Promise<void> {
  try {
    const tcp = await getTcp();
    return new Promise<void>((resolve, reject) => {
      tcp.connect(
        socketId,
        url,
        port,
        code => {
          code < 0
            ? reject({
                message: `Could not connect to Socket # ${socketId} on ${url}:${port} (Error: ${code})`,
                code,
                data: { socketId, url, port }
              })
            : resolve();
        }
      );
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function send(socketId: number, data: ArrayBuffer): Promise<any> {
  try {
    const tcp = await getTcp();
    return new Promise<any>(resolve => {
      tcp.send(socketId, data, res => {
        resolve(res);
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function disconnect(socketId: number): Promise<void> {
  try {
    const tcp = await getTcp();
    return new Promise<void>(resolve => {
      tcp.disconnect(socketId, () => {
        resolve();
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function close(socketId: number): Promise<void> {
  try {
    const tcp = await getTcp();
    return new Promise<void>(resolve => {
      tcp.close(socketId, () => {
        resolve();
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function addReceiveHandler(
  handler: ({ socketId: number, data: ArrayBuffer }) => any
): Promise<void> {
  try {
    const tcp = await getTcp();
    tcp.onReceive.addListener(handler);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function removeReceiveHandler(
  handler: ({ socketId: number, data: ArrayBuffer }) => any
): Promise<void> {
  try {
    const tcp = await getTcp();
    tcp.onReceive.removeListener(handler);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

export const TcpSockets = {
  create,
  connect,
  send,
  disconnect,
  close,
  addReceiveHandler,
  removeReceiveHandler
};
