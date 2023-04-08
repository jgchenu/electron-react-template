import { customIpcEventChannel } from "$shared/constants";
import { ipcMain } from "electron";
import { getPingData } from "./ping";
import { IpcRequestBody } from "$shared/types/ipc";

export function registerIpcEventHandler() {
  ipcMain.addListener(
    customIpcEventChannel,
    async (event, requestBody: IpcRequestBody) => {
      console.log("main Received event:", requestBody);
      const pinData = await getPingData();
      const body = {
        seq: requestBody.seq,
        event: requestBody.event,
        data: pinData,
      };
      event.sender.send(customIpcEventChannel, body);
    }
  );
}

export function removeIpcEventHandler() {
  ipcMain.removeAllListeners(customIpcEventChannel);
}
