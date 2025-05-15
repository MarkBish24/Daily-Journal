const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openTextEditor: (date) => ipcRenderer.invoke("open-text-editor", date),
  checkEntry: (date) => ipcRenderer.invoke("check-entry", date),
  getEntry: (date) => ipcRenderer.invoke("get-entry", date),
  saveEntry: (date, content) => ipcRenderer.invoke("save-entry", date, content),
});
