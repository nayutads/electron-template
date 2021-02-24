import { app, BrowserWindow, session, ipcMain } from "electron";
import path from "path";
let winMain: BrowserWindow;

app.once("window-all-closed", () => {
  app.quit();
});

app.on("ready", () => {
  winMain = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, "preload.j s"),
    },
  });
  winMain.loadURL(`file://${__dirname}/index.html`);
});
