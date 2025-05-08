const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const fs = require("fs");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Electron + React",
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, "../renderer/assets/photos/notebook.png"),
  });

  const startUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  mainWindow.loadURL(startUrl);
}

function openTextEditorWindow(date) {
  textEditorWindow = new BrowserWindow({
    title: date,
    width: 500,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  textEditorWindow.loadURL(
    process.env.VITE_DEV_SERVER_URL || "http://localhost:5173/editor"
  );
}

app.whenReady().then(createMainWindow);
