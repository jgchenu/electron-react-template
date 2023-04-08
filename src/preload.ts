// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
console.log("preload js console.log", window);

import { contextBridge } from "electron";
import { sendToMain } from "./helpers/ipc";
import { IpcEvent } from "$shared/constants";

contextBridge.exposeInMainWorld("electron", {
  sendToMain: (event: IpcEvent, data: unknown) => {
    return sendToMain(event, data);
  },
});
