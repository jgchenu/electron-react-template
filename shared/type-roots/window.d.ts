declare interface Window {
  electron: {
    sendToMain: <T>(event: string, data?: unknown) => Promise<T>;
  };
  __DEV__: boolean;
  __MOCK__: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: any;
}

declare let __DEV__: boolean;
declare let __MOCK__: boolean;
