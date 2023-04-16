import { customIpcEventChannel } from "$shared/constants";
import { ipcMain } from "electron";

import { IpcRequestBody } from "$shared/types/ipc";
import { eventServices } from "$main/services/eventService";

const noop = () => {
  //
};

export function registerIpcEventHandler() {
  ipcMain.addListener(
    customIpcEventChannel,
    async (eventSym, requestBody: IpcRequestBody) => {
      const ipcEvent = requestBody["event"];
      const handler = eventServices[ipcEvent] || noop;
      const data = await handler();
      const body = {
        seq: requestBody.seq,
        event: requestBody.event,
        data: data,
      };
      eventSym.sender.send(customIpcEventChannel, body);
    }
  );
}

export function removeIpcEventHandler() {
  ipcMain.removeAllListeners(customIpcEventChannel);
}
