const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile(path.join(__dirname, "../app/dist/index.html"));
}

app.whenReady().then(createWindow);
