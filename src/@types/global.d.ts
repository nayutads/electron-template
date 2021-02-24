declare global {
  interface Window {
    ipcRendererAdaptor: APImethods;
  }
}

export interface APImethods {
  setMessage: (message: string) => Promise<string>;
}
