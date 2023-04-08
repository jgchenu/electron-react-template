import { IpcEvent } from "../constants";

export type IpcRequestBody<T = unknown> = {
  event: IpcEvent;
  data: T;
  seq: number;
};

export type IpcResponseBody<T = unknown> = {
  event: IpcEvent;
  data: T;
  seq: number;
};
