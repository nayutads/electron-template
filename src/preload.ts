import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("ipcRendererAdaptor", {
  setMessage: async (message: string) => {
    let res = await ipcRenderer.invoke("set-message", message);
    return res;
  },
});
