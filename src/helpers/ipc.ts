import { IpcEvent, customIpcEventChannel } from "$shared/constants";
import { IpcResponseBody, IpcRequestBody } from "$shared/types/ipc";
import { ipcRenderer } from "electron";

const timeout = 10 * 1000;
const ipcCacheMap = new Map<
  string,
  {
    resolve: (data: unknown) => void;
    reject: (reason: string) => void;
    timer: NodeJS.Timeout;
  }
>();

// only init one channel
ipcRenderer.on(
  customIpcEventChannel,
  (event, responseBody: IpcResponseBody<unknown>) => {
    const responseEvent = `${responseBody.event}-${responseBody.seq}`;
    const handler = ipcCacheMap.get(responseEvent);
    if (handler === undefined) {
      return;
    }
    ipcCacheMap.delete(responseEvent);
    clearTimeout(handler.timer);
    console.log("clear time out");
    handler.resolve(responseBody.data);
  }
);

export function sendToMain<T>(event: IpcEvent, data?: unknown) {
  const requestBody: IpcRequestBody = {
    event,
    data,
    seq: Date.now(),
  };
  const responseEvent = `${event}-${requestBody.seq}`;
  if (__DEV__) {
    console.info("sendToMain", event, requestBody);
  }
  return new Promise<T>((resolve, reject) => {
    ipcRenderer.send(customIpcEventChannel, requestBody);
    const timer = setTimeout(() => {
      console.log("trigger time out");
      ipcCacheMap.delete(responseEvent);
      reject(`${event} timeout, be canceled`);
    }, timeout);
    ipcCacheMap.set(responseEvent, { resolve, reject, timer });
  });
}
