const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openTextEditor: (date) => ipcRenderer.invoke("open-text-editor", date),
});
